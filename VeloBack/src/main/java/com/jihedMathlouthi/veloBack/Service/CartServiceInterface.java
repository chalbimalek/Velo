package com.jihedMathlouthi.veloBack.Service;





import com.jihedMathlouthi.veloBack.Entity.Cart;
import com.jihedMathlouthi.veloBack.Entity.Product;

import java.util.List;

public interface CartServiceInterface {
    public void deleteCartItem(Integer cartId);
    public Cart addToCart(Integer productId);
    public List<Product> getCartDetails();


}
