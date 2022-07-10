package series.javaapi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import series.javaapi.request.CreateSerieRequest;
import series.javaapi.response.SerieResponse;
import series.javaapi.service.SerieService;

import javax.validation.Valid;

import java.util.List;

import static org.springframework.http.ResponseEntity.*;

@RestController
@RequestMapping("/series")
public class SerieController
{
    //Attributes
    @Autowired
    SerieService serieService;

    //Endpoints
    @PostMapping
    @CrossOrigin
    public ResponseEntity postSerie(@RequestBody @Valid CreateSerieRequest newSerie)
    {
        if (!serieService.validateAmountOfSeasonsAndEpisodes(newSerie)) {
            return status(400).build();
        }

        serieService.postSerie(newSerie);

        return status(201).build();
    }

    @GetMapping("/{idUser}")
    @CrossOrigin
    public ResponseEntity getSeries(@PathVariable Integer idUser)
    {
        List<SerieResponse> response = serieService.
                getSeriesByIdUser(idUser);
        return status(200).body(response);
    }

    @DeleteMapping("/{idSerie}")
    @CrossOrigin

    public ResponseEntity deleteSerie(@PathVariable Integer idSerie)
    {
        if (!serieService.checkIfSerieExistsById(idSerie)) {
            return status(404).build();
        }

        serieService.deleteSerieByIdSerie(idSerie);

        return status(200).build();
    }
}
