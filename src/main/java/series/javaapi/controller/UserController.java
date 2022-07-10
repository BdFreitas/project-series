package series.javaapi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import series.javaapi.entity.User;
import series.javaapi.repository.UserRepository;
import series.javaapi.request.AuthUserRequest;
import series.javaapi.request.ChangeUsersPasswordRequest;
import series.javaapi.service.UserService;

import javax.validation.Valid;


import static org.springframework.http.ResponseEntity.status;

@RestController
@RequestMapping("/users")
public class UserController
{
    //Attributes
    @Autowired
    UserService userService;

    //Endpoints
    @PostMapping
    @CrossOrigin
    public ResponseEntity postUser(@RequestBody @Valid User user)
    {
        if (userService.checkIfEmailExists(user)) {
            return status(409).build();
        }

        return status(201).body(userService.postUser(user));
    }

    @PostMapping("/authentication")
    @CrossOrigin
    public ResponseEntity authUser(@RequestBody @Valid AuthUserRequest user)
    {
        AuthUserRequest authenticatedUser = userService.authUser(user);

        if (authenticatedUser == null) {
            return status(404).build();
        }

        return status(200).body(authenticatedUser);
    }

    @PutMapping
    @CrossOrigin
    public ResponseEntity putUserPassword(@RequestBody @Valid ChangeUsersPasswordRequest userRequest)
    {
        if (!userService.changeUsersPassword(userRequest)) {
            return status(404).build();
        }

        return status(200).build();
    }
}
