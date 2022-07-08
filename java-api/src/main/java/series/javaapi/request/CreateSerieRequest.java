package series.javaapi.request;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

public class CreateSerieRequest
{
    // Attributes
    @NotNull
    Integer idUser;

    @NotBlank
    private String name;

    @NotNull
    @Positive
    private Integer seasons;

    @NotNull
    @Positive
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
