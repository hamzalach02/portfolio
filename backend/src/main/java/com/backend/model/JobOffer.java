package com.backend.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Setter
@Getter
public class JobOffer {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(nullable = false)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, length = 1000)
    private String description;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User creator;

    @Column(name = "created_at", updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;

    @ManyToMany(mappedBy = "interestedJobOffers", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private List<User> interestedUsers;

    @PrePersist
    protected void onCreate() {
        this.createdAt = new Date();
    }

    public JobOffer(String title, String description, User creator) {
        this.title = title;
        this.description = description;
        this.creator = creator;
    }
}
