package series.javaapi.entity;

import javax.persistence.*;
import javax.validation.constraints.*;

@Entity
public class Episode
{
    //Attributes
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idEpisode;

    @ManyToOne
    @NotNull
    private Season season;

    @ManyToOne
    private Serie serie;

    @NotNull
    private Boolean watched;

    //No-argument constructor
    public Episode()
    {
    }

    //Constructor
    public Episode(Season season, Serie serie)
    {
        this.season = season;
        this.serie = serie;
        this.watched = false;
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

    //Setters
    public void setWatched(Boolean watched)
    {
        this.watched = watched;
    }
}
