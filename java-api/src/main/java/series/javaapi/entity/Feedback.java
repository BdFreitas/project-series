package series.javaapi.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotBlank;

@Entity
public class Feedback
{
    //Attributes
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idFeedback;

    @NotBlank
    private String feedback;

    //Getters
    public Integer getIdFeedback()
    {
        return idFeedback;
    }

    public String getFeedback()
    {
        return feedback;
    }
}
