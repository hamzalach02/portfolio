package com.backend.controller;


import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class LoginResponse {
    private String token;

    private long expiresIn;



    // Getters and setters...
}
