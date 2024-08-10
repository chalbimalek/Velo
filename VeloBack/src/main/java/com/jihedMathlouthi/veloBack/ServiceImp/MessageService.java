package com.jihedMathlouthi.veloBack.ServiceImp;

import org.springframework.stereotype.Service;

@Service
public class MessageService {
/*
    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @Autowired
    private MessageRepository messageRepository;

    public void sendMessage(Message message) {
        // Vérifier si le récepteur du message est null
        if (message.getReceiver() == null) {
            throw new IllegalArgumentException("Le récepteur du message ne peut pas être null");
        }

        // Sauvegarder le message en base de données
        if (message.getContent() == null || message.getContent().isEmpty()) {
            throw new IllegalArgumentException("Le contenu du message ne peut pas être vide");
        }

        // Sauvegarder le message en base de données
        message.setTimestamp(LocalDateTime.now());
        messageRepository.save(message);

        // Envoyer le message à l'utilisateur destinataire via WebSocket
        messagingTemplate.convertAndSendToUser(
                message.getReceiver().getUsername(), "/queue/messages", message);
    }



    public List<Message> getAllMessagesForCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        return messageRepository.findAllByReceiverUsername(username);
    }

    // Autres méthodes pour la récupération des messages, etc.*/
}
