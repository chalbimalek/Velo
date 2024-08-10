import { Component } from '@angular/core';
import { Message } from '../model/Message';
import { MessageServiceService } from '../Service/message-service.service';
@Component({
  selector: 'app-message-form',
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.css']
})
export class MessageFormComponent {

  constructor(private messageService: MessageServiceService) { }

  content!: string;
  receiverId!: number;


  sendMessage() {
    const message = {
      senderId: 1, // ID de l'utilisateur envoyant le message
      receiverId: this.receiverId,
      content: this.content,
      timestamp: new Date()
    };

    this.messageService.sendMessage(message).subscribe(
      response => {
        console.log('Message sent successfully:', response);
        // Gérer la réponse, par exemple mettre à jour l'interface utilisateur
      },
      error => {
        console.error('Error sending message:', error);
        // Gérer l'erreur, par exemple afficher un message d'erreur à l'utilisateur
      }
    );
  }

}
