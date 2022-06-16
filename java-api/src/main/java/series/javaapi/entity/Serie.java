package series.javaapi.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
public class Serie
{
    // Atributes
    @Id
    private Integer id;

    private String name;

    @ManyToOne
    private User fkUser;

    // No-argument constructor.
    public Serie()
    {
    }

    // Constructor
    public Serie(Integer id, String name, User fkUser)
    {
        this.id = id;
        this.name = name;
        this.fkUser = fkUser;
    }

    // Getters
    public Integer getId()
    {
        return id;
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
