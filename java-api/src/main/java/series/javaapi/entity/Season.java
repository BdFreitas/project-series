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
    public Season(Serie serie)
    {
        this.serie = serie;
    }
}
