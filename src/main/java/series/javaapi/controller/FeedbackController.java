package series.javaapi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import series.javaapi.entity.Feedback;
import series.javaapi.repository.FeedbackRepository;
import series.javaapi.service.FeedbackService;

import javax.validation.Valid;

import static org.springframework.http.ResponseEntity.*;

@RestController
@RequestMapping("/feedbacks")
public class FeedbackController
{
    //Attributes
    @Autowired
    private FeedbackService feedbackService;

    //Endpoints
    @PostMapping
    @CrossOrigin
    public ResponseEntity postFeedback(@RequestBody @Valid Feedback feedback)
    {
        feedbackService.save(feedback);
        return status(201).build();
    }
}
