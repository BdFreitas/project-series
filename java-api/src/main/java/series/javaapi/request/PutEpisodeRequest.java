package series.javaapi.request;

import javax.validation.constraints.NotNull;

public class PutEpisodeRequest
{
    //Attributes
    @NotNull
    private Integer idEpisode;

    @NotNull
    private Boolean watched;

    //Constructor
    public PutEpisodeRequest(Integer idEpisode, Boolean watched)
    {
        this.idEpisode = idEpisode;
        this.watched = watched;
    }

    //Getters
    public Integer getIdEpisode()
    {
        return idEpisode;
    }

    public Boolean getWatched()
    {
        return watched;
    }
}
