import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Defi } from 'src/app/model/Defi';
import { AuthService } from 'src/app/Service/auth.service';
import { DefiServiceService } from 'src/app/Service/defi-service.service';
import { DefiProcessingService } from '../ImageDefi/defi-processing.service';
import { HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AcceptedUsersDialogComponent } from '../accepted-users-dialog/accepted-users-dialog.component';

@Component({
  selector: 'app-list-defi',
  templateUrl: './list-defi.component.html',
  styleUrls: ['./list-defi.component.css']
})
export class ListDefiComponent implements OnInit {
  openAcceptedUsersDialog(): void {
    const dialogRef = this.dialog.open(AcceptedUsersDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  p:number=1;
    searchTerm: string='' ;
    public productDetails: Defi[] = [];

    constructor(public dialog: MatDialog,private authService: AuthService,private router : Router,private productservice:DefiServiceService,private sanitizer:DomSanitizer,private imageProcessingService:DefiProcessingService){}
    ngOnInit(): void {
      //this.getAllCarpooling();
      this.getAllCarpooling1();

    }

    public getAllCarpooling1(){
      this.productservice.getAllProduct(this.pageNumber).
      subscribe(
        (resp:Defi[])=>{
        console.log(resp);
        this.productDetails=resp;
      },(error:HttpErrorResponse )=>{
        console.log(error);
      }
      );
    }
    public getAllCarpooling(){
      this.productservice.getAllProduct(this.pageNumber).
      pipe(
       map((products: Defi[],i) => products.map((product: Defi) => this.imageProcessingService.createImages(product)))

      ).
      subscribe(
        (resp:Defi[])=>{
        console.log(resp);
        this.productDetails=resp;
      },(error:HttpErrorResponse )=>{
        console.log(error);
      }
      );
    }
    get filteredProducts() {
      return this.productDetails.filter(product => {
        // Vérifier si product et product.name ne sont pas null avant d'accéder à la propriété name
        if (product && product.pointArrivee) {
          // Filtrer les produits en fonction du terme de recherche
          return product.pointArrivee.toLowerCase().includes(this.searchTerm.toLowerCase());
        }
        return false;
      });
    }


    goToProduct(id: any) {
      this.router.navigate(['/detailsdefi', id]); // Utilisez /:id pour définir le paramètre d'ID dans l'URL
    }


    formData: FormData = new FormData();


    product!:Defi ;

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
        map((x: Defi[], i) => x.map((product: Defi) => this.imageProcessingService.createImages(product)))
      )
      .subscribe(
        (resp: Defi[]) =>{
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
       this.getAllCarpooling();
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
      map((products: Defi[]) => products.map((product: Defi) => this.imageProcessingService.createImages(product))),
      map((carpoolings: Defi[]) => carpoolings.filter(carpooling => carpooling.gouvernorat === gouv))
    ).subscribe(
      (resp: Defi[]) => {
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
    { label: 'Manouba', value: 'Manouba' },
    { label: 'Ben arous', value: 'Ben arous' },

    { label: 'Autre', value: 'Autre' }
    // Ajoutez d'autres options selon vos besoins
];
selectedGouvernorat: string = ''; // Déclarez une propriété pour suivre l'état de sélection

isSelected(gouv: string): boolean {
    return gouv === this.selectedGouvernorat; // Retourne vrai si le gouvernorat est sélectionné
}
showAllProducts(){
  this.selectedGouvernorat = 'all'; // Définir 'all' comme sélectionné

  this.getAllCarpooling();
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
