package series.javaapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import series.javaapi.entity.User;

public interface UsuarioRepository extends JpaRepository<User, Integer>
{
}
