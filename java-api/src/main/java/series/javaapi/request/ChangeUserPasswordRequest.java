package series.javaapi.request;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

public class ChangeUserPasswordRequest
{
    // Attributes
    private Integer idUser;

    @Email
    @NotBlank
    private String email;

    @NotBlank
    private String password;

    @NotBlank
    private String newPassword;

    // Constructor
    public ChangeUserPasswordRequest(Integer idUser, String email, String password, String newPassword)
    {
        this.idUser = idUser;
        this.email = email;
        this.password = password;
        this.newPassword = newPassword;
    }

    // Getters and Setters
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

    public String getNewPassword()
    {
        return newPassword;
    }

    public void setNewPassword(String newPassword)
    {
        this.newPassword = newPassword;
    }
}
