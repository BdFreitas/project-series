package series.javaapi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import series.javaapi.entity.Episode;
import series.javaapi.repository.EpisodeRepository;
import series.javaapi.repository.SeasonRepository;

import java.util.List;

import static org.springframework.http.ResponseEntity.*;

@RestController
@RequestMapping("/episodes")
public class EpisodeController
{
    @Autowired
    private EpisodeRepository episodeRepository;

    @Autowired
    private SeasonRepository seasonRepository;

    @GetMapping("/{idSeason}")
    public ResponseEntity getEpisodesByIdSeason(
            @PathVariable Integer idSeason)
    {
        if (!seasonRepository.existsById(idSeason)) {
            return status(404).build();
        }

        List<Episode> episodes = episodeRepository.
                findBySeasonIdSeason(idSeason);

        return status(200).body(episodes);
    }
}
