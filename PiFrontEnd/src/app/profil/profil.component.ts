import { Component } from '@angular/core';
import { AuthService } from '../Service/auth.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { notification } from '../model/Notification';
import { Router } from '@angular/router';
import { CarppolingServiceService } from '../Service/carppoling-service.service';
import Swal from 'sweetalert2';
import { NotificationsDialogComponent } from '../Carpooling/notifications-dialog/notifications-dialog.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent {
  constructor(private datePipe: DatePipe,private dialog :MatDialog ,private authService: AuthService,private router : Router,private productservice:CarppolingServiceService) {}

  logout() {
    this.authService.logout(); // Appelle la méthode de déconnexion
  }
  formatDate(date: Date): string {
    return this.datePipe.transform(date, 'dd/MM/yyyy HH:mm:ss') || '';
  }
  convertirLocalDateTimeEnDate(localDateTime: any): Date {
    // Vous devrez implémenter cette méthode en fonction de votre format de LocalDateTime
    // Si localDateTime est une chaîne de caractères au format ISO 8601, vous pouvez utiliser new Date(localDateTime)
    // Si localDateTime est un objet, vous devrez extraire les informations de date et les utiliser pour créer une nouvelle instance de Date
    // Voici un exemple générique :
    const year = localDateTime.year;
    const month = localDateTime.monthValue - 1; // Les mois en JavaScript sont 0-indexés
    const day = localDateTime.dayOfMonth;
    const hour = localDateTime.hour;
    const minute = localDateTime.minute;
    const second = localDateTime.second;
    return new Date(year, month, day, hour, minute, second);
  }
  padZero(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }
ngOnInit(): void {
  
  this.getpoint();
  
  
  this.notifications = this.trierNotificationsParDate(this.notifications);

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
    width: '500px', // Définissez la largeur du mat-dialog selon vos besoins
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
    totalCarpoolings: number = 0;

getpoint(){
    this.productservice.calculatePoints().subscribe(
      (total: number) => {
        this.totalCarpoolings = total;
        console.log("your  points :" ,this.totalCarpoolings);

      },
      (error: any) => {
        console.log(error);
      }
    );
}}
