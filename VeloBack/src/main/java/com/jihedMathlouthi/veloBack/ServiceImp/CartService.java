package com.jihedMathlouthi.veloBack.ServiceImp;




import com.jihedMathlouthi.veloBack.Entity.Cart;
import com.jihedMathlouthi.veloBack.Entity.Product;
import com.jihedMathlouthi.veloBack.Entity.User;
import com.jihedMathlouthi.veloBack.Repository.CartDao;
import com.jihedMathlouthi.veloBack.Repository.ProductRepo;
import com.jihedMathlouthi.veloBack.Repository.UserRepo;
import com.jihedMathlouthi.veloBack.Service.CartServiceInterface;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CartService implements CartServiceInterface {


    private final CartDao cartDao;


    private final ProductRepo productDao;


    private final UserRepo userDao;
@Override
    public void deleteCartItem(Integer cartId) {
        cartDao.deleteById(cartId);
    }
    @Override
    public Cart addToCart(Integer productId) {
        Product product = productDao.findById(productId).orElse(null);
        if (product == null) {
            System.out.println("Le produit avec l'ID " + productId + " n'a pas été trouvé.");
            return null;
        }

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        User user = userDao.findByUsername(username).orElse(null);
        if (user == null) {
            System.out.println("L'utilisateur avec le nom d'utilisateur " + username + " n'a pas été trouvé.");
            return null;
        }

        // Récupérer le panier de l'utilisateur s'il existe déjà
        List<Cart> cartList = cartDao.findByUser(user);
        Cart userCart = cartList.isEmpty() ? new Cart() : cartList.get(0); // S'il n'y a pas de panier, créer un nouveau
        if (userCart.getProduct() == null) {
            userCart.setProduct(new ArrayList<>());
        }

        // Ajouter le produit au panier de l'utilisateur
        userCart.getProduct().add(product);

        // Mettre à jour l'utilisateur associé au panier
        userCart.setUser(user);

        // Enregistrer le panier dans la base de données
        return cartDao.save(userCart);
        }


     /*   Product product = productDao.findById(productId).get();

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        User user = null;

        if (username != null) {
            user = userDao.findByUsername(username).get();

        }

        List<Cart> cartList = cartDao.findByUser(user);
        //List<Cart> filteredList = cartList.stream().filter(x -> x.getProduct().getIdProduct() == productId).collect(Collectors.toList());

       /* if (filteredList.size() > 0) {
            return null;
        }*/

/*
        if (product != null && user != null) {
            Cart cart = new Cart(product, user);
            return cartDao.save(cart);
        }
        return null;
   */






    @Override
    public List<Product> getCartDetails(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        User user = userDao.findByUsername(username).get();

        if (user != null) {
            List<Cart> cartList = cartDao.findByUser(user);

            // Mapper les produits de chaque panier dans une seule liste
            List<Product> productsInCart = cartList.stream()
                    .flatMap(cart -> cart.getProduct().stream())
                    .distinct() // Supprimer les doublons
                    .collect(Collectors.toList());

            return productsInCart;
        } else {
            // Gérer le cas où l'utilisateur n'est pas trouvé
            return Collections.emptyList(); // Retourner une liste vide
        }
    }



public User getuserfromusername(){
    User user = null;
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    String username = authentication.getName();
    user = userDao.findByUsername(username).orElse(null);

    System.out.println("Current User: " + user);

    return user;
}


}