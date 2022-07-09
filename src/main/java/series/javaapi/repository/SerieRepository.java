package series.javaapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import series.javaapi.entity.Serie;

import java.util.List;

public interface SerieRepository extends JpaRepository<Serie, Integer>
{
    Serie findFirstByFkUserIdUserOrderByIdSerieDesc(Integer idUser);

    List<Serie> findByFkUserIdUserOrderByIdSerieDesc(Integer idUser);
}
