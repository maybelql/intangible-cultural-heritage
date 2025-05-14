package com.cultural.heritage.entity;

import lombok.Data;
import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@Table(name = "COMMENTS")
public class Comment {
    @Id
    @Column(name = "ID")
    private String id;

    @Column(name = "CONTENT", nullable = false, columnDefinition = "CLOB")
    private String content;

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

    @Column(name = "PARENT_ID")
    private String parentId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "PARENT_ID", insertable = false, updatable = false)
    private Comment parent;

    @OneToMany(mappedBy = "parent", cascade = CascadeType.ALL)
    private List<Comment> replies;

    @Column(name = "LIKES", nullable = false)
    private Integer likes = 0;

    @Column(name = "CREATED_AT")
    private LocalDateTime createdAt;

    @Column(name = "UPDATED_AT")
    private LocalDateTime updatedAt;
} 