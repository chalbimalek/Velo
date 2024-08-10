import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Defi } from 'src/app/model/Defi';
import { DefiServiceService } from 'src/app/Service/defi-service.service';
import Swal from 'sweetalert2';
import * as QRCode from 'qrcode';
@Component({
  selector: 'app-details-defi',
  templateUrl: './details-defi.component.html',
  styleUrls: ['./details-defi.component.css']
})
export class DetailsDefiComponent {
  @ViewChild('qrcode', { static: false }) qrcode!: ElementRef;

  selectProductIndex = 0;
  product!: Defi;

  constructor(private activatedRoute: ActivatedRoute, private router : Router,
    private productService: DefiServiceService ) { }
id:any
  ngOnInit(): void {

  // this.product = this.activatedRoute.snapshot.data['product'];
  this.id = this.activatedRoute.snapshot.params['id'];
  // Fetch product using the id
  this.productService.getProductById(this.id).subscribe((product: Defi) => {
    this.product = product;
  });

  }

  ngAfterViewInit(): void {
    const qrData = this.constructQRData(this.product);
    this.generateQRCode(qrData);
  }

  constructQRData(product: Defi): string {
    const productId = this.id; // Récupérer l'ID du produit
    const url = `http://localhost:4200/detailCarp/${productId}`; // Construire l'URL avec l'ID du produit
    return url;
  }

  generateQRCode(qrData: string): void {
    QRCode.toCanvas(this.qrcode.nativeElement, qrData, (error) => {
      if (error) {
        console.error('Erreur lors de la génération du code QR:', error);
      }
    });
  }


  reserverCovoiturage(id: number): void {
    this.productService.reserverCovoiturage(id).subscribe(
      response => {
        console.log('Réservation effectuée avec succès :', response);
        Swal.fire('Success!', 'Rating saved successfully.', 'success');

        // Traitez la réponse ou effectuez d'autres actions nécessaires ici
      },
      error => {
        console.error('Erreur lors de la réservation :', error);
        Swal.fire('Success!', 'Reservation  envoyee avec success.', 'success');

        // Gérez l'erreur ici, par exemple afficher un message à l'utilisateur
      }
    );
  }
  envoyerNotification(message: string): void {

    this.productService.envoyerNotification(message).subscribe(
      response => {
        console.log('Notification envoyée avec succès :', response);
        // Affichez un message à l'utilisateur pour confirmer l'envoi de la notification
        alert('Notification envoyée avec succès !');
      },
      error => {
        console.error('Erreur lors de l\'envoi de la notification :', error);
        // Affichez un message d'erreur à l'utilisateur
        alert('Erreur lors de l\'envoi de la notification. Veuillez réessayer.');
      }
    );
  }
  changeIndex(index:any){
    this.selectProductIndex=index;
  }
  isCurrentUserCarpoolingOwner(): boolean {
    // Obtenez le nom d'utilisateur de l'utilisateur courant (simulé ici)
    const currentUsername = this.product.user?.username; // Remplacez par la valeur réelle de l'utilisateur courant

    // Vérifie si l'utilisateur courant n'est PAS l'utilisateur associé au covoiturage
    return !this.product.user || this.product.user.username !== currentUsername;
  }







}
