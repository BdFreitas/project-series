package series.javaapi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import series.javaapi.entity.Season;
import series.javaapi.entity.Serie;
import series.javaapi.entity.User;
import series.javaapi.repository.EpisodeRepository;
import series.javaapi.repository.SeasonRepository;
import series.javaapi.repository.SerieRepository;
import series.javaapi.request.SerieRequest;

@RestController
@RequestMapping("/series")
public class SerieController
{
    @Autowired
    private SerieRepository serieRepository;

    @Autowired
    private SeasonRepository seasonRepository;

    @Autowired
    private EpisodeRepository episodeRepository;

    @PostMapping
    public ResponseEntity postSerie(@RequestBody SerieRequest newSerie)
    {
        User user = new User();
        user.setId(newSerie.getIdUser());

        Serie serie = new Serie(newSerie.getName(), user);
        Serie createdSerie = serieRepository.
                findByFkUserIdUserOrderByIdSerieDesc(newSerie.getIdUser());

        for (int i = 0; i < newSerie.getSeasons(); i++) {
            Season season = new Season(createdSerie);
            seasonRepository.save(season);
        }
    }
}
