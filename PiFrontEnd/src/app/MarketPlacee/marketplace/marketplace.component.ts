import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../Service/product.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Product } from '../../model/product';
import { map } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { ImageProcessingService } from 'src/app/image/image-processing.service';
import { Category } from 'src/app/model/enumerations/Category';
import { CarppolingServiceService } from 'src/app/Service/carppoling-service.service';

interface CustomWindow extends Window {
  embeddedChatbotConfig?: {
    chatbotId: string;
    domain: string;
  };
}

@Component({
  selector: 'app-marketplace',
  templateUrl: './marketplace.component.html',
  styleUrls: ['./marketplace.component.css']
})
export class MarketplaceComponent implements OnInit {
p:number=1;
  searchTerm: string='' ;
  public productDetails: Product[] = [];

  constructor(private CarppolingService:CarppolingServiceService,private router : Router,private productservice:ProductService,private sanitizer:DomSanitizer,private imageProcessingService:ImageProcessingService){
    const customWindow: CustomWindow = window;

    customWindow.embeddedChatbotConfig = {
      chatbotId: 'c4_fFbFsL-cYs9-NvhrVk',
      domain: 'www.chatbase.co',
    };

    const script = document.createElement('script');
    script.src = 'https://www.chatbase.co/embed.min.js';
    script.setAttribute('chatbotId', 'c4_fFbFsL-cYs9-NvhrVk');
    script.setAttribute('domain', 'www.chatbase.co');
    script.defer = true;

    script.onload = () => {
      console.log('Chatbase script loaded successfully!');
      // Perform additional actions if needed
    };

    script.onerror = (error) => {
      console.error('Error loading Chatbase script:', error);
    };

    document.head.appendChild(script);
  }
  ngOnInit(): void {
    this.getAllProduct();
    this.getpoint();

  }
  public getAllProduct(){
    this.productservice.getAllProduct(this.pageNumber).
    pipe(
     map((products: Product[],i) => products.map((product: Product) => this.imageProcessingService.createImages(product)))
  
    ).
    subscribe(
      (resp:Product[])=>{
      console.log(resp);
      this.productDetails=resp;
    },(error:HttpErrorResponse )=>{
      console.log(error);
    }
    );
  }
  get filteredProducts() {
    return this.productDetails.filter(product => {
      // Filtrer les produits en fonction du terme de recherche
      return product.name.toLowerCase().includes(this.searchTerm.toLowerCase());
    });
  }

  goToProduct(id:any){
    this.router.navigate(['/detailback',{id:id}]);
  }

  formData: FormData = new FormData();

 
  product!:Product ;

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.formData.append('image', file);
    }
  }
  /////////////////////////
  pageNumber: number = 0;
  showLoadButton = false;


 
  public getAllProducts(){
    this.productservice.getAllProduct(this.pageNumber)
    .pipe(
      map((x: Product[], i) => x.map((product: Product) => this.imageProcessingService.createImages(product)))
    )
    .subscribe(
      (resp: Product[]) =>{
        console.log(resp);
        if(resp.length == 8){
          this.showLoadButton = true;
        }else{this.showLoadButton = false}
        resp.forEach(p => this.productDetails.push(p));
        // this.productDetails = resp;
      }, (error: HttpErrorResponse) => {
        console.log(error);
      }

    );
  }
  pages !:Array<number>;
  setpage(i:any,event:any){
     event.preventDefault();
     this.pageNumber=i;
     this.getAllProduct();
  }
 
  updatePriceRange(event: Event) {
    const target = (event.target as HTMLInputElement);
    if (target && target.value) {
        const price = +target.value; // Convertir en nombre
        if (!isNaN(price)) { // Vérifier si la conversion est valide
            this.productDetails = this.productDetails.filter(product =>{     console.log('Prix du produit :', product.price);
            return product.price <= price;} );
        }
    }
}




  
  currentDate: Date = new Date();
// | paginate :{itemsPerPage:5,currentPage:p};


///////////////
categories: { name: Category; iconClass: string; }[] = [
  { name: Category.ELECTRONICS, iconClass: 'lni lni-dinner' },
  { name: Category.FASHION, iconClass: 'lni lni-control-panel' },
  { name: Category.HOMEANDGARDEN, iconClass: 'lni lni-bullhorn' }
  // Ajoutez d'autres catégories si nécessaire
];


loadProductsByCategory(category: Category): void {
  this.selectedCategory = category;
  this.productservice.getProductsByCategory(category)
    .subscribe(products => {
      this.productDetails = products.map(product => this.imageProcessingService.createImages(product));
    });
}

selectedCategory!: Category  | string;

isSelected(category: any): boolean {
  if (typeof this.selectedCategory === 'string' && this.selectedCategory === 'all') {
    return category === 'all'; // Si selectedCategory est 'all', retourne true seulement si category est 'all'
  } else {
    return this.selectedCategory === category.name; // Compare avec category.name seulement si selectedCategory est de type Category
  }
}
showAllProducts(){
  this.selectedCategory='all';
  this.getAllProduct()
}
totalCarpoolings: number = 0;

getpoint(){
  this.CarppolingService.calculatePoints().subscribe(
    (total: number) => {
      this.totalCarpoolings = total;
      console.log("your  points :" ,this.totalCarpoolings);
      this.calculateDiscountForAllProducts();
    },
    (error: any) => {
      console.log(error);
    }
  );
}
calculateDiscountForAllProducts() {
  // Assurez-vous que totalCarpoolings est défini
  if (this.totalCarpoolings === null || this.totalCarpoolings === undefined) {
    console.error("Le nombre total de points n'est pas défini.");
    return;
  }

  // Supposons que vous avez une liste de produits appelée 'products'
  // Vous pouvez la remplacer par la liste de produits réelle que vous utilisez
  const products: any[] = [/* liste de produits */];

  // Parcours de tous les produits pour calculer la réduction
  products.forEach(product => {
    // Vérifiez si le produit a un prix défini
    if (product.price === null || product.price === undefined) {
      console.error("Le prix du produit n'est pas défini :", product);
      return;
    }

    // Calculer la réduction pour ce produit
    const discountedPrice = this.calculateDiscount(product.price);
    console.log("Réduction pour le produit", product.name, ":", discountedPrice);
    // Vous pouvez affecter le prix réduit au produit si nécessaire
    // product.discountedPrice = discountedPrice;
  });
}

calculateDiscount(originalPrice: number): number {
  // Supposons que chaque point donne une réduction de 0.1 dt
  const discountPerPoint = 0.05;

  // Calculer la réduction totale en fonction du nombre de points obtenus
  const totalDiscount = this.totalCarpoolings * discountPerPoint;

  // Assurer que la réduction totale ne dépasse pas le prix original
  const discountedPrice = originalPrice - totalDiscount;
    console.log("points   ",this.totalCarpoolings);
    
    
  // Assurer que le prix après réduction est positif
  return Math.max(totalDiscount, 0);
}

}
