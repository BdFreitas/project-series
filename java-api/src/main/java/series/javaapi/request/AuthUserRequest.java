package series.javaapi.request;

public class UserRequest
{
    // Atributes
    private Integer id;

    private String email;

    // Constructor
    public UserRequest(Integer id, String email)
    {
        this.id = id;
        this.email = email;
    }

    // Getters
    public Integer getId()
    {
        return id;
    }

    public void setId(Integer id)
    {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
