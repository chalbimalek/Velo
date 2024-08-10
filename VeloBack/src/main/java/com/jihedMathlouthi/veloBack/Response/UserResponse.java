package com.jihedMathlouthi.veloBack.Response;

import com.jihedMathlouthi.veloBack.Entity.User;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserResponse {
    private User user;
    private Boolean followedByAuthUser;
}