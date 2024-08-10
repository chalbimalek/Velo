package com.jihedMathlouthi.veloBack.ServiceImp;



import com.jihedMathlouthi.veloBack.Entity.Role;
import com.jihedMathlouthi.veloBack.Repository.RoleRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RoleService {

    private final RoleRepo roleRepo;

    public Role createNewRole(Role role) {
        return roleRepo.save(role);
    }
}
