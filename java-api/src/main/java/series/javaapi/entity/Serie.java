package series.javaapi.entity;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Entity
public class Serie
{
    // Atributes
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idSerie;

    @NotBlank
    private String name;

    @ManyToOne
    private User fkUser;

    // Constructor
    public Serie(String name, User fkUser)
    {
        this.name = name;
        this.fkUser = fkUser;
    }

    // No-argument constructor.
    public Serie()
    {
    }

    // Getters
    public Integer getIdSerie()
    {
        return idSerie;
    }

    public String getName()
    {
        return name;
    }
}
