package com.jihedMathlouthi.veloBack.Repository;




import com.jihedMathlouthi.veloBack.Entity.Role;
import com.jihedMathlouthi.veloBack.Enum.ERole;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepo extends JpaRepository<Role,String> {
    Optional<Role> findByName (ERole name);
    boolean existsByName(ERole r1);
}
