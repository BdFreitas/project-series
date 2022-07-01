package series.javaapi.service;

import org.springframework.beans.factory.annotation.Autowired;
import series.javaapi.entity.Season;
import series.javaapi.entity.Serie;
import series.javaapi.repository.SeasonRepository;
import series.javaapi.response.SerieResponse;

import java.util.ArrayList;
import java.util.List;

public class SerieService
{
    //Atributes
    @Autowired
    private SeasonRepository seasonRepository;

    //Methods
    public static Boolean validateId(Integer id)
    {
        if (id < 0) {
            return false;
        }

        if (id.equals(null)) {
            return false;
        }

        return true;
    }

    public List<SerieResponse> getSeriesAndItsSeasons(
            List<Serie> series)
    {
        List<SerieResponse> response = new ArrayList<SerieResponse>();

        for (Serie serie : series) {
            List<Season> seasons = seasonRepository.
                    findBySerieIdSerie(serie.getIdSerie());

            SerieResponse serieResponse = new SerieResponse(
                    serie,
                    seasons
            );

            response.add(serieResponse);
        }

        return response;
    }
}
