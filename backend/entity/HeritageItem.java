package com.cultural.heritage.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@Table(name = "HERITAGE_ITEMS")
public class HeritageItem {
    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    private String id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String category;

    @Column(nullable = false)
    private String province;

    @Column(nullable = false)
    private String city;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(columnDefinition = "TEXT")
    private String history;

    @Column(columnDefinition = "TEXT")
    private String technique;

    @Column(nullable = false)
    private String inheritor;

    @ElementCollection
    @CollectionTable(name = "HERITAGE_IMAGES", joinColumns = @JoinColumn(name = "heritage_id"))
    @Column(name = "image_url")
    private List<String> images;

    @Column(name = "hero_image")
    private String heroImage;

    @Column(name = "video_url")
    private String videoUrl;

    @ManyToMany
    @JoinTable(
        name = "HERITAGE_RELATED_ITEMS",
        joinColumns = @JoinColumn(name = "heritage_id"),
        inverseJoinColumns = @JoinColumn(name = "related_id")
    )
    private List<HeritageItem> relatedItems;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
} 