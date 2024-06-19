package com.backend.controller;

import com.backend.config.JwtService;
import com.backend.dto.UserProfileResponse;
import com.backend.model.User;
import com.backend.service.AuthenticationService;
import io.jsonwebtoken.Claims;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/auth")
public class UserController {


    private final JwtService jwtService;

    private final AuthenticationService authenticationService;

    public UserController(JwtService jwtService, AuthenticationService authenticationService) {
        this.jwtService = jwtService;
        this.authenticationService = authenticationService;
    }

    @GetMapping("/user/{userId}")

    public ResponseEntity<UserProfileResponse> getUserProfile(@PathVariable Integer userId) {
        User user = authenticationService.getUserById(userId); // Get user by ID from the UserService
        if (user == null) {
            return ResponseEntity.notFound().build(); // User not found
        }

        UserProfileResponse userProfileResponse = new UserProfileResponse(user);
        return ResponseEntity.ok(userProfileResponse);
    }


    @GetMapping("/users")
    public ResponseEntity<List<UserProfileResponse>> getAllUserProfiles(@RequestHeader("Authorization") String authorizationHeader) {
        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String jwtToken = authorizationHeader.substring(7); // Remove "Bearer " prefix

        String email = jwtService.extractClaim(jwtToken, Claims::getSubject);

        // Fetch all users
        List<User> users = authenticationService.getAllUsers();

        // Convert users to profile responses
        List<UserProfileResponse> userProfileResponses = users.stream()
                .map(user -> new UserProfileResponse(user))
                .collect(Collectors.toList());

        return ResponseEntity.ok(userProfileResponses);
    }
}
