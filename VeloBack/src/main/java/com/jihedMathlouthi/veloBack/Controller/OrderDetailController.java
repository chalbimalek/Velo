package com.jihedMathlouthi.veloBack.Controller;

import com.jihedMathlouthi.veloBack.Entity.OrderDetail;
import com.jihedMathlouthi.veloBack.Entity.OrderInput;
import com.jihedMathlouthi.veloBack.ServiceImp.OrderDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class OrderDetailController {

    @Autowired
    private OrderDetailService orderDetailService;



   // @PreAuthorize("hasRole('User')")
   @PreAuthorize("hasRole('ROLE_MEMBRE')")
   @PostMapping({"/placeOrder/{isSingleProductCheckout}"})
    public void placeOrder(@PathVariable(name= "isSingleProductCheckout") boolean isSingleProductCheckout, @RequestBody OrderInput orderInput) {
        orderDetailService.placeOrder(orderInput, isSingleProductCheckout);

    }
    @PreAuthorize("hasRole('ROLE_MEMBRE')")
    @PostMapping("/api/triggerScheduledTask")
    public ResponseEntity<String> triggerScheduledTask() {
        orderDetailService.scheduleMarkOrdersAsDelivered();
        return ResponseEntity.ok("Scheduled task triggered successfully");
    }
   // @PreAuthorize("hasRole('User')")
   @PreAuthorize("hasRole('ROLE_MEMBRE')")
   @GetMapping({"/getOrderDetails"})
    public List<OrderDetail> getOrderDetails() {
        return orderDetailService.getOrderDetails();
    }

  //  @PreAuthorize("hasRole('Admin')")
  @PreAuthorize("hasRole('ROLE_MEMBRE')")
  @GetMapping({"/getAllOrderDetails"})
    public List<OrderDetail> getAllOrderDetails() {
        return orderDetailService.getAllOrderDetails();
    }

    @PreAuthorize("hasRole('ROLE_MEMBRE')")
    @GetMapping({"/markOrderAsDelivered/{orderId}"})
    public void markOrderAsDelivered(@PathVariable(name= "orderId")int orderId ){
        orderDetailService.markOrderAsDelivered(orderId);
    }

    @GetMapping("/statistics/most-purchased-category")
    public ResponseEntity<List<String>> getMostPurchasedCategory() {
        List<String> mostPurchasedCategory = orderDetailService.getMostPurchasedCategory();
        return ResponseEntity.ok(mostPurchasedCategory);
    }

}
