package com.jihedMathlouthi.veloBack.Service;


import com.jihedMathlouthi.veloBack.Entity.Role;
import com.jihedMathlouthi.veloBack.Entity.User;

import java.util.List;

public interface AdminServices {
    List<User> getall();
    void UpdateROle(Long id,String role);
    List<Role> getAllROles();
}
