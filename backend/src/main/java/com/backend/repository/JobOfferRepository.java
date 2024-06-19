package com.backend.repository;

import com.backend.model.JobOffer;
import com.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface JobOfferRepository extends JpaRepository<JobOffer,Long> {
    List<JobOffer> findByCreator(User user);

    JobOffer getJobOfferById(Long id);
}
