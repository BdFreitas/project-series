package series.javaapi.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Entity
public class User
{
    // Atributes
    @Id
    @NotNull
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Email
    @NotBlank
    private String email;

    @NotBlank
    private String password;

    // No-argument constructor
    public User()
    {
    }

    // Constructor
    public User(Integer id, String email, String password)
    {
        this.id = id;
        this.email = email;
        this.password = password;
    }

    // Getters
    public Integer getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }


    // Setters
    public void setId(Integer id) {
        this.id = id;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
