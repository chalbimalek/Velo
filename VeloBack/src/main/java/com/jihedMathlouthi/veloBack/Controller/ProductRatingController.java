package com.jihedMathlouthi.veloBack.Controller;


import com.jihedMathlouthi.veloBack.Entity.ProductComment;
import com.jihedMathlouthi.veloBack.Entity.ProductRating;
import com.jihedMathlouthi.veloBack.ServiceImp.ProductRatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/product-ratings")
public class ProductRatingController {

    @Autowired
    private ProductRatingService productRatingService;

    @PostMapping("{prdouctid}")
    public ProductRating saveProductRating(@PathVariable(name="prdouctid") int prdouctid, @RequestBody ProductRating productRating ) {
        return productRatingService.saveProductRating(prdouctid,productRating);
    }

    @GetMapping
    public List<ProductRating> getAllProductRatings() {
        return productRatingService.getAllProductRatings();
    }

    @GetMapping("/{id}")
    public ProductComment getProductRatingById(@PathVariable Long id) {
        return productRatingService.getProductRatingById(id);
    }

    @GetMapping("/product/{productId}")
    public List<ProductComment> getProductRatingByProductId(@PathVariable int productId) {
        return productRatingService.getProductRatingByproductId(productId);
    }
@GetMapping("/statistiqueRating")
    public List<String> statistiqueRating() {
        return productRatingService.statistiqueRating();
    }
    @PreAuthorize("hasRole('ROLE_MEMBRE')")

    @PostMapping("/rate/{productId}/{rating}")
    public ResponseEntity<ProductRating> rateProduct(@PathVariable("productId") int productId,
                                                     @PathVariable("rating") int rating) {
        ProductRating savedRating = productRatingService.saveProductRating(productId, rating);
        if (savedRating != null) {
            return new ResponseEntity<>(savedRating, HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PreAuthorize("hasRole('ROLE_MEMBRE')")
    @PostMapping("/comment/{productId}/{comment}")
    public ResponseEntity<ProductComment> commentProduct(@PathVariable("productId") int productId,
                                                         @PathVariable("comment") String comment) {
        ProductComment savedComment = productRatingService.saveProductComment(productId, comment);
        if (savedComment != null) {
            return new ResponseEntity<>(savedComment, HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    }