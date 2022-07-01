package series.javaapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import series.javaapi.entity.User;
import series.javaapi.request.AuthUserRequest;

public interface UserRepository extends JpaRepository<User, Integer>
{
    AuthUserRequest findByEmailAndPassword(String email, String password);

    User findByEmail(String email);
}
