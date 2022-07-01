package series.javaapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import series.javaapi.entity.Episode;

import javax.transaction.Transactional;
import java.util.List;

public interface EpisodeRepository extends JpaRepository<Episode, Integer>
{
    @Transactional
    void deleteAllBySerieIdSerie(Integer idSerie);

    List<Episode> findBySeasonIdSeason(Integer episode);
}
