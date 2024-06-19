package com.backend.controller;

import com.backend.config.JwtService;
import com.backend.dto.UpdatePasswordDto;
import com.backend.dto.UpdateUserDto;
import com.backend.dto.UserProfileResponse;
import com.backend.model.User;
import com.backend.service.AuthenticationService;
import io.jsonwebtoken.Claims;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class meController {

    private final JwtService jwtService;

    private final AuthenticationService authenticationService;

    private final PasswordEncoder passwordEncoder;

    public meController(JwtService jwtService, AuthenticationService authenticationService, PasswordEncoder passwordEncoder) {
        this.jwtService = jwtService;
        this.authenticationService = authenticationService;
        this.passwordEncoder = passwordEncoder;
    }


    @GetMapping("/me")
    @CrossOrigin(origins = "http://localhost:3000")

    public ResponseEntity<UserProfileResponse> getMyProfile(@RequestHeader("Authorization") String authorizationHeader) {
        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String jwtToken = authorizationHeader.substring(7); // Remove "Bearer " prefix

        String email = jwtService.extractClaim(jwtToken, Claims::getSubject);

        User user = authenticationService.getUserByEmail(email);

        String password = passwordEncoder.encode(user.getPassword());

        UserProfileResponse userProfileResponse = new UserProfileResponse(user);

        //userProfileResponse.setPassword(password);

        if (userProfileResponse == null) {
            return ResponseEntity.notFound().build(); // User not found
        }

        return ResponseEntity.ok(userProfileResponse);
    }


    @PutMapping("/update")
    @CrossOrigin(origins = "http://localhost:3000")

    public ResponseEntity<UserProfileResponse> updateProfile(@RequestHeader("Authorization") String authorizationHeader, @RequestBody UpdateUserDto updateUserDto) {
        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String jwtToken = authorizationHeader.substring(7); // Remove "Bearer " prefix
        String email = jwtService.extractClaim(jwtToken, Claims::getSubject);

        User existingUser = authenticationService.getUserByEmail(email);
        if (existingUser == null) {
            return ResponseEntity.notFound().build(); // User not found
        }

        // Update user's profile
        User updatedUser = authenticationService.updateUserProfile(existingUser, updateUserDto);
        UserProfileResponse userProfileResponse= new UserProfileResponse(updatedUser);

        return ResponseEntity.ok(userProfileResponse);
    }

    @PutMapping("/updatePassword")
    @CrossOrigin(origins = "http://localhost:3000")

    public ResponseEntity<String> updatePassword(@RequestHeader("Authorization") String authorizationHeader, @RequestBody UpdatePasswordDto updatePasswordDto) {
        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String jwtToken = authorizationHeader.substring(7); // Remove "Bearer " prefix
        String email = jwtService.extractClaim(jwtToken, Claims::getSubject);

        User existingUser = authenticationService.getUserByEmail(email);
        if (existingUser == null) {
            return ResponseEntity.notFound().build(); // User not found
        }

        // Verify the previous password
        String previousPassword = updatePasswordDto.getPrevPassword();
        String encodedPreviousPassword = existingUser.getPassword(); // Assuming password is already encoded in the database
        if (!passwordEncoder.matches(previousPassword, encodedPreviousPassword)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Previous password is incorrect.");
        }

        // Update the password
        String newPassword = updatePasswordDto.getNewPassword();


        // Save the updated user with the new password
        authenticationService.updateUserPassword(existingUser,newPassword);

        return ResponseEntity.ok("Password updated successfully.");
    }







}
