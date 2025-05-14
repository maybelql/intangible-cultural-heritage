package com.cultural.heritage.dto;

import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class HeritageResponse {
    private String id;
    private String name;
    private String description;
    private String location;
    private String categoryId;
    private String categoryName;
    private List<String> images;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
} 