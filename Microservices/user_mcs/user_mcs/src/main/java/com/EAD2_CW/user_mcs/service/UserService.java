package com.EAD2_CW.user_mcs.service;

import com.EAD2_CW.user_mcs.data.User;
import com.EAD2_CW.user_mcs.data.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

    public User getUserById(int id){
        Optional<User> user = userRepository.findById(id);
        return user.orElse(null);
    }

    public User findByUsernameAndPassword(String username, String password){
        return userRepository.findByUsernameAndPassword(username, password);
    }

    public List<User> getUsersByIds(List<Integer> ids){
        return userRepository.findUsersByIds(ids);
    }

    public User createUser(User user){
        return userRepository.save(user);
    }

    public User updateUser(int id, User user){
        Optional<User> existingUser = userRepository.findById(id);

        if(existingUser.isPresent()){
            User updatedUser = existingUser.get();
            updatedUser.setUsername(user.getUsername());
            updatedUser.setEmail(user.getEmail());
            updatedUser.setPassword(user.getPassword());
            updatedUser.setMobile(user.getMobile());
            updatedUser.setBankaccnumber(user.getBankaccnumber());
            return  userRepository.save(updatedUser);
        } else{
            throw new RuntimeException("User not found with ID: " + id);
        }
    }

    public String deleteUser(int id){
        userRepository.deleteById(id);
        return "user deleted successfully";
    }
}
