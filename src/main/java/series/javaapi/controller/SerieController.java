package series.javaapi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import series.javaapi.entity.Episode;
import series.javaapi.entity.Season;
import series.javaapi.entity.Serie;
import series.javaapi.entity.User;
import series.javaapi.repository.EpisodeRepository;
import series.javaapi.repository.SeasonRepository;
import series.javaapi.repository.SerieRepository;
import series.javaapi.request.CreateSerieRequest;
import series.javaapi.response.SerieResponse;
import series.javaapi.service.SerieService;

import javax.validation.Valid;

import java.util.ArrayList;
import java.util.List;

import static org.springframework.http.ResponseEntity.*;

@RestController
@RequestMapping("/series")
public class SerieController
{
    //Attributes
    @Autowired
    private SerieRepository serieRepository;

    @Autowired
    private SeasonRepository seasonRepository;

    @Autowired
    private EpisodeRepository episodeRepository;

    //Endpoints
    @PostMapping
    @CrossOrigin
    public ResponseEntity postSerie(@RequestBody @Valid CreateSerieRequest newSerie)
    {
        Integer episodes = newSerie.getEpisodes();
        Integer seasons = newSerie.getSeasons();

        if (episodes > 25 || seasons > 10) {
            return status(400).build();
        }

        User user = new User();
        user.setIdUser(newSerie.getIdUser());

        Serie serie = new Serie(newSerie.getName(), user);
        serieRepository.save(serie);
        Serie createdSerie = serieRepository.
                findFirstByFkUserIdUserOrderByIdSerieDesc(newSerie.getIdUser());

        for (int i = 0; i < newSerie.getSeasons(); i++) {
            Season season = new Season(createdSerie);
            seasonRepository.save(season);

            for (int j = 0; j < newSerie.getEpisodes(); j++) {
                Episode episode = new Episode(season, createdSerie);
                episodeRepository.save(episode);
            }
        }

        return status(201).build();
    }

    @GetMapping("/{idUser}")
    @CrossOrigin
    public ResponseEntity getSeries(@PathVariable Integer idUser)
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

        return status(200).body(response);
    }

    @DeleteMapping("/{idSerie}")
    @CrossOrigin

    public ResponseEntity deleteSerie(@PathVariable Integer idSerie)
    {
        if (!SerieService.validateId(idSerie)) {
            return status(400).build();
        }

        if (!serieRepository.existsById(idSerie)) {
            return status(404).build();
        }

        episodeRepository.deleteAllBySerieIdSerie(idSerie);
        seasonRepository.deleteAllBySerieIdSerie(idSerie);
        serieRepository.deleteById(idSerie);

        return status(200).build();
    }
}
