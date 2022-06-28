package series.javaapi.repository;

import series.javaapi.entity.Serie;

import org.hibernate.metamodel.model.convert.spi.JpaAttributeConverter;

public interface SerieRepository extends JpaAttributeConverter<Serie, Integer>
{
    Serie findByFkUserIdUserOrderByIdSerieDesc(Integer idUser);
}
