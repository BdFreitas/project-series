package series.javaapi.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
public class Serie
{
    // Atributes
    @Id
    private Integer idSerie;

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

    public User getFkUsuario()
    {
        return fkUser;
    }

    //  Setters
}
