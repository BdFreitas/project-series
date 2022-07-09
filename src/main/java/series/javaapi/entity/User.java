package series.javaapi.entity;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Entity
@Table(name = "users")
public class User
{
    // Attributes
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idUser;

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
    public User(String email, String password)
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
