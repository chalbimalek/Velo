package com.jihedMathlouthi.veloBack.Controller;



import com.jihedMathlouthi.veloBack.Entity.ImageModel;
import com.jihedMathlouthi.veloBack.Entity.Product;
import com.jihedMathlouthi.veloBack.Enum.Category;
import com.jihedMathlouthi.veloBack.Repository.UserRepo;
import com.jihedMathlouthi.veloBack.ServiceImp.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
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

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequiredArgsConstructor
public class ProductController {
    private final ProductService productService;
    private final UserRepo userDao;
//@PreAutherize
    @PostMapping(value = {"/addd"},consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public Product addProduit(@RequestPart("product") Product product, @RequestPart("imageFile") MultipartFile[] file){
        try {
            Set<ImageModel> imageModelSet =uploadImage(file);
            product.setImageModels(imageModelSet);
            return productService.addProduit(product);
    }
        catch (Exception e){
            System.out.println(e.getMessage());
            return null;
        }
    }
    public Set<ImageModel> uploadImage(MultipartFile[] multipartFiles) throws IOException {

        Set<ImageModel> imageModels=new HashSet<>();
        for(MultipartFile file:multipartFiles){
            String fileName = StringUtils.cleanPath(file.getOriginalFilename());
            ImageModel imageModel = new ImageModel();
            imageModel.setFilePath("C:\\xampp\\htdocs\\Product\\" + fileName); // Utilisation du chemin souhaité
            imageModel.setBytes(file.getBytes());

            // Sauvegarder physiquement le fichier sur le système de fichiers
            saveImageToFileSystem(file, fileName);
           imageModels.add( imageModel);
        }
        return imageModels;
    }
    public void saveImageToFileSystem(MultipartFile file, String fileName) throws IOException {
        String uploadDir = "C:\\xampp\\htdocs\\Product\\"; // Chemin vers le dossier de destination

        // Créer le dossier s'il n'existe pas déjà
        Path uploadPath = Paths.get(uploadDir);
        Files.createDirectories(uploadPath);

        // Écrire le fichier sur le système de fichiers
        Path filePath = uploadPath.resolve(fileName);
        Files.write(filePath, file.getBytes());
    }
    /* Set<ImageModel> imageModels = new HashSet<>();
        for (MultipartFile file : multipartFiles) {
            String fileName = StringUtils.cleanPath(file.getOriginalFilename());
            ImageModel imageModel = new ImageModel();
            // Modifiez le chemin pour correspondre au serveur VMware
            imageModel.setFilePath("http://192.168.192.104/product/" + fileName); // URL pour le serveur VMware
            imageModel.setBytes(file.getBytes());

            // Vous n'avez pas besoin de sauvegarder physiquement le fichier sur le serveur VMware car vous utilisez un système distant
            // Enregistrement sur le système de fichiers local n'est pas nécessaire
            saveImageToFileSystem(file, fileName);
            imageModels.add(imageModel);
        }
        return imageModels;
    }
    public void saveImageToFileSystem(MultipartFile file, String fileName) throws IOException {
        String uploadDir = "/var/www/html/product/";  // Chemin vers le dossier de destination

        // Créer le dossier s'il n'existe pas déjà
        Path uploadPath = Paths.get(uploadDir);
        Files.createDirectories(uploadPath);

        // Écrire le fichier sur le système de fichiers
        Path filePath = uploadPath.resolve(fileName);
        Files.write(filePath, file.getBytes());
    }*/

    @GetMapping("/{pid}")
    public Product getProductById(@PathVariable int pid ){
        return productService.getProductById(pid);
    }
    @GetMapping("/getall")
    public List<Product> getAllProduct(@RequestParam(defaultValue = "0") int pageNumber){
        return productService.getAllProduct(pageNumber);
    }
  /*  @GetMapping("search/{name}/{brand}/{price}")
    public List<Product> searchProducts(@PathVariable("name") String name,@PathVariable("brand") String brand,@PathVariable("price") float price) {
        return productService.searchProducts(name,brand,price);
    }*/
    @DeleteMapping("/delete/{id}")
  public void deleteproduit(@PathVariable("id") int id) {
        productService.deleteProduct(id);
    }


    //@PreAuthorize("hasRole('User')")
    @GetMapping({"/getProductDetails/{isSingeProductCheckout}/{productId}"})
    public List<Product> getProductDetails(@PathVariable(name="isSingeProductCheckout") boolean isSingeProductCheckout,
                                           @PathVariable(name= "productId") Integer productId) {

        return productService.getProductDetails(isSingeProductCheckout, productId);


    }
    @GetMapping({"/getProductDetails2/{isSingeProductCheckout}/{productId}"})
    public List<Product> getProductDetails2(@PathVariable(name="isSingeProductCheckout") boolean isSingeProductCheckout,
                                           @PathVariable(name= "productId") Integer productId) {

        return productService.getProductDetails2(isSingeProductCheckout, productId);


    }
    @GetMapping("/products")
    public List<Product> getProductsByCategory(@RequestParam("category") String category) {
        Category categoryEnum = Category.valueOf(category.toUpperCase());

        return productService.getProductsByCategory(categoryEnum);
    }


}
