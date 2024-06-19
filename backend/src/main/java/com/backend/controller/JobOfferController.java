package com.backend.controller;

import com.backend.config.JwtService;
import com.backend.dto.AddJobOfferRequest;
import com.backend.dto.JobOfferDto;
import com.backend.dto.JobOfferResponse;
import com.backend.dto.UserProfileResponse;
import com.backend.model.JobOffer;
import com.backend.model.User;
import com.backend.service.AuthenticationService;
import com.backend.service.JobOfferService;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/auth")

public class JobOfferController {
    private final JobOfferService jobOfferService;
    private final JwtService jwtService;
    private final AuthenticationService authenticationService;

    @Autowired
    public JobOfferController(JobOfferService jobOfferService, JwtService jwtService, AuthenticationService authenticationService) {
        this.jobOfferService = jobOfferService;
        this.jwtService = jwtService;
        this.authenticationService = authenticationService;
    }

    @PostMapping("/createJob")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<String> createJobOffer(@RequestHeader("Authorization") String authorizationHeader, @RequestBody JobOfferDto jobOfferDto) {
        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("JWT token is required");
        }

        String jwtToken = authorizationHeader.substring(7); // Remove "Bearer " prefix
        String email = jwtService.extractClaim(jwtToken, Claims::getSubject);

        User user = authenticationService.getUserByEmail(email);

        JobOffer jobOffer = new JobOffer();
        jobOffer.setTitle(jobOfferDto.getTitle());
        jobOffer.setDescription(jobOfferDto.getDescription());
        jobOffer.setCreator(user);

        JobOffer createdJobOffer = jobOfferService.createJobOffer(jobOffer);

        return new ResponseEntity<>("Job offer created", HttpStatus.CREATED);
    }

    @GetMapping("/allJobs")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<List<JobOfferResponse>> getAllJobOffers(@RequestHeader("Authorization") String authorizationHeader) {
        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            return ResponseEntity.badRequest().build();
        }

        String jwtToken = authorizationHeader.substring(7); // Remove "Bearer " prefix
        String email = jwtService.extractClaim(jwtToken, Claims::getSubject);

        User currentUser = authenticationService.getUserByEmail(email);
        if (currentUser == null) {
            return ResponseEntity.notFound().build(); // Current user not found
        }

        List<JobOffer> jobOffers = jobOfferService.getAllJobOffers();
        List<Long> userInterestedJobOfferIds = currentUser.getInterestedJobOffers().stream().map(JobOffer::getId).collect(Collectors.toList());

        List<JobOfferResponse> jobOfferResponses = jobOffers.stream()
                .map(jobOffer -> {
                    JobOfferResponse response = new JobOfferResponse(jobOffer);
                    response.setIsInterested(userInterestedJobOfferIds.contains(jobOffer.getId()));
                    return response;
                })
                .collect(Collectors.toList());

        return ResponseEntity.ok(jobOfferResponses);
    }




    @PostMapping("/addJobInterested")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<JobOfferResponse> addJobOfferToInterestedList(@RequestHeader("Authorization") String authorizationHeader, @RequestBody AddJobOfferRequest request) {
        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            return ResponseEntity.badRequest().build();
        }

        String jwtToken = authorizationHeader.substring(7); // Remove "Bearer " prefix
        String email = jwtService.extractClaim(jwtToken, Claims::getSubject);

        User user = authenticationService.getUserByEmail(email);
        if (user == null) {
            return ResponseEntity.notFound().build(); // User not found
        }

        JobOffer jobOffer = jobOfferService.getJobOfferById(request.getJobOfferId());
        if (jobOffer == null) {
            return ResponseEntity.notFound().build(); // Job offer not found
        }

        try {
            authenticationService.addJobOfferToUserInterested(jobOffer, user);
            JobOfferResponse jobOfferResponse = new JobOfferResponse(jobOffer);
            return ResponseEntity.ok(jobOfferResponse);
        } catch (Exception e) {
            // Log the error or handle it accordingly
            e.printStackTrace();
            // Return an appropriate error response
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }



    @PostMapping("/removeJobInterested")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<JobOfferResponse> removeJobOfferFromInterestedList(@RequestHeader("Authorization") String authorizationHeader, @RequestBody AddJobOfferRequest request) {
        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            return ResponseEntity.badRequest().build();
        }

        String jwtToken = authorizationHeader.substring(7); // Remove "Bearer " prefix
        String email = jwtService.extractClaim(jwtToken, Claims::getSubject);

        User user = authenticationService.getUserByEmail(email);
        if (user == null) {
            return ResponseEntity.notFound().build(); // User not found
        }

        JobOffer jobOffer = jobOfferService.getJobOfferById(request.getJobOfferId());
        if (jobOffer == null) {
            return ResponseEntity.notFound().build(); // Job offer not found
        }

        try {
            authenticationService.removeJobOfferFromUserInterested(jobOffer, user);
            JobOfferResponse jobOfferResponse = new JobOfferResponse(jobOffer);
            return ResponseEntity.ok(jobOfferResponse);
        } catch (Exception e) {
            // Log the error or handle it accordingly
            e.printStackTrace();
            // Return an appropriate error response
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }


    @DeleteMapping("/deleteJob/{jobOfferId}")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<String> deleteJobOffer(@RequestHeader("Authorization") String authorizationHeader, @PathVariable Long jobOfferId) {
        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("JWT token is required");
        }

        String jwtToken = authorizationHeader.substring(7); // Remove "Bearer " prefix
        String email = jwtService.extractClaim(jwtToken, Claims::getSubject);

        User user = authenticationService.getUserByEmail(email);
        if (user == null) {
            return ResponseEntity.notFound().build(); // User not found
        }

        JobOffer jobOffer = jobOfferService.getJobOfferById(jobOfferId);
        if (jobOffer == null) {
            return ResponseEntity.notFound().build(); // Job offer not found
        }

        // Check if the user is the creator of the job offer
        if (!jobOffer.getCreator().getId().equals(user.getId())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You are not authorized to delete this job offer");
        }

        // Delete the job offer
        jobOfferService.deleteJobOffer(jobOffer);

        return ResponseEntity.ok("Job offer deleted successfully");
    }

    @GetMapping("/createdJobOffers/{userId}")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<List<JobOfferResponse>> getUserJobOffers(@RequestHeader("Authorization") String authorizationHeader, @PathVariable Integer userId) {
        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            return ResponseEntity.badRequest().build();
        }

        String jwtToken = authorizationHeader.substring(7); // Remove "Bearer " prefix
        String email = jwtService.extractClaim(jwtToken, Claims::getSubject);

        User currentUser = authenticationService.getUserByEmail(email);
        if (currentUser == null) {
            return ResponseEntity.notFound().build(); // Current user not found
        }

        User user = authenticationService.getUserById(userId);
        if (user == null) {
            return ResponseEntity.notFound().build(); // Specified user not found
        }

        List<JobOffer> createdJobOffers = jobOfferService.getJobOffersByCreator(user);
        List<Long> userInterestedJobOfferIds = currentUser.getInterestedJobOffers().stream().map(JobOffer::getId).collect(Collectors.toList());

        List<JobOfferResponse> jobOffersCreatedByUser = createdJobOffers.stream()
                .map(jobOffer -> {
                    JobOfferResponse response = new JobOfferResponse(jobOffer);
                    response.setIsInterested(userInterestedJobOfferIds.contains(jobOffer.getId()));
                    return response;
                })
                .collect(Collectors.toList());

        return ResponseEntity.ok(jobOffersCreatedByUser);
    }

    @GetMapping("/interestedJobOffers/{userId}")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<List<JobOfferResponse>> getUserInterested(@RequestHeader("Authorization") String authorizationHeader, @PathVariable Integer userId) {
        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            return ResponseEntity.badRequest().build();
        }

        String jwtToken = authorizationHeader.substring(7); // Remove "Bearer " prefix
        String email = jwtService.extractClaim(jwtToken, Claims::getSubject);

        User currentUser = authenticationService.getUserByEmail(email);
        if (currentUser == null) {
            return ResponseEntity.notFound().build(); // Current user not found
        }

        User user = authenticationService.getUserById(userId);
        if (user == null) {
            return ResponseEntity.notFound().build(); // Specified user not found
        }

        List<JobOffer> interestedJobOffers = user.getInterestedJobOffers();
        List<Long> userInterestedJobOfferIds = currentUser.getInterestedJobOffers().stream().map(JobOffer::getId).collect(Collectors.toList());

        List<JobOfferResponse> interestedJobOffersResponse = interestedJobOffers.stream()
                .map(jobOffer -> {
                    JobOfferResponse response = new JobOfferResponse(jobOffer);
                    response.setIsInterested(userInterestedJobOfferIds.contains(jobOffer.getId()));
                    return response;
                })
                .collect(Collectors.toList());

        return ResponseEntity.ok(interestedJobOffersResponse);
    }


    @PostMapping("/interestedUsers/{id}")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<List<UserProfileResponse>> getInterestedUsers(@RequestHeader("Authorization") String authorizationHeader, @PathVariable("id") Long jobOfferId) {
        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            return ResponseEntity.badRequest().build();
        }

        String jwtToken = authorizationHeader.substring(7); // Remove "Bearer " prefix
        String email = jwtService.extractClaim(jwtToken, Claims::getSubject);

        User user = authenticationService.getUserByEmail(email);
        if (user == null) {
            return ResponseEntity.notFound().build(); // User not found
        }

        try {
            // Find the job offer by ID
            JobOffer jobOffer = jobOfferService.getJobOfferById(jobOfferId);
            if (jobOffer == null) {
                return ResponseEntity.notFound().build(); // Job offer not found
            }

            // Get the interested users for the job offer
            List<User> interestedUsers = jobOffer.getInterestedUsers();

            // Convert interested users to UserProfileResponse
            List<UserProfileResponse> userProfileResponses = interestedUsers.stream()
                    .map(UserProfileResponse::new)
                    .collect(Collectors.toList());

            return ResponseEntity.ok(userProfileResponses);
        } catch (Exception e) {
            // Log the error or handle it accordingly
            e.printStackTrace();
            // Return an appropriate error response
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }










}
