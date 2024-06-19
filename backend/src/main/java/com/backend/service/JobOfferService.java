package com.backend.service;

import com.backend.model.JobOffer;
import com.backend.model.User;
import com.backend.repository.JobOfferRepository;
import com.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class JobOfferService {
    private final JobOfferRepository jobOfferRepository;
    private final UserRepository userRepository;

    @Autowired
    public JobOfferService(JobOfferRepository jobOfferRepository, UserRepository userRepository) {
        this.jobOfferRepository = jobOfferRepository;
        this.userRepository = userRepository;
    }

    public JobOffer createJobOffer(JobOffer jobOffer) {
        return jobOfferRepository.save(jobOffer);
    }


    @Transactional(readOnly = true)
    public List<JobOffer> getAllJobOffers() {
        return jobOfferRepository.findAll();
    }

    public List<JobOffer> getJobOffersByCreator(User user) {
        return jobOfferRepository.findByCreator(user);
    }

    public JobOffer getJobOfferById(Long jobOfferId) {
       return jobOfferRepository.getJobOfferById(jobOfferId);
    }


    public void deleteJobOffer(JobOffer jobOffer) {
        // Remove jobOffer from interestedUsers list of all related users
        for (User user : jobOffer.getInterestedUsers()) {
            user.getInterestedJobOffers().remove(jobOffer);
            // Save the user to reflect the changes in the database
            userRepository.save(user);
        }

        // Delete the jobOffer
        jobOfferRepository.delete(jobOffer);
    }
}
