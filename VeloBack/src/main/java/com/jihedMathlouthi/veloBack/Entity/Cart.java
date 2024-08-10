package com.jihedMathlouthi.veloBack.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
@Getter
@Setter
@AllArgsConstructor
@Entity
@Table
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer cartId;
    @ManyToMany
    private List<Product> product;
    @OneToOne
    private User user;



    public Cart() {
        super();
        // TODO Auto-generated constructor stub
    }



  /*  public Cart(Product product, User user) {
        super();
        this.product = product;
        this.user = user;
    }*/


    public Integer getCartId() {
        return cartId;
    }
    public void setCartId(Integer cartId) {
        this.cartId = cartId;
    }

    public User getUser() {
        return user;
    }
    public void setUser(User user) {
        this.user = user;
    }



}