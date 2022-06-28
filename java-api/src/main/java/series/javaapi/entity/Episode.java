package series.javaapi.entity;

import javax.persistence.*;

@Entity
public class Episode
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idEpisode;

    @ManyToOne
    private Season season;
}
