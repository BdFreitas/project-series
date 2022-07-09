package series.javaapi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import series.javaapi.entity.User;
import series.javaapi.repository.UserRepository;
import series.javaapi.request.AuthUserRequest;
import series.javaapi.request.ChangeUserPasswordRequest;

import javax.validation.Valid;


import static org.springframework.http.ResponseEntity.status;

@RestController
@RequestMapping("/users")
public class UserController
{
    //Attributes
    @Autowired
    private UserRepository userRepository;


    //Endpoints
    @PostMapping
    @CrossOrigin
    public ResponseEntity postUser(@RequestBody @Valid User user)
    {
        String email = user.getEmail();

        User checkIfEmailExists = userRepository.
                findByEmail(email);

        if (checkIfEmailExists != null) {
            return status(409).build();
        }

        userRepository.save(user);

        User savedUser = userRepository.
                findByEmail(email);

        return status(201).body(savedUser);
    }

    @PostMapping("/authentication")
    @CrossOrigin
    public ResponseEntity authUser(@RequestBody @Valid AuthUserRequest user)
    {
        String email = user.getEmail();
        String password = user.getPassword();

        AuthUserRequest authUser = userRepository.
                findByEmailAndPassword(email, password);

        if (authUser == null) {
            return status(404).build();
        }

        return status(200).body(authUser);
    }

    @PutMapping
    @CrossOrigin
    public ResponseEntity putUserPassword(@RequestBody @Valid ChangeUserPasswordRequest userRequest)
    {
        String email = userRequest.getEmail();
        String password = userRequest.getPassword();
        String newPassword = userRequest.getNewPassword();

        AuthUserRequest oldUser = userRepository.findByEmailAndPassword(
                email,
                password
        );

        if (oldUser == null) {
            return status(404).build();
        }

        User newUser = userRepository.getById(oldUser.getIdUser());
        newUser.setPassword(newPassword);

        userRepository.save(newUser);

        return status(200).build();
    }
}
