package com.jihedMathlouthi.veloBack.Service;



import com.jihedMathlouthi.veloBack.Entity.User;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public interface UserService {

    User addUser(User user);
    User updateUser (User user);
    void Delete(long id);
    List<User> getList();
  //  List<User> getLikesByPostPaginate(Post post, Integer page, Integer size);
    //List<User> getLikesByCommentPaginate(Comment comment, Integer page, Integer size);

}