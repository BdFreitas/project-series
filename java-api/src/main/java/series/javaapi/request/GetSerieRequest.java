package series.javaapi.request;

import javax.validation.constraints.NotNull;

public class GetSerieRequest
{
    //Atributes
    @NotNull
    private Integer idUser;

    //Getters
    public Integer getIdUser()
    {
        return this.idUser;
    }
}
