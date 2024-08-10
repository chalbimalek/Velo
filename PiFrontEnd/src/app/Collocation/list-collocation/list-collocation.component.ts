import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Observable, Subscriber, map } from 'rxjs';
import { AuthService } from 'src/app/Service/auth.service';
import { CollocationServiceService } from 'src/app/Service/collocation-service.service';
import { Collocation } from 'src/app/model/Collocation';
import Swal from 'sweetalert2';
import { FileHandle } from 'src/app/model/file_handle.model';
import { CollocationProcessingService } from '../ImageCollocation/collocation-processing.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-list-collocation',
  templateUrl: './list-collocation.component.html',
  styleUrls: ['./list-collocation.component.css']
})
export class ListCollocationComponent implements OnInit {
  p:number=1;
    searchTerm: string='' ;
    public productDetails: Collocation[] = [];

    constructor(private router : Router,private productservice:CollocationServiceService,private sanitizer:DomSanitizer,private imageProcessingService:CollocationProcessingService){}
    ngOnInit(): void {
      this.getAllProduct();
    }
    public getAllProduct(){
      this.productservice.getAllProduct(this.pageNumber).
      pipe(
       map((products: Collocation[],i) => products.map((product: Collocation) => this.imageProcessingService.createImages(product)))
    
      ).
      subscribe(
        (resp:Collocation[])=>{
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
      this.router.navigate(['/detailsColl',{id:id}]);
    }
  
    formData: FormData = new FormData();
  
   
    product!:Collocation ;
  
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
        map((x: Collocation[], i) => x.map((product: Collocation) => this.imageProcessingService.createImages(product)))
      )
      .subscribe(
        (resp: Collocation[]) =>{
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
  nbrPlaceDisponible=5;
  reserver() {
    // Vérifier s'il y a des places disponibles
    if (this.nbrPlaceDisponible > 0) {
      // Décrémenter le nombre de places disponibles
      this.nbrPlaceDisponible--;

      // Autres actions à effectuer lors de la réservation (redirection, etc.)
      // ...

      // Exemple : Afficher un message de confirmation dans la console
      console.log('Place réservée avec succès!');
    } else {
      // Si aucune place disponible, afficher un message d'erreur ou désactiver le bouton de réservation
      console.log('Aucune place disponible.');
    }
  }

  
  searchCarpoolingByGouv(gouv: string) {
    this.selectedGouvernorat = gouv;
    this.productservice.searchCarpoolingbyGouv(gouv).pipe(
      // Utilisez map pour filtrer et retourner seulement les covoiturages appartenant à la gouvernorat spécifiée
      map((products: Collocation[]) => products.map((product: Collocation) => this.imageProcessingService.createImages(product))),
      map((carpoolings: Collocation[]) => carpoolings.filter(carpooling => carpooling.lieux === gouv))
    ).subscribe(
      (resp: Collocation[]) => {
        this.productDetails=resp;

        console.log(resp);
        // Gérez la réponse filtrée ici
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }
  gouvernoratOptions = [
    { label: 'ghazela', value: 'ghazela' },
    { label: 'rawad', value: 'rawad' },
    { label: 'nour jaafer', value: 'nour jaafer' },
    { label: 'nkhilette', value: 'nkhilette' },
    { label: 'ariana soghra', value: 'ariana soghra' },
    // Ajoutez d'autres options selon vos besoins
];
selectedGouvernorat: string = ''; // Déclarez une propriété pour suivre l'état de sélection

isSelected(gouv: string): boolean {
    return gouv === this.selectedGouvernorat; // Retourne vrai si le gouvernorat est sélectionné
}
showAllProducts(){
  this.selectedGouvernorat = 'all'; // Définir 'all' comme sélectionné

  this.getAllProduct();
}
formatDate(date: Date): string {
  if (date && !isNaN(date.getTime())) {
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    };
    return new Date(date).toLocaleString('fr-FR', options);
  } else {
    return 'Date invalide';
  }
}
}

