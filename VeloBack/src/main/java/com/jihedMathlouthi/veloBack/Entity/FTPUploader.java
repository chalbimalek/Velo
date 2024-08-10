package com.jihedMathlouthi.veloBack.Entity;

import org.apache.commons.net.ftp.FTP;
import org.apache.commons.net.ftp.FTPClient;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;
@Component
public class FTPUploader {

    public Set<ImageModel> uploadImage(MultipartFile[] files) throws IOException {
        Set<ImageModel> imageModelSet = new HashSet<>();

        for (MultipartFile file : files) {
            byte[] bytes = file.getBytes();
            String fileName = file.getOriginalFilename();

            // Enregistrement sur le serveur FTP
            // Utilisez FTPClient ou toute autre bibliothèque FTP que vous préférez
            // Appelez la méthode FTP pour envoyer le fichier et récupérez le chemin sur le serveur

            String ftpFilePath = uploadFileToFTP(bytes, fileName);

            // Créez un objet ImageModel avec le chemin FTP
            ImageModel imageModel = new ImageModel();
            imageModel.setFilePath(ftpFilePath);

            // Ajoutez cet objet à votre set
            imageModelSet.add(imageModel);
        }

        return imageModelSet;
    }

    private String uploadFileToFTP(byte[] bytes, String fileName) {
        String ftpServer = "192.168.233.130";
        int ftpPort = 20;
        String ftpUsername = "malekchalbi";
        String ftpPassword = "azerty";
        String ftpDirectory = "Media";

        String remoteFilePath = "";

        FTPClient ftpClient = new FTPClient();
        try {
            ftpClient.connect(ftpServer, ftpPort);
            ftpClient.login(ftpUsername, ftpPassword);
            ftpClient.enterLocalPassiveMode();
            ftpClient.setFileType(FTP.BINARY_FILE_TYPE);

            // Générez un nom de fichier unique
            String uniqueFileName = UUID.randomUUID().toString() + "_" + fileName;

            // Créez un flux d'entrée à partir du tableau de bytes
            ByteArrayInputStream inputStream = new ByteArrayInputStream(bytes);

            // Changez le répertoire de travail sur le serveur FTP
            ftpClient.changeWorkingDirectory(ftpDirectory);

            // Enregistrez le fichier sur le serveur FTP
            boolean uploaded = ftpClient.storeFile(uniqueFileName, inputStream);
            inputStream.close();

            if (uploaded) {
                // Construisez le chemin complet du fichier sur le serveur
                remoteFilePath = ftpDirectory + uniqueFileName;
                System.out.println("Le fichier a été téléchargé avec succès sur le serveur FTP : " + remoteFilePath);
            } else {
                System.out.println("Erreur lors du téléchargement du fichier sur le serveur FTP.");
            }
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                if (ftpClient.isConnected()) {
                    ftpClient.logout();
                    ftpClient.disconnect();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return remoteFilePath;
    }
}
