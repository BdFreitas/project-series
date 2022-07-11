package series.javaapi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import series.javaapi.entity.Episode;
import series.javaapi.request.PutEpisodeRequest;
import series.javaapi.service.EspisodeService;

import javax.validation.Valid;
import java.util.List;

import static org.springframework.http.ResponseEntity.*;

@RestController
@RequestMapping("/episodes")
public class EpisodeController
{
    //Attributes
    @Autowired
    private EspisodeService episodeService;

    //Endpoints
    @GetMapping("/{idSeason}")
    @CrossOrigin
    public ResponseEntity getEpisodesByIdSeason(
            @PathVariable Integer idSeason)
    {
        List<Episode> episodes = episodeService.findEpisodesByIdSeasonOrderByIdEpisode(idSeason);

        if (episodes.equals(null)) {
            return status(404).build();
        }

        return status(200).body(episodes);
    }

    @PutMapping
    @CrossOrigin
    public ResponseEntity putWatchedEpisodes(@RequestBody @Valid List<PutEpisodeRequest> episodeList)
    {
        episodeService.saveWatchedEpisodes(episodeList);
        return status(200).build();
    }
}
