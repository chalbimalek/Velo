package com.jihedMathlouthi.veloBack.ServiceImp;

import com.jihedMathlouthi.veloBack.Entity.Product;
import com.jihedMathlouthi.veloBack.Entity.ProductComment;
import com.jihedMathlouthi.veloBack.Entity.ProductRating;
import com.jihedMathlouthi.veloBack.Entity.User;
import com.jihedMathlouthi.veloBack.Repository.ProductCommentRepository;
import com.jihedMathlouthi.veloBack.Repository.ProductRatingRepository;
import com.jihedMathlouthi.veloBack.Repository.ProductRepo;
import com.jihedMathlouthi.veloBack.Repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductRatingService {

    @Autowired
    private ProductRatingRepository productRatingRepository;
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private ProductRepo productRepo;
    @Autowired
    private ProductCommentRepository productCommentRepository;


    public ProductRating saveProductRating(int prdouctid , ProductRating productRatingRequest) {
        Product product=productRepo.findProductByIdProduct(prdouctid);
        // Récupérer l'utilisateur authentifié
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        User user = userRepo.findByUsername(username).orElse(null);
        if (user == null) {
            System.out.println("L'utilisateur avec le nom d'utilisateur " + username + " n'a pas été trouvé.");
            return null;
        }

        if (product == null) {
            System.out.println("Le produit avec l'ID " + product.getIdProduct() + " n'a pas été trouvé.");
            return null;
        }

        // Créer une nouvelle notation du produit avec les détails de la requête
        ProductRating productRating = new ProductRating();
        productRating.setProduct(product);
        productRating.setUser(user);
        productRating.setRating(productRatingRequest.getRating());
        //productRating.setComment(productRatingRequest.getComment());

        // Enregistrer la notation du produit dans la base de données
        return productRatingRepository.save(productRating);
    }
    public ProductRating saveProductRating(int productId, int rating) {
        Product product = productRepo.findProductByIdProduct(productId);
        if (product == null) {
            System.out.println("Le produit avec l'ID " + productId + " n'a pas été trouvé.");
            return null;
        }

        // Récupérer l'utilisateur authentifié
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        User user = userRepo.findByUsername(username).orElse(null);
        if (user == null) {
            System.out.println("L'utilisateur avec le nom d'utilisateur " + username + " n'a pas été trouvé.");
            return null;
        }

        // Créer une nouvelle notation du produit avec le rating spécifié
        ProductRating productRating = new ProductRating();
        productRating.setProduct(product);
        productRating.setUser(user);
        productRating.setRating(rating);

        // Enregistrer la notation du produit dans la base de données
        return productRatingRepository.save(productRating);
    }
    public ProductComment saveProductComment(int productId, String comment) {
        Product product = productRepo.findProductByIdProduct(productId);
        if (product == null) {
            System.out.println("Le produit avec l'ID " + productId + " n'a pas été trouvé.");
            return null;
        }

        // Récupérer l'utilisateur authentifié
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        User user = userRepo.findByUsername(username).orElse(null);
        if (user == null) {
            System.out.println("L'utilisateur avec le nom d'utilisateur " + username + " n'a pas été trouvé.");
            return null;
        }

        // Créer une nouvelle notation du produit avec le commentaire spécifié
        ProductComment productComment = new ProductComment();
        productComment.setProduct(product);
        productComment.setUser(user);
        productComment.setComment(comment);

        // Enregistrer la notation du produit dans la base de données
        return productCommentRepository.save(productComment);
    }


    public List<ProductRating> getAllProductRatings() {
        return productRatingRepository.findAll();
    }

    public ProductComment getProductRatingById(Long id) {
        return productCommentRepository.findById(id).orElse(null);
    }

    public List<ProductComment> getProductRatingByproductId(int id) {
        return productCommentRepository.getProductCommentByProduct_IdProduct(id);
    }

    public List<String> statistiqueRating(){
        return productRatingRepository.statistiqueRating();
    }
    // Vous pouvez ajouter d'autres méthodes de service selon vos besoins
}
