package com.cultural.heritage.entity;

import lombok.Data;
import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "STORY_LIKES")
public class StoryLike {
    @Id
    @Column(name = "ID")
    private String id;

    @Column(name = "STORY_ID")
    private String storyId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "STORY_ID", insertable = false, updatable = false)
    private Story story;

    @Column(name = "USER_ID")
    private String userId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_ID", insertable = false, updatable = false)
    private User user;

    @Column(name = "CREATED_AT")
    private LocalDateTime createdAt;
} 