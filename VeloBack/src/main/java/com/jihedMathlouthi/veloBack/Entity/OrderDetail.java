package com.jihedMathlouthi.veloBack.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;
@Getter
@Setter
@AllArgsConstructor
@Entity
public class OrderDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer orderId;
    private String orderFullName;
    private String orderFullOrder;
    private String orderContactNumber;
    private String orderAlternateContactNumber;
    private String orderStatus;
    private Double orderAmount;
    @ManyToMany
    private List<Product> product;
    private LocalDate deliveryDate; // Champ pour la date de livraison

    @ManyToMany
    private List<User> user;

    public OrderDetail() {
        super();
        // TODO Auto-generated constructor stub
    }



    public OrderDetail(String orderFullName, String orderFullOrder, String orderContactNumber,
                       String orderAlternateContactNumber, String orderStatus, Double orderAmount,List <Product> product,List <User> user) {
        super();
        this.orderFullName = orderFullName;
        this.orderFullOrder = orderFullOrder;
        this.orderContactNumber = orderContactNumber;
        this.orderAlternateContactNumber = orderAlternateContactNumber;
        this.orderStatus = orderStatus;
        this.orderAmount = orderAmount;
        this.product = product;
        this.user = user;
    }

/*

    public Product getProduct() {
        return product;
    }



    public void setProduct(Product product) {
        this.product = product;
    }



    public User getUser() {
        return user;
    }



    public void setUser(User user) {
        this.user = user;
    }

*/

    public Integer getOrderId() {
        return orderId;
    }

    public void setOrderId(Integer orderId) {
        this.orderId = orderId;
    }

    public String getOrderFullName() {
        return orderFullName;
    }

    public void setOrderFullName(String orderFullName) {
        this.orderFullName = orderFullName;
    }

    public String getOrderFullOrder() {
        return orderFullOrder;
    }

    public void setOrderFullOrder(String orderFullOrder) {
        this.orderFullOrder = orderFullOrder;
    }

    public String getOrderContactNumber() {
        return orderContactNumber;
    }

    public void setOrderContactNumber(String orderContactNumber) {
        this.orderContactNumber = orderContactNumber;
    }

    public String getOrderAlternateContactNumber() {
        return orderAlternateContactNumber;
    }

    public void setOrderAlternateContactNumber(String orderAlternateContactNumber) {
        this.orderAlternateContactNumber = orderAlternateContactNumber;
    }

    public String getOrderStatus() {
        return orderStatus;
    }

    public void setOrderStatus(String orderStatus) {
        this.orderStatus = orderStatus;
    }

    public Double getOrderAmount() {
        return orderAmount;
    }

    public void setOrderAmount(Double orderAmount) {
        this.orderAmount = orderAmount;
    }




}
