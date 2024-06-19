package com.backend.dto;


import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Getter
@Setter
public class UpdatePasswordDto {
    private String prevPassword;
    private String newPassword;

    // Getters and setters
}
