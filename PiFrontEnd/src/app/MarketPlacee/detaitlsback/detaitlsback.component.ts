import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../../Service/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../model/product';
import * as QRCode from 'qrcode';
import Swal from 'sweetalert2';
import { ProductRating } from 'src/app/model/ProductRating';
import { QRDialogComponent } from 'src/app/qrdialog/qrdialog.component';
import { MatDialog } from '@angular/material/dialog';
import { CommentDialogComponent } from '../comment-dialog/comment-dialog.component';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ProductComment } from 'src/app/model/ProductComment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CarppolingServiceService } from 'src/app/Service/carppoling-service.service';

@Component({
  selector: 'app-detaitlsback',
  templateUrl: './detaitlsback.component.html',
  styleUrls: ['./detaitlsback.component.css']
})
export class DetaitlsbackComponent implements OnInit {
addToCart(productId: any) {

   this.productService.addToCart(productId).subscribe(
    
    
      (response) => {
        console.log(response);
        Swal.fire('Success!', 'Produit ajouté avec succès dans le cart', 'success');

      },(error) => {
        console.log(error)
      }
    )
    console.log(productId);}

  selectProductIndex = 0;
  product!: Product;
  private ratingSubscription!: Subscription;

  constructor(private CarppolingService:CarppolingServiceService,private activatedRoute: ActivatedRoute, private router : Router,
    private productService: ProductService,public dialog: MatDialog,    private snackbar: MatSnackBar,
  ) { }

  ngOnInit(): void {

   this.product = this.activatedRoute.snapshot.data['product'];
    this.getproductraitingbyproduct(this.product.idProduct);

    this.ratingSubscription = this.productService.getRating(this.product.idProduct).subscribe(newRating => {
      this.rating = newRating;
    });
    this.getpoint();


  }
  ngOnDestroy(): void {
    this.ratingSubscription.unsubscribe();
  }
  
  changeIndex(index:any){
    this.selectProductIndex=index;
  }

  product1: any = {  // Exemple d'objet de produit
    name: 'Nom du produit',
    description: 'Description du produit',
    price: 'Prix du produit',
    address: 'Adresse du produit'
  };


  openQRDialog(): void {
    const dialogRef = this.dialog.open(QRDialogComponent, {
      width: '200px',
      data: { product: this.product } // Passer l'URL de votre code QR à afficher
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('La boîte de dialogue a été fermée');
    });
  }

  currentDate: Date = new Date();
  //////////////////////////rating//////////////////
  
  saveProductRating(productId: number, rating: number, comment: string): void {
    const productRating: ProductRating = {
      rating: rating,
      comment: comment,
      
    };
          this.productService.saveProductRating(productId, productRating).subscribe(
      response => {
        console.log('Rating saved successfully:', response);
        Swal.fire('Success!', 'Add Comment ', 'success');
        this.rating = 0; 
        this.comment = '';
        this.ratingSelected = false;

      },
      error => {
        console.error('An error occurred while saving rating:', error);
      }
    );
  }
  rating: number = 0; // Note de rating actuelle
  comment: string = '';
  selectedRating: number = 0;

 /*setRating(rating: number): void {
    this.rating = rating;
    this.ratingSelected=true;
    console.log('Rating selected:', this.rating);

  }*/


  productComment: ProductComment[] | null = null; // Initialiser avec une valeur nulle

  getproductraitingbyproduct(id :number) {
    this.productService.getProductRatingByProductId(id).subscribe(
      (data: ProductComment[]) => {
        this.productComment = data;
      },
      error => {
        console.log('Une erreur s\'est produite lors de la récupération des notes de rating du produit:', error);
      }
    );
  }
  openCommentDialog(): void {
    const dialogRef = this.dialog.open(CommentDialogComponent, {
      width: '600px', // Définissez la largeur de la boîte de dialogue selon vos besoins
      data: { productComment: this.productComment } // Transmettez les données des commentaires à afficher
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('La boîte de dialogue des commentaires a été fermée');
    });
  }
  

  ratingSelected: boolean = false;

  /////////////////////////////////
  async rateProduct(productId: number, rating: number) {
    try {
      const response = await this.productService.rateProduct(productId, rating).toPromise();
      console.log('Rating saved:', response);
      // Afficher une notification de succès
      Swal.fire('Success!', 'Rating saved successfully.', 'success');
      this.selectedRating = this.rating; // Mettre à jour les étoiles sélectionnées après sauvegarde

    } catch (error) {
      console.error('Error saving rating:', error);
      // Afficher une notification d'erreur
      Swal.fire('Error', 'Failed to save rating. Please try again.', 'error');
    }
  }
  async submitRating(productId: number): Promise<void> {
    if (this.rating === 0) {
      Swal.fire('Error', 'Please select a rating.', 'error');
      return;
    }

    try {
      await this.rateProduct(productId, this.rating);
      // Mettre à jour les étoiles sélectionnées après sauvegarde
      this.selectedRating = this.rating;
    } catch (error) {
      console.error('Error saving rating:', error);
    }
  }
  async commentProduct(productId: number, comment: string) {
    try {
      const response = await this.productService.commentProduct(productId, comment).toPromise();
      console.log('Comment saved:', response);
      // Afficher une notification de succès.
      this.snackbar.open('Comment saved successfully..', 'close', { duration: 5000 });

      //Swal.fire('Success!', 'Comment saved successfully.', 'success');
    } catch (error) {
      console.error('Error saving comment:', error);
      // Afficher une notification d'erreur
      Swal.fire('Error', 'Failed to save comment. Please try again.', 'error');
    }
  }

 

  submitComment(productId:number): void {
    if (this.comment.trim() === '') {
      Swal.fire('Error', 'Please provide a comment.', 'error');
      return;
    }

    // Remplacez par l'ID du produit concerné
    this.productService.commentProduct(productId, this.comment).subscribe(
      (response) => {
        console.log('Comment saved:', response);
        this.snackbar.open('Comment saved successfully..', 'close', { duration: 5000 });

       // Swal.fire('Success!', 'Comment saved successfully.', 'success');
        this.comment = ''; // Réinitialiser le commentaire après avoir sauvegardé
      },
      (error) => {
        console.error('Error saving comment:', error);
        Swal.fire('Error', 'Failed to save comment. Please try again.', 'error');
      }
    );
  }

  
  setRating(rating: number): void {
    // Enregistrement du rating dans le service et mise à jour de l'affichage
    this.productService.setRating(this.product.idProduct, rating);
    this.rating = rating;
    this.ratingSelected = true;
    console.log('Rating selected:', this.rating);
  }

  clearRating(): void {
    // Efface le rating du stockage local et réinitialise l'affichage
    this.productService.clearRating(this.product.idProduct);
    this.rating = 0;
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
    return Math.max(discountedPrice, 0);
  }
  }


  


