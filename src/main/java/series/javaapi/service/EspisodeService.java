package series.javaapi.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import series.javaapi.entity.Episode;
import series.javaapi.repository.EpisodeRepository;
import series.javaapi.request.PutEpisodeRequest;

import java.util.List;

@Service
public class EspisodeService
{
    //Attributes
    @Autowired
    private EpisodeRepository episodeRepository;

    //Methods
    public List<Episode> findEpisodesByIdSeasonOrderByIdEpisode(Integer idSeason)
    {
        List<Episode> episodes = episodeRepository.
                findBySeasonIdSeasonOrderByIdEpisode(idSeason);

        if (episodes.size() == 0) {
            return null;
        }

        return episodes;
    }

    public void saveWatchedEpisodes(List<PutEpisodeRequest> episodeList)
    {
        for (PutEpisodeRequest listEpisode : episodeList) {
            Episode episode = episodeRepository.findByIdEpisode(listEpisode.getIdEpisode());
            episode.setWatched(listEpisode.getWatched());

            episodeRepository.save(episode);
        }
    }
}
