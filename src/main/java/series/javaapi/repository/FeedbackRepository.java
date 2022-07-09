package series.javaapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import series.javaapi.entity.Feedback;

public interface FeedbackRepository extends JpaRepository<Feedback, Integer>
{
}
