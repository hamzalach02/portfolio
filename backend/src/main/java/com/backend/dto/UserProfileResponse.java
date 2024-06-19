package com.backend.dto;

import com.backend.model.User;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class UserProfileResponse {

    private String fullName;
    private String email;
    private List<String> skills;
    private String website;
    private Date birthdate;
    private String job;
    private String educationDegree;
    private Integer id;


    public UserProfileResponse(User user) {
        this.fullName = user.getFullName();
        this.email = user.getEmail();
        this.skills = user.getSkills();
        this.website = user.getWebsite();
        this.birthdate = user.getBirthdate();
        this.job = user.getJob();
        this.educationDegree = user.getEducationDegree();
        this.id = user.getId();

    }
}
