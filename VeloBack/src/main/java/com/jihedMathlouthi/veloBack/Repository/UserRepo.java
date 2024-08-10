package com.jihedMathlouthi.veloBack.Repository;


import com.jihedMathlouthi.veloBack.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface UserRepo extends JpaRepository<User,Long> {

    Optional<User> findByUsername(String username);

    Boolean existsByUsername(String username);


    User findIdByUsername(String username);
}
