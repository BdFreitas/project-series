package series.javaapi.request;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

public class AuthUserRequest
{
    // Atributes
    private Integer idUser;

    @Email
    @NotBlank
    private String email;

    @NotBlank
    private String password;

    // Constructor
    public AuthUserRequest(Integer idUser, String email, String password)
    {
        this.idUser = idUser;
        this.email = email;
        this.password = password;
    }

    // Getters
    public Integer getIdUser()
    {
        return idUser;
    }

    public void setIdUser(Integer idUser)
    {
        this.idUser = idUser;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword()
    {
        return password;
    }

    public void setPassword(String password)
    {
        this.password = password;
    }
}
