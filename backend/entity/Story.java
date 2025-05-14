package com.cultural.heritage.entity;

import lombok.Data;
import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "STORIES")
public class Story {
    @Id
    @Column(name = "ID")
    private String id;

    @Column(name = "TITLE", nullable = false)
    private String title;

    @Column(name = "CONTENT", columnDefinition = "CLOB")
    private String content;

    @Column(name = "AUTHOR_ID")
    private String authorId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "AUTHOR_ID", insertable = false, updatable = false)
    private User author;

    @Column(name = "HERITAGE_ID")
    private String heritageId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "HERITAGE_ID", insertable = false, updatable = false)
    private Heritage heritage;

    @Column(name = "IMAGES", columnDefinition = "CLOB")
    private String images;

    @Column(name = "VIEWS", nullable = false)
    private Integer views = 0;

    @Column(name = "LIKES", nullable = false)
    private Integer likes = 0;

    @Column(name = "CREATED_AT")
    private LocalDateTime createdAt;

    @Column(name = "UPDATED_AT")
    private LocalDateTime updatedAt;
} 