package series.javaapi.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import series.javaapi.entity.Feedback;
import series.javaapi.repository.FeedbackRepository;

@Service
public class FeedbackService
{
    //Attributes
    @Autowired
    private FeedbackRepository feedbackRepository;

    //Methods
    public void save(Feedback feedback)
    {
        feedbackRepository.save(feedback);
    }
}
