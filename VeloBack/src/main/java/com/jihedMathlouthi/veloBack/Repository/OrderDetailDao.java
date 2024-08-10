package com.jihedMathlouthi.veloBack.Repository;



import com.jihedMathlouthi.veloBack.Entity.OrderDetail;
import com.jihedMathlouthi.veloBack.Entity.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;


@Repository
public interface OrderDetailDao extends CrudRepository<OrderDetail, Integer>{
    List<OrderDetail> findByOrderStatusAndDeliveryDateBefore(String orderStatus, LocalDate date);

    public List<OrderDetail> findByUser(User user);

    @Query("SELECT p.category, COUNT(p.category) AS categoryCount " +
            "FROM OrderDetail o " +
            "JOIN o.product p " + // Joindre la table Product à travers la liste de produits dans OrderDetail
            "GROUP BY p.category " +
            "ORDER BY categoryCount DESC")
    List<String> findMostPurchasedCategory();



}