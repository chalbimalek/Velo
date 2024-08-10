package com.jihedMathlouthi.veloBack.ServiceImp;


import com.jihedMathlouthi.veloBack.Entity.User;
import com.jihedMathlouthi.veloBack.Repository.UserRepo;
import com.jihedMathlouthi.veloBack.Response.UserResponse;
import com.jihedMathlouthi.veloBack.Service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {


    private final UserRepo userRepository;

    @Override
    public User addUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public User updateUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public void Delete(long id) {
        userRepository.deleteById(id);
    }

    @Override
    public List<User> getList() {
        return userRepository.findAll();
    }

  /*  public User getUserById(long userId) {
        return userRepository.findById(userId).orElseThrow(UserNotFoundException::new);
    }*/
    public long getUserIdFromUsername(String username) {
        User user = userRepository.findIdByUsername(username);
        if (user != null) {
            return user.getId();
        } else {
            // Handle case when user is not found
            return -1; // Or throw an exception, depending on your requirements
        }
    }


   /* public List<UserResponse> getUserSearchResult(String key, Integer page, Integer size) {
        if (key.length() < 3) throw new InvalidOperationException();

        return userRepository.findUsersByName(
                key,
                PageRequest.of(page, size)
        ).stream().map(this::userToUserResponse).collect(Collectors.toList());
    }
*/



    private UserResponse userToUserResponse(User user) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        return UserResponse.builder()
                .user(user)
                .followedByAuthUser(user.getFollowerUsers().contains(username))
                .build();
    }
    public final Optional<User> getAuthenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            String authUsername = authentication.getName(); // Obtenez le nom d'utilisateur de l'authentification
            return userRepository.findByUsername(authUsername);
        } else {
            // Gérer le cas où aucun utilisateur n'est authentifié
            return null;
        }
    }

}

