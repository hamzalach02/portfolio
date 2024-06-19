package com.backend.dto;

import lombok.*;

import java.util.Date;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Getter
@Setter
public class RegisterUserDto {
    private String email;
    private String password;
    private String fullName;
    private String website;
    private Date birthdate;
    private String job;
    private String educationDegree;
    private List<String> skills;
}
