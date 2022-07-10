package series.javaapi.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import series.javaapi.entity.Episode;
import series.javaapi.entity.Season;
import series.javaapi.entity.Serie;
import series.javaapi.entity.User;
import series.javaapi.repository.EpisodeRepository;
import series.javaapi.repository.SeasonRepository;
import series.javaapi.repository.SerieRepository;
import series.javaapi.repository.UserRepository;
import series.javaapi.request.CreateSerieRequest;
import series.javaapi.response.SerieResponse;

import java.util.ArrayList;
import java.util.List;

import static org.springframework.http.ResponseEntity.status;

@Service
public class SerieService
{
    //Atributes
    @Autowired
    private SerieRepository serieRepository;

    @Autowired
    private SeasonRepository seasonRepository;

    @Autowired
    EpisodeRepository episodeRepository;

    //Methods
    public Boolean validateAmountOfSeasonsAndEpisodes(CreateSerieRequest serie)
    {
        Integer episodes = serie.getEpisodes();
        Integer seasons = serie.getSeasons();

        if (episodes > 25 || seasons > 10) {
            return false;
        }

        return true;
    }

    public void postSerie(CreateSerieRequest serie)
    {
        User user = new User();
        user.setIdUser(serie.getIdUser());

        Serie newSerie = new Serie(serie.getName(), user);
        serieRepository.save(newSerie);
        Serie createdSerie = serieRepository.
                findFirstByFkUserIdUserOrderByIdSerieDesc(serie.getIdUser());

        for (int i = 0; i < serie.getSeasons(); i++) {
            Season season = new Season(createdSerie);
            seasonRepository.save(season);

            for (int j = 0; j < serie.getEpisodes(); j++) {
                Episode episode = new Episode(season, createdSerie);
                episodeRepository.save(episode);
            }
        }
    }

    public List<SerieResponse> getSeriesByIdUser(Integer idUser)
    {
        List<SerieResponse> response = new ArrayList<SerieResponse>();
        List<Serie> series = serieRepository.
                findByFkUserIdUserOrderByIdSerieDesc(idUser);

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

    public void deleteSerieByIdSerie(Integer idSerie)
    {
        episodeRepository.deleteAllBySerieIdSerie(idSerie);
        seasonRepository.deleteAllBySerieIdSerie(idSerie);
        serieRepository.deleteById(idSerie);
    }

    public Boolean checkIfSerieExistsById(Integer idSerie)
    {
        if (serieRepository.existsById(idSerie)) {
            return true;
        }

        return false;
    }
}
