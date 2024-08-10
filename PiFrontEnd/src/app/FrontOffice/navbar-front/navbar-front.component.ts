import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NotificationsDialogComponent } from 'src/app/Carpooling/notifications-dialog/notifications-dialog.component';
import { AuthService } from 'src/app/Service/auth.service';
import { CarppolingServiceService } from 'src/app/Service/carppoling-service.service';
import { notification } from 'src/app/model/Notification';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar-front',
  templateUrl: './navbar-front.component.html',
  styleUrls: ['./navbar-front.component.css']
})
export class NavbarFrontComponent {

  unsubscribe:boolean=false;
  message: string | null = null;
  constructor(private dialog :MatDialog ,private authService: AuthService,private router : Router,private productservice:CarppolingServiceService) { /*this.webSocketService.connectAndSubscribe().then(() => {
    this.webSocketService.getMessage().subscribe((message:any) => {
      this.unsubscribe = true;
      this.message = message;
      console.log(message);
      setTimeout(() => {
        this.message = null;
        this.unsubscribe = false;
      }, 13000);
    });
  });
*/}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
  
    this.loadNotifications();
    // Récupérer le nom d'utilisateur après avoir chargé les notifications
    this.loggedInUser = this.authService.getUserIdFromToken();
           console.log("ddddddddddddd "+this.loggedInUser);
           
       }
       // Déclarez une variable pour contrôler la visibilité des notifications
  showNotifications: boolean = false;
  
  // Méthode pour basculer la visibilité des notifications
  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
  }
  toggleNotifications1() {
  
    // Ouvrir le mat-dialog
    const dialogRef = this.dialog.open(NotificationsDialogComponent, {
      width: '400px', // Définissez la largeur du mat-dialog selon vos besoins
      data: { notifications: this.notifications }, // Passer les données (notifications) au mat-dialog
    });
  }
  
       notifications: notification[] = [];
       loggedInUser: string | null = null;
   
       trierNotificationsParDate(notifications: any[]): any[] {
        return notifications.sort((a, b) => {
          const dateA = new Date(a.timestamp).getTime();
          const dateB = new Date(b.timestamp).getTime();
          return dateB - dateA; // Tri décroissant pour avoir les dates les plus récentes en premier
        });
      }
      
       loadNotifications(): void {
         this.productservice.getNotificationsForUser().subscribe(
           notifications => {
             this.notifications = notifications;
             this.trierNotificationsParDate(this.notifications); // Appeler la méthode pour trier les notifications
             console.log(notifications);
             console.log("username  dddddddd "+this.loggedInUser);
   
             
           },
           error => {
             console.error('Erreur lors de la récupération des notifications :', error);
             // Gérez l'erreur ici, par exemple afficher un message à l'utilisateur
           }
         );
       }
       accepterCovoiturage(carpoolingId: number, userId: number): void {
        if (!carpoolingId || !userId) {
          console.error('ID de covoiturage ou ID utilisateur non valide :', carpoolingId, userId);
          console.log(userId);
          
          return;
        }
      
        this.productservice.accepterOuRefuserCovoiturage(carpoolingId, true, userId)
          .subscribe(response => {
            console.log(userId);
            Swal.fire('Success!', 'User accepte avec succès', 'success');
            console.log('Covoiturage accepté avec succès :', response);
            // Traitez la réponse ici
          }, error => {
            console.error('Erreur lors de l\'acceptation du covoiturage :', error);
            Swal.fire('Success!', 'User accepte avec succès', 'success');
  
            // Gérez l'erreur ici
          });
      }
    
      annulerAcceptationCovoiturage(carpoolingId: number, userId: number): void {
        if (!carpoolingId || !userId) {
          console.error('ID de covoiturage ou ID utilisateur non valide :', carpoolingId, userId);
          console.log(userId);
          
          return;
        }
      
        this.productservice.annulerAcceptationCovoiturage(carpoolingId, userId)
          .subscribe(response => {
            console.log(userId);
            Swal.fire('Success!', 'User Annuler avec succès', 'success');
  
      
            console.log('Covoiturage annule avec succès :', response);
            // Traitez la réponse ici
          }, error => {
            console.error('Erreur lors de l\'acceptation du covoiturage :', error);
            Swal.fire('Success!', 'User Annuler avec succès', 'success');
  
            // Gérez l'erreur ici
          });
      }
      
      refuserCovoiturage(carpoolingId: number, userId: number): void {
        if (!carpoolingId || !userId) {
          console.error('ID de covoiturage ou ID utilisateur non valide :', carpoolingId, userId);
          return;
        }
      
        this.productservice.accepterOuRefuserCovoiturage(carpoolingId, false, userId)
          .subscribe(response => {
            console.log('Covoiturage refusé avec succès :', response);
            Swal.fire('Success!', 'User refusee avec succès', 'success');
  
            // Traitez la réponse ici
          }, error => {
            console.error('Erreur lors du refus du covoiturage :', error);
            Swal.fire('Success!', 'User refusee avec succès', 'success');
  
            // Gérez l'erreur ici
          });
      }


}
