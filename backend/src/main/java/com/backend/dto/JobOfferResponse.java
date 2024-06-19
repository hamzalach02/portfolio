package com.backend.dto;

import com.backend.model.JobOffer;
import lombok.Data;

import java.util.Date;

@Data
public class JobOfferResponse {
    private Long id;
    private String title;
    private String creatorFullName;
    private String description;
    private Date createdAt;
    private Integer CreatorId;
    private Boolean isInterested;

    public JobOfferResponse(JobOffer jobOffer) {
        this.title = jobOffer.getTitle();
        this.creatorFullName = jobOffer.getCreator().getFullName();
        this.description = jobOffer.getDescription();
        this.createdAt = jobOffer.getCreatedAt();
        this.id = jobOffer.getId();
        this.CreatorId = jobOffer.getCreator().getId();

    }
}
