package com.jihedMathlouthi.veloBack.Repository;



import com.jihedMathlouthi.veloBack.Entity.Notification;
import com.jihedMathlouthi.veloBack.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Long> {


    List<Notification> findByUserEnvoyer(User user);
}
