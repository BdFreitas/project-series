package series.javaapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import series.javaapi.entity.Season;

public interface SeasonRepository extends JpaRepository<Season, Integer>
{
}
