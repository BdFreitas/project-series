package series.javaapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import series.javaapi.entity.Season;

import javax.transaction.Transactional;
import java.util.List;

public interface SeasonRepository extends JpaRepository<Season, Integer>
{
    @Transactional
    void deleteAllBySerieIdSerie(Integer idSerie);

    List<Season> findBySerieIdSerie(Integer id);
}
