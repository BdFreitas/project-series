package series.javaapi.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import series.javaapi.entity.User;
import series.javaapi.repository.UserRepository;
import series.javaapi.request.AuthUserRequest;
import series.javaapi.request.ChangeUsersPasswordRequest;

import static org.springframework.http.ResponseEntity.status;

@Service
public class UserService
{
    //Attributes
    @Autowired
    UserRepository userRepository;

    //Methods
    public User postUser(User user)
    {
        userRepository.save(user);

        User savedUser = userRepository.
                findByEmail(user.getEmail());

        return savedUser;
    }

    public Boolean checkIfEmailExists(User user)
    {
        String email = user.getEmail();

        User checkIfEmailExists = userRepository.
                findByEmail(email);

        if (checkIfEmailExists != null) {
            return true;
        }

        return false;
    }

    public AuthUserRequest authUser(AuthUserRequest user)
    {
        String email = user.getEmail();
        String password = user.getPassword();

        AuthUserRequest authenticatedUser = userRepository.
                findByEmailAndPassword(email, password);

        if (authenticatedUser == null) {
            return null;
        }

        return authenticatedUser;
    }

    public Boolean changeUsersPassword(ChangeUsersPasswordRequest userRequest)
    {
        String email = userRequest.getEmail();
        String password = userRequest.getPassword();
        String newPassword = userRequest.getNewPassword();

        AuthUserRequest oldUser = userRepository.findByEmailAndPassword(
                email,
                password
        );

        if (oldUser == null) {
            return false;
        }

        User newUser = userRepository.getById(oldUser.getIdUser());
        newUser.setPassword(newPassword);

        userRepository.save(newUser);

        return true;
    }
}
