package series.javaapi.entity;

import javax.persistence.*;

@Entity
public class Episode
{
    //Atributes
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idEpisode;

    @ManyToOne
    private Season season;

    @ManyToOne
    private Serie serie;

    //No-argument constructor
    public Episode()
    {
    }

    //Constructor
    public Episode(Season season, Serie serie)
    {
        this.season = season;
        this.serie = serie;
    }

    //Getters
    public Integer getIdEpisode(){
        return idEpisode;
    }
}
