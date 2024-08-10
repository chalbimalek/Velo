export interface Message {
    id?: number; // L'ID du message peut être facultatif selon votre logique
    senderId: number; // L'ID de l'utilisateur envoyant le message
    receiverId: number; // L'ID de l'utilisateur recevant le message
    content: string; // Le contenu du message
    timestamp: Date; // La date et l'heure d'envoi du message
  }
  