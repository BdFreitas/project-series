package series.javaapi.request;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

public class CreateSerieRequest
{
    // Atributes
    @NotNull
    Integer idUser;

    @NotBlank
    private String name;

    @NotNull
    private Integer seasons;

    @NotNull
    private Integer episodes;

    // Getters
    public Integer getIdUser()
    {
        return idUser;
    }

    public String getName()
    {
        return name;
    }

    public Integer getSeasons()
    {
        return seasons;
    }

    public Integer getEpisodes()
    {
        return episodes;
    }
}
