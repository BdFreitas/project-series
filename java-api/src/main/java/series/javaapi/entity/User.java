package series.javaapi.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Entity
public class Userr
{
    // Atributes
    @Id
    @NotNull
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idUser;

    @Email
    @NotBlank
    private String email;

    @NotBlank
    private String password;

    // No-argument constructor
    public Userr()
    {
    }

    // Constructor
    public Userr(String email, String password)
    {
        this.email = email;
        this.password = password;
    }

    // Getters
    public Integer getIdUser() {
        return idUser;
    }

    public String getEmail() {
        return email;
    }


    // Setters
    public void setIdUser(Integer idUser) {
        this.idUser = idUser;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
