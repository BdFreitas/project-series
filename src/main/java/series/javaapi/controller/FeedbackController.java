package series.javaapi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import series.javaapi.entity.Feedback;
import series.javaapi.repository.FeedbackRepository;

import javax.validation.Valid;

import static org.springframework.http.ResponseEntity.*;

@RestController
@RequestMapping("/feedbacks")
public class FeedbackController
{
    //Attributes
    @Autowired
    private FeedbackRepository feedbackRepository;

    //Endpoints
    @PostMapping
    @CrossOrigin
    public ResponseEntity postFeedback(@RequestBody @Valid Feedback feedback)
    {
        feedbackRepository.save(feedback);
        return status(201).build();
    }
}
