package com.jihedMathlouthi.veloBack.ServiceImp;


import com.jihedMathlouthi.veloBack.Entity.Role;
import com.jihedMathlouthi.veloBack.Entity.User;
import com.jihedMathlouthi.veloBack.Repository.RoleRepo;
import com.jihedMathlouthi.veloBack.Repository.UserRepo;
import com.jihedMathlouthi.veloBack.Service.AdminServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminServicesImpl implements AdminServices {
    @Autowired
    UserRepo userRepository;
    @Autowired
    RoleRepo roleRepository;
    @Override
    public List<User> getall() {
        return userRepository.findAll();
    }

    @Override
    public void UpdateROle(Long id, String role) {

    }

    @Override
    public List<Role> getAllROles() {
        return roleRepository.findAll();
    }
}