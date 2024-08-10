package com.jihedMathlouthi.veloBack.ServiceImp;


import com.jihedMathlouthi.veloBack.Entity.Defi;
import com.jihedMathlouthi.veloBack.Entity.Notification;
import com.jihedMathlouthi.veloBack.Entity.User;
import com.jihedMathlouthi.veloBack.Repository.DefiRepository;
import com.jihedMathlouthi.veloBack.Repository.NotificationRepository;
import com.jihedMathlouthi.veloBack.Repository.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class NotificationServiceImpl  {
   @Autowired
    private UserRepo userDao;

    @Autowired
    private NotificationRepository notificationRepository;
    @Autowired
    private DefiRepository defiRepository;
    public Notification envoyerNotification(long carpoolingid, String message, long userId) {
        Defi defi=defiRepository.findById(carpoolingid).orElse(null);
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        User user = userDao.findByUsername(username).orElse(null);
        if (user == null) {
             System.out.println("L'utilisateur avec le nom d'utilisateur " + username + " n'a pas été trouvé.");
        }

       // User user1=carpooling.getUser();
        LocalDateTime dateTime=LocalDateTime.now();
        Notification notification = new Notification();
        notification.setMessage(message);
        notification.setTimestamp(dateTime);
        notification.setUserEnvoyer(user);
        notification.setDefi(defi);
        notification.setUserDestiner(userDao.findById(userId).orElse(null));
        //notification.setAcceptee(true);


        // Ici, vous pouvez implémenter le code pour envoyer réellement la notification
        // par e-mail, SMS, notifications push, etc.
        // Exemple de code d'envoi de notification par console (à des fins de démonstration) :
        System.out.println("Notification envoyée à " + notification.getUserDestiner().getUsername() + ": " + message);
        return notificationRepository.save(notification);

    }

    public List<Notification> getNotificationsForUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        User user = userDao.findByUsername(username).orElse(null);

        if (user == null) {
            System.out.println("L'utilisateur avec le nom d'utilisateur " + username + " n'a pas été trouvé.");
            return Collections.emptyList(); // Retourner une liste vide si l'utilisateur n'est pas trouvé
        }
        List<Notification> notifications = new ArrayList<>();
        // List<Notification> notifications1=notificationRepository.findByUserEnvoyer(user);
        Set<Notification> notifications1 = user.getNotifications();
        System.out.println("liste  " + notifications1);
        // Récupérer tous les covoiturages annoncés par l'utilisateur connecté
        List<Defi> userCarpoolings = defiRepository.findByUser(user);
        //List<Carpooling> carpoolingList=carpoolingRepo.findBy
        for (Notification notification : notifications1) {
            System.out.println("notification " + notification.getMessage());
            if (notification.getUserDestiner().getId().equals(user.getId())) {
                System.out.println("destinee " + notification.getUserDestiner().getId() + "userlogee " + user.getId());
                notifications1.add(notification);
            }
        }

        // Récupérer les notifications associées aux covoiturages réservés par les chercheurs

       /* for (Carpooling carpooling : userCarpoolings) {
            System.out.println("id "+ carpooling.getIdCarpolling());
            System.out.println("chercheurs  "+carpooling.getChercheurs());
           /* if (carpooling.getChercheurs().contains(user)){
                }

            System.out.println("nom voituree " + carpooling.getName() + "  price  " + carpooling.getPrice());
            // Récupérer les chercheurs ayant réservé ce covoiturage
            Set<Notification> carpoolingNotifications = carpooling.getNotifications();


                // Récupérer les notifications liées à ce covoiturage et à ces chercheurs

                // Ajouter les notifications à la liste principale
                notifications.addAll(carpoolingNotifications);*/
              notifications.addAll(notifications1);
        System.out.println(notifications1);


        return notifications ;

    }}















    /*
    private final NotificationRepository notificationRepository;
    private final UserService userService;
    private final UserRepo userRepo;

    @Override
    public Notification getNotificationById(Long notificationId) {
        return notificationRepository.findById(notificationId).orElseThrow(NotificationNotFoundException::new);
    }

    @Override
    public Notification getNotificationByReceiverAndOwningPostAndType(User receiver, Post owningPost, String type) {
        return notificationRepository.findByReceiverAndOwningPostAndType(receiver, owningPost, type)
                .orElseThrow(NotificationNotFoundException::new);
    }

    @Override
    public void sendNotification(User receiver, User sender, Post owningPost, Comment owningComment, String type) {
        try {
            Notification targetNotification = getNotificationByReceiverAndOwningPostAndType(receiver, owningPost, type);
            targetNotification.setSender(sender);
            targetNotification.setIsSeen(false);
            targetNotification.setIsRead(false);
            targetNotification.setDateUpdated(new Date());
            targetNotification.setDateLastModified(new Date());
            notificationRepository.save(targetNotification);
        } catch (NotificationNotFoundException e) {
            Notification newNotification = new Notification();
            newNotification.setType(type);
            newNotification.setReceiver(receiver);
            newNotification.setSender(sender);
            newNotification.setOwningPost(owningPost);
            newNotification.setOwningComment(owningComment);
            newNotification.setIsSeen(false);
            newNotification.setIsRead(false);
            newNotification.setDateCreated(new Date());
            newNotification.setDateUpdated(new Date());
            newNotification.setDateLastModified(new Date());
            notificationRepository.save(newNotification);
        }
    }

    @Override
    public void removeNotification(User receiver, Post owningPost, String type) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();        User authUser = userRepo.findByUsername(username).get();
        Notification targetNotification = getNotificationByReceiverAndOwningPostAndType(receiver, owningPost, type);
        if (targetNotification.getSender() != null && targetNotification.getSender().equals(authUser)) {
            targetNotification.setSender(null);
            targetNotification.setDateLastModified(new Date());
            notificationRepository.save(targetNotification);
        }
    }

    @Override
    public List<Notification> getNotificationsForAuthUserPaginate(Integer page, Integer size) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();        User authUser = userRepo.findByUsername(username).get();
        return notificationRepository.findNotificationsByReceiver(
                authUser,
                PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "dateUpdated"))
        );
    }

    @Override
    public void markAllSeen() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();        User authUser = userRepo.findByUsername(username).get();
        notificationRepository.findNotificationsByReceiverAndIsSeenIsFalse(authUser)
                .forEach(notification -> {
                    if (notification.getReceiver().equals(authUser)) {
                        notification.setIsSeen(true);
                        notification.setDateLastModified(new Date());
                        notificationRepository.save(notification);
                    }
                });
    }

    @Override
    public void markAllRead() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();        User authUser = userRepo.findByUsername(username).get();
        notificationRepository.findNotificationsByReceiverAndIsReadIsFalse(authUser)
                .forEach(notification -> {
                    if (notification.getReceiver().equals(authUser)) {
                        notification.setIsSeen(true);
                        notification.setIsRead(true);
                        notification.setDateLastModified(new Date());
                        notificationRepository.save(notification);
                    }
                });
    }

    @Override
    public void deleteNotification(User receiver, Post owningPost, String type) {
        Notification targetNotification = getNotificationByReceiverAndOwningPostAndType(receiver, owningPost, type);
        notificationRepository.deleteById(targetNotification.getId());
    }

    @Override
    public void deleteNotificationByOwningPost(Post owningPost) {
        notificationRepository.deleteNotificationByOwningPost(owningPost);
    }

    @Override
    public void deleteNotificationByOwningComment(Comment owningComment) {
        notificationRepository.deleteNotificationByOwningComment(owningComment);
    }*/

