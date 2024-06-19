package com.backend.service;

import com.backend.dto.LoginUserDto;
import com.backend.dto.RegisterUserDto;
import com.backend.dto.UpdateUserDto;
import com.backend.model.JobOffer;
import com.backend.model.User;
import com.backend.repository.JobOfferRepository;
import com.backend.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuthenticationService {
    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;


    private final JobOfferRepository jobOfferRepository;

    private final AuthenticationManager authenticationManager;

    public AuthenticationService(
            UserRepository userRepository,
            AuthenticationManager authenticationManager,
            PasswordEncoder passwordEncoder, JobOfferRepository jobOfferRepository
    ) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jobOfferRepository = jobOfferRepository;
    }

    public User getUserById(Integer id) {
        return userRepository.findById(id)
                .orElseThrow();
    }

    public User signup(RegisterUserDto input) {
        User user = new User();
        user.setFullName(input.getFullName());
        user.setEmail(input.getEmail());
        user.setPassword(passwordEncoder.encode(input.getPassword()));
        user.setBirthdate(input.getBirthdate());
        user.setJob(input.getJob());
        user.setWebsite(input.getWebsite());
        user.setEducationDegree(input.getEducationDegree());
        user.setSkills(input.getSkills());
        return userRepository.save(user);
    }
    public User authenticate(LoginUserDto input) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        input.getEmail(),
                        input.getPassword()
                )
        );

        return userRepository.findByEmail(input.getEmail())
                .orElseThrow();
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
    }



    @Transactional
    public void addJobOfferToUserInterested(JobOffer jobOffer, User user) {
        // Access the collection within the transactional context
        user.getInterestedJobOffers().add(jobOffer);
        // Update the user entity in the database
        userRepository.save(user);
    }

    @Transactional
    public User updateUserProfile(User existingUser, UpdateUserDto updateUserDto) {
        existingUser.setFullName(updateUserDto.getFullName());
        existingUser.setEmail(updateUserDto.getEmail());

        // Update password only if the new password is not null
        String newPassword = updateUserDto.getPassword();
        if (newPassword != null) {
            existingUser.setPassword(passwordEncoder.encode(newPassword));
        }

        existingUser.setBirthdate(updateUserDto.getBirthdate());
        existingUser.setJob(updateUserDto.getJob());
        existingUser.setWebsite(updateUserDto.getWebsite());
        existingUser.setEducationDegree(updateUserDto.getEducationDegree());
        existingUser.setSkills(updateUserDto.getSkills());

        return userRepository.save(existingUser);
    }


    public void updateUserPassword(User existingUser, String newPassword) {
        existingUser.setPassword(newPassword);
        userRepository.save(existingUser);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }



    public void removeJobOfferFromUserInterested(JobOffer jobOffer, User user) {
        // Access the collection within the transactional context
        List<JobOffer> interestedJobOffers = user.getInterestedJobOffers();
        interestedJobOffers.removeIf(j -> j.getId().equals(jobOffer.getId()));
        user.setInterestedJobOffers(interestedJobOffers);

        // Update the user entity in the database
        userRepository.save(user);
    }


}
