package com.cultural.heritage.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class StoryResponse {
    private String id;
    private String title;
    private String content;
    private String heritageId;
    private String heritageName;
    private String authorId;
    private String authorName;
    private Integer likesCount;
    private Boolean isLiked;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
} 