package com.jihedMathlouthi.veloBack.ServiceImp;

import com.jihedMathlouthi.veloBack.Entity.Defi;
import com.jihedMathlouthi.veloBack.Entity.Notification;
import com.jihedMathlouthi.veloBack.Entity.Product;
import com.jihedMathlouthi.veloBack.Entity.User;
import com.jihedMathlouthi.veloBack.Repository.DefiRepository;
import com.jihedMathlouthi.veloBack.Repository.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.core.MessageSendingOperations;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.DayOfWeek;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class DefiService {

    private final DefiRepository defiRepository;
    private final UserRepo userDao;
    private final NotificationServiceImpl notificationService;
    private final MessageSendingOperations<String> wsTemplate;

    @Transactional
    public Defi saveCarpooling(Defi Defi) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        User user = userDao.findByUsername(username).orElse(null);
        if (user == null) {
            System.out.println("L'utilisateur avec le nom d'utilisateur " + username + " n'a pas été trouvé.");
            return null;
        }

        Defi carpooling1 = defiRepository.save(Defi);
        carpooling1.setUser(user);
        carpooling1.setStatus(false);
        return carpooling1;
    }


    public Defi getCarpolingById(long id) {

        return defiRepository.findById(id).orElse(null);
    }

    public List<Defi> getAllCarpooling() {
        // return carpoolingRepo.findAllExceptUserCarpoolingsHistory();
        LocalDateTime currentDate = LocalDateTime.now();


        return defiRepository.getDefi();
    }


    public void deleteCarpooling(long id) {
        defiRepository.deleteById(id);
    }



    @Transactional
    public void reserverDefi(long Id) {
        // Récupérer l'utilisateur actuellement authentifié
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        User chercheur = userDao.findByUsername(username).orElseThrow(() -> new IllegalStateException("Utilisateur non trouvé"));

        // Récupérer le covoiturage par son identifiant
        Defi carpooling = defiRepository.findById(Id).orElseThrow(() -> new IllegalArgumentException("Covoiturage non trouvé"));

        // Vérifier si l'utilisateur ne peut pas réserver son propre covoiturage
        if (chercheur.equals(carpooling.getUser())) {
            throw new IllegalStateException("Vous ne pouvez pas réserver votre propre covoiturage");
        }

        // Vérifier si l'utilisateur a déjà réservé ce covoiturage
        List<User> chercheurs = carpooling.getChercheurs();
        if (chercheurs.stream().anyMatch(u -> u.getId().equals(chercheur.getId()))) {
            throw new IllegalStateException("Vous avez déjà réservé ce covoiturage");
        }


        // Ajouter l'utilisateur à la liste des chercheurs pour ce covoiturage
        chercheurs.add(chercheur);
        carpooling.setChercheurs(chercheurs); // Mettre à jour la liste des chercheurs
        defiRepository.save(carpooling);
        System.out.println("jjjjj "
                + carpooling.getUser().getId());

        // Envoyer une notification à l'utilisateur annonçant la demande de réservation
        notificationService.envoyerNotification(Id, "Demande de réservation reçue à ", carpooling.getUser().getId());
        //wsTemplate.convertAndSend("/topic/notification/" ," Demande de réservation reçue à"+  carpooling.getUser().getId());

    }

    @Transactional
    public void accepterOuRefuserCovoiturage(long id, long userId, boolean accepter) {
        Defi defi = defiRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Covoiturage non trouvé"));
        User user1 = userDao.findById(userId).orElse(null);

        // Vérifier si l'utilisateur est l'un des chercheurs pour ce covoiturage
        boolean userFound = false;
        for (User chercheur : defi.getChercheurs()) {

            System.out.println("chercheur " + chercheur.getId());
            System.out.println("id  " + userId);
            if (chercheur.getId().equals(userId)) {
                Set<User> useracceptee = defi.getUtilisateursAcceptes();
                if (useracceptee.stream().anyMatch(u -> u.getId().equals(chercheur.getId()))) {

                    System.out.println("Vous avez déjà acceptee ce user ");
                    throw new IllegalStateException("Vous avez déjà acceptee ce user ");
                }


                userFound = true;
                System.out.println(userFound);

                break;
            }
        }
        if (!userFound) {
            System.out.println(userFound);
            throw new IllegalArgumentException("L'utilisateur spécifié n'est pas un chercheur pour ce covoiturage.");
        }


        if (accepter && defi.getNbrPlaceDisponible() > 0) {
            // Accepter la réservation pour l'utilisateur spécifié
            defi.setNbrPlaceDisponible(defi.getNbrPlaceDisponible() - 1);
            defi.getUtilisateursAcceptes().add(user1);
            if (defi.getNbrPlaceDisponible() == 0) {
                defi.setStatus(true);
                //carpoolingRepo.deleteById(carpoolingId);
                Notification notification1 = notificationService.envoyerNotification(id, "Felicitation a toi, tous les places sont pleines !!! ", defi.getUser().getId());
                for (Notification notification : defi.getNotifications()) {
                    if (notification.getUserEnvoyer().getId().equals(defi.getUser().getId())) {
                        notification1.setAcceptee(true);
                        notification.setAcceptee(true);
                        notification.setRefusee(true);
                        notification1.setRefusee(true);

                        //  notification.setRefusee(true);
                    }
                }
            }

            // Mettre à jour les notifications pour l'utilisateur spécifié


            // Enregistrer les modifications dans la base de données
            defiRepository.save(defi);

            // Envoyer une notification à l'utilisateur spécifié
            Notification notification1 = notificationService.envoyerNotification(id, "Votre réservation avec " + defi.getUser().getUsername() + "  a été acceptée à ", userId);
            for (Notification notification : defi.getNotifications()) {
                if (notification.getUserEnvoyer().getId().equals(userId)) {
                    notification1.setAcceptee(true);
                    notification.setAcceptee(true);
                    notification.setRefusee(true);
                    notification1.setRefusee(false);

                    //  notification.setRefusee(true);
                }
            }
        } else {
            // Refuser la réservation pour l'utilisateur spécifié


            // Enregistrer les modifications dans la base de données
            defiRepository.save(defi);

            // Envoyer une notification à l'utilisateur spécifié
            Notification notification1 = notificationService.envoyerNotification(id, "Votre réservation avec " + defi.getUser().getUsername() + " a été refusée à ", userId);
            for (Notification notification : defi.getNotifications()) {
                if (notification.getUserEnvoyer().getId().equals(userId)) {
                    notification1.setAcceptee(false);
                    notification1.setRefusee(true);
                    notification.setAcceptee(false);
                    notification.setRefusee(true);
                }
            }
        }
    }

    @Transactional
    public void annulerAcceptationCovoiturage(long idd, long id) {
        Defi carpooling = defiRepository.findById(idd)
                .orElseThrow(() -> new IllegalArgumentException("Covoiturage non trouvé"));
        User user = userDao.findById(id).orElse(null);
        if (carpooling.getUtilisateursAcceptes().contains(user)) {
            // Annuler l'acceptation
            carpooling.setNbrPlaceDisponible(carpooling.getNbrPlaceDisponible() + 1);
            carpooling.getUtilisateursAcceptes().remove(user);
            carpooling.setStatus(false);
            defiRepository.save(carpooling);

            // Envoyer une notification au chercheur
            assert user != null;
            for (Notification notification1 : carpooling.getNotifications()) {
                if (notification1.getUserDestiner().getId().equals(id)) {
                    notification1.setRefusee(true);
                }
            }
            Notification notification = notificationService.envoyerNotification(id, user.getUsername() + "  a  annulée la réservation", carpooling.getUser().getId());
            notification.setRefusee(true);
        } else {
            throw new IllegalArgumentException("Vous n'avez pas encore accepté cette réservation.");
        }
    }

    public int nbrdecovoiturage() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        User annoncer = userDao.findByUsername(username).orElseThrow(() -> new IllegalStateException("Utilisateur non trouvé"));
        Set<Defi> carpoolings = annoncer.getAnnonceDefiSet();
        int gain = 0;
        for (Defi carpooling : carpoolings) {
            if (carpooling.getStatus())
                gain++;
        }
        return gain;

    }

    public int calculatePoints() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        User user = userDao.findByUsername(username).orElseThrow(() -> new IllegalStateException("Utilisateur non trouvé"));
        Set<Defi> defis = user.getAnnonceDefiSet();
        int totalPoints = 0;
        int totalCarpoolings = defis.size();
        int weekdayCarpoolings = 0;

        // Compter le nombre de covoiturages effectués en semaine
        for (Defi defi : defis) {
            if (defi.getStatus()) {
                weekdayCarpoolings++;
                System.out.println(weekdayCarpoolings);
                totalPoints += weekdayCarpoolings * POINTS_PER_CARPPOOLING;

            }
        }

        // Calculer les points en fonction du nombre de covoiturages en semaine
       /* if (weekdayCarpoolings >= 5) {
            totalPoints += 100;
        }*/
        System.out.println("1 " + totalCarpoolings);
        System.out.println("2 " + totalPoints);


        return totalPoints;
    }

    private static final int POINTS_PER_CARPPOOLING = 10;

    public boolean isWeekdayCarpooling(Defi defi) {
        LocalDateTime departureDateTime = defi.getDateSortie();
        DayOfWeek dayOfWeek = departureDateTime.getDayOfWeek();
        return dayOfWeek != DayOfWeek.SATURDAY && dayOfWeek != DayOfWeek.SUNDAY;
    }

    public int calculatePointsPerCarpooling(int totalCarpoolings) {
        // Votre logique pour déterminer le nombre de points par covoiturage
        if (totalCarpoolings >= 5) {
            System.out.println(totalCarpoolings);
            return POINTS_PER_CARPPOOLING * 2; // Double points si le nombre de covoiturages est égal ou supérieur à 5
        } else {
            return POINTS_PER_CARPPOOLING;
        }
    }

}
