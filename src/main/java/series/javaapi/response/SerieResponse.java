package series.javaapi.response;

import series.javaapi.entity.Season;
import series.javaapi.entity.Serie;

import java.util.List;

public class SerieResponse
{
    //Attributes
    private Serie serie;

    private List<Season> seasons;

    //Constructor
    public SerieResponse(Serie serie, List<Season> seasons)
    {
        this.serie = serie;
        this.seasons = seasons;
    }

    //Getters
    public Serie getSerie()
    {
        return this.serie;
    }

    public List<Season> getSeasons()
    {
        return this.seasons;
    }

    //Setters
    public void setSeries(Serie serie)
    {
        this.serie = serie;
    }

    public void setSeasons(List<Season> seasons)
    {
        this.seasons = seasons;
    }
}
