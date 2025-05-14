package com.cultural.heritage.dto;

import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class CommentResponse {
    private String id;
    private String content;
    private String storyId;
    private String userId;
    private String userName;
    private String parentId;
    private List<CommentResponse> replies;
    private Integer likes;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
} 