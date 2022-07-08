package series.javaapi.request;

import javax.validation.constraints.NotNull;

public class GetSerieRequest
{
    //Attributes
    @NotNull
    private Integer idUser;

    //Getters
    public Integer getIdUser()
    {
        return this.idUser;
    }
}
