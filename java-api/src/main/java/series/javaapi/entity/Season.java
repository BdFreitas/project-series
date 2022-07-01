package series.javaapi.entity;

import javax.persistence.*;

@Entity
public class Season
{
    // Atributes
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idSeason;

    @ManyToOne
    private Serie serie;

    // No-Argument constructor
    public Season()
    {

    }

    //Constructor
    public Season(Serie serie)
    {
        this.serie = serie;
    }

    //Getters
    public Integer getIdSeason()
    {
        return this.idSeason;
    }
}
