package com.jihedMathlouthi.veloBack.Repository;



import com.jihedMathlouthi.veloBack.Entity.Cart;
import com.jihedMathlouthi.veloBack.Entity.Product;
import com.jihedMathlouthi.veloBack.Entity.User;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartDao extends CrudRepository<Cart, Integer> {

    public List<Cart> findByUser(User user);
    public Cart findCartByUser(User user);
    @Modifying
    @Query("DELETE FROM Cart c WHERE :product MEMBER OF c.product AND c.user = :user")
    void deleteByProduct(@Param("product") Product product, @Param("user") User user);
}