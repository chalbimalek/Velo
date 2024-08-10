import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../../Service/product.service';
import { Product } from '../../model/product';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ProdutShowDialogComponent } from '../produt-show-dialog/produt-show-dialog.component';
import { ImageProcessingService } from '../../image/image-processing.service';
import { map } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import Swal, { SweetAlertResult } from 'sweetalert2';
import Chart from 'chart.js/auto';
import jspdf from 'jspdf';

@Component({
  selector: 'app-show-product-details',
  templateUrl: './show-product-details.component.html',
  styleUrls: ['./show-product-details.component.css']
})
export class ShowProductDetailsComponent implements OnInit{


constructor(private productservice:ProductService, 
  public imageDialog:MatDialog,
  private imageProcessingService:ImageProcessingService,
  private route:Router){}
productDetails:Product[]=[];
displayedColumns: string[] = ['idProduct', 'Name', 'brand', 'description','images','edit','delete'];


  ngOnInit(): void {
    this.getAllProduct();
        this.fetchMostPurchasedCategory();
        this.getStatistiquesRating();

  }

 

  
  public getAllProduct(){
    this.productservice.getAllProduct(0).
    pipe(
      map((products: Product[],i) => products.map((product: Product) => this.imageProcessingService.createImages(product)))

   ).
    subscribe(
      (resp:Product[])=>{
      console.log(resp);
      this.productDetails=resp;
    }
    );
  }

 public deleteProduct(id : number){
  Swal.fire({
    title: 'Confirmation',
    text: 'Êtes-vous sûr de vouloir supprimer ce produit ?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Oui, supprimer',
    cancelButtonText: 'Annuler'
  }).then((result:SweetAlertResult) => {
    if (result.isConfirmed) {
      this.productservice.deleteProduct(id).subscribe(
        () => {
          console.log("Suppression réussie");
          this.getAllProduct();
          Swal.fire('Success!', 'Produit supprimée avec succès', 'success');

        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
    }
  });
  }
  showImages(product:Product){
    console.log(product);
    this.imageDialog.open(ProdutShowDialogComponent ,{
      data:{
        images:product.imageModels
    },
      height:'500px',
      width:'800px'
    });
    
  }
  editProduct(id:any){
    this.route.navigate(['back/addproduitBack',{id : id}])
    

  }

  add(){
      this.route.navigate(['back/addproduitBack'])
  }


//////
mostPurchasedCategory: string | null = null;
@ViewChild('chartCanvas') private chartCanvas!: ElementRef<HTMLCanvasElement>;
private chartContext: CanvasRenderingContext2D | null = null;
private chart: Chart | null = null;
ngAfterViewInit(): void {
  this.initializeChart();
}
// Au chargement de la page ou au démarrage de l'application
initializeChart(): void {
  this.chartContext = this.chartCanvas.nativeElement.getContext('2d');
  if (this.chartContext) {
    this.chart = new Chart(this.chartContext, {
      type: 'bar',
      data: {
        labels: [],
        datasets: [{
          label: 'Vos données',
          data: [],
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  } else {
    console.error('Contexte du canevas null');
  }
}

// Plus tard, lorsque vous avez les données à afficher sur le graphique
fetchMostPurchasedCategory(): void {
  this.productservice.getMostPurchasedCategory()
    .subscribe(response => {
      try {
        const data: string[] = response;
        data.forEach(item => {
          const splitData = item.split(',');
          const label = splitData[0].trim(); // Récupérer le label de la catégorie
          const value = parseInt(splitData[1].trim(), 10); // Récupérer la valeur numérique

          // Ajouter les labels et les valeurs au graphique
          if (this.chart && this.chart.data && this.chart.data.labels && this.chart.data.datasets && this.chart.data.datasets[0] && this.chart.data.datasets[0].data) {
            this.chart.data.labels.push(label);
            this.chart.data.datasets[0].data.push(value);
            this.chart.update();
          } else {
            console.error('Labels or data array is undefined.');
          }
        });
      } catch (error) {
        console.error('Une erreur s\'est produite lors de l\'analyse de la réponse : ', error);
      }
    }, error => {
      console.error('Une erreur s\'est produite lors de la récupération de la catégorie la plus achetée : ', error);
    });
}






generatePdf(): void {
  if (!this.chart || !this.chartCanvas) {
    console.error('Le graphique ou le canvas n\'est pas initialisé.');
    return;
  }

  // Obtenez le contexte 2D du canvas
  const canvas = this.chartCanvas.nativeElement;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    console.error('Impossible d\'obtenir le contexte 2D du canvas.');
    return;
  }
  const maxWidth = 300; // Largeur maximale
  const maxHeight = 100; // Hauteur maximale

  // Calculez le facteur d'échelle
  const scaleX = maxWidth / canvas.width;
  const scaleY = maxHeight / canvas.height;
  const scale = Math.min(scaleX, scaleY); // Choisissez le facteur d'échelle le plus petit pour conserver les proportions

  // Nouvelles dimensions du graphique dans le PDF
  const scaledWidth = canvas.width * scale;
  const scaledHeight = canvas.height * scale;

  // Créez un objet jspdf
  const pdf = new jspdf('p', 'mm', 'a4');

  // Créez une image à partir du canvas
  const imgData = canvas.toDataURL('image/jpeg', 1.0);

  // Ajoutez l'image au PDF
  pdf.addImage(imgData, 'JPEG', 0, 10, scaledWidth,scaledHeight);

  // Téléchargez le PDF
  pdf.save('chart.pdf');
}
generatePdfButtonClicked(): void {
  this.generatePdf();
}

statistiques: any;

getStatistiquesRating() {
  this.productservice.statistiqueRating().subscribe(
    data => {
      this.statistiques = data;
      console.log('Statistiques des ratings : ', this.statistiques);
    },
    error => {
      console.error('Une erreur est survenue lors de la récupération des statistiques des ratings : ', error);
    }
  );
}



}
