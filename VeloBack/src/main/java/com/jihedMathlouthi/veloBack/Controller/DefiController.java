package com.jihedMathlouthi.veloBack.Controller;


import com.jihedMathlouthi.veloBack.Entity.Defi;
import com.jihedMathlouthi.veloBack.Entity.ImageModel;
import com.jihedMathlouthi.veloBack.Entity.Notification;
import com.jihedMathlouthi.veloBack.ServiceImp.DefiService;
import com.jihedMathlouthi.veloBack.ServiceImp.NotificationServiceImpl;
import com.jihedMathlouthi.veloBack.ServiceImp.UserServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
@RequiredArgsConstructor
@CrossOrigin("*")
@RequestMapping("/carpooling")
public class DefiController {

    private final DefiService carpoolingService;
    private final UserServiceImpl userService;
    private final NotificationServiceImpl notificationService;


    @PreAuthorize("hasRole('ROLE_MEMBRE')")

    @PostMapping(value = {"/addd"},consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public Defi addCarpooling(@RequestPart("product") Defi carpooling, @RequestPart("imageFile") MultipartFile[] file ){
        try {
                Set<ImageModel> imageModelSet = uploadImage(file);
                carpooling.setImageModels(imageModelSet);
                return carpoolingService.saveCarpooling(carpooling);

        } catch (Exception e) {
            System.out.println(e.getMessage());
            return null;
        }
    }
    public Set<ImageModel> uploadImage(MultipartFile[] multipartFiles) throws IOException {

        Set<ImageModel> imageModels=new HashSet<>();
        for(MultipartFile file:multipartFiles){
            String fileName = StringUtils.cleanPath(file.getOriginalFilename());
            ImageModel imageModel = new ImageModel();
            imageModel.setFilePath("C:\\xampp\\htdocs\\Defi\\" + fileName); // Utilisation du chemin souhaité
            imageModel.setBytes(file.getBytes());

            // Sauvegarder physiquement le fichier sur le système de fichiers
            saveImageToFileSystem(file, fileName);
            imageModels.add( imageModel);
        }
        return imageModels;
    }
    public void saveImageToFileSystem(MultipartFile file, String fileName) throws IOException {
        String uploadDir = "C:\\xampp\\htdocs\\Defi\\"; // Chemin vers le dossier de destination

        // Créer le dossier s'il n'existe pas déjà
        Path uploadPath = Paths.get(uploadDir);
        Files.createDirectories(uploadPath);

        // Écrire le fichier sur le système de fichiers
        Path filePath = uploadPath.resolve(fileName);
        Files.write(filePath, file.getBytes());
    }
    @GetMapping("/{pid}")
    public Defi getCarpolingById (@PathVariable int pid) {
    return carpoolingService.getCarpolingById(pid);
    }
    @GetMapping("/getall")
    public List<Defi> getAllCarpooling () {
        return carpoolingService.getAllCarpooling();
    }

    @DeleteMapping("/delete/{id}")
    public void deleteCarpooling(@PathVariable("id") int id) {
            carpoolingService.deleteCarpooling(id);
    }
    @PreAuthorize("hasRole('ROLE_MEMBRE')")
    @PostMapping("/adddd")
    public Defi addCarpooling(@RequestBody Defi defi) {
        return carpoolingService.saveCarpooling(defi);
    }


    @PreAuthorize("hasRole('ROLE_MEMBRE')")

    @PostMapping("/reserver")
    public ResponseEntity<String> reserverCovoiturage(@RequestParam Long id) {
        try {
            carpoolingService.reserverDefi(id);
            return ResponseEntity.ok("Réservation effectuée avec succès");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
    @PreAuthorize("hasRole('ROLE_MEMBRE')")

    @PostMapping("/accepterOuRefuser/{carpoolingId}/{accepter}/{userId}")
    public ResponseEntity<String> accepterOuRefuserCovoiturage(@PathVariable("carpoolingId") Integer carpoolingId, @PathVariable("accepter") boolean accepter, @PathVariable("userId") Integer userId) {
        try {
            carpoolingService.accepterOuRefuserCovoiturage(carpoolingId,userId, accepter );
            return ResponseEntity.ok(accepter ? "Réservation acceptée" : "Réservation refusée");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Une erreur s'est produite");
        }
    }
    @PreAuthorize("hasRole('ROLE_MEMBRE')")

    @PostMapping("/annulerAcceptation/{carpoolingId}/{userId}")
    public ResponseEntity<String> annulerAcceptationCovoiturage(@PathVariable("carpoolingId") Integer carpoolingId,@PathVariable("userId") Integer userId) {
        try {
            // Appeler le service pour annuler l'acceptation du covoiturage
            carpoolingService.annulerAcceptationCovoiturage(carpoolingId,userId);

            // Retourner une réponse OK avec un message approprié
            return ResponseEntity.ok("Acceptation du covoiturage annulée avec succès");
        } catch (IllegalArgumentException e) {
            // Gérer les exceptions liées à la non-validation des paramètres
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            // Gérer toute autre exception interne
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Une erreur s'est produite");
        }
    }
    @PreAuthorize("hasRole('ROLE_MEMBRE')")

    @GetMapping("/user")
    public ResponseEntity<List<Notification>> getNotificationsForUser() {

        List<Notification> notifications = notificationService.getNotificationsForUser();
        return ResponseEntity.ok(notifications);
    }

    @PreAuthorize("hasRole('ROLE_MEMBRE')")

    @PostMapping("/send/{carpoolingid}/{id}")
    public ResponseEntity<String> sendNotification(@PathVariable("carpoolingid") int carpoolingid,@RequestBody String message,@PathVariable("id") long id) {
        try {
            notificationService.envoyerNotification( carpoolingid, message,id);
            return ResponseEntity.ok("Notification envoyée avec succès !");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erreur lors de l'envoi de la notification");
        }
    }
    @PreAuthorize("hasRole('ROLE_MEMBRE')")

    @GetMapping("/gain-carpooling")
    public int calculateCarpoolingGain() {
        return carpoolingService.nbrdecovoiturage();
    }

    @GetMapping("/calculatePoints")
    public int calculatePoints() {
        int totalCarpoolings = carpoolingService.calculatePoints();

        return totalCarpoolings;
    }
    }
