package series.javaapi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import series.javaapi.entity.User;
import series.javaapi.repository.UserRepository;
import series.javaapi.request.UserRequest;

import javax.validation.Valid;

import static org.springframework.http.ResponseEntity.status;

@RestController
@RequestMapping("/usuarios")
public class UserController
{
    @Autowired
    private UserRepository repository;

    @PostMapping
    public ResponseEntity postUsuario(@Valid @RequestBody User user)
    {
        repository.save(user);
        return status(200).build();
    }

    @PutMapping
    public ResponseEntity putUsuario(
            @RequestBody UserRequest userParam,
            @PathVariable String newPassword)
    {
        User user = null;
        user = repository.getById(userParam.getId());

        if (user.equals(null)) {
            return status(404).build();
        }

        if (!userParam.getEmail().equals(user.getEmail())) {
            return status(403).build();
        }

        user.setPassword(newPassword);
        repository.save(user);

        return status(200).build();
    }
}
