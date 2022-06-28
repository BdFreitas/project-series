package series.javaapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import series.javaapi.entity.Episode;

public interface EpisodeRepository extends JpaRepository<Episode, Integer>
{
}
