package com.cultural.heritage.dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class HeritageItemResponse {
    private String id;
    private String name;
    private String category;
    private String province;
    private String city;
    private String description;
    private String history;
    private String technique;
    private String inheritor;
    private List<String> images;
    private String heroImage;
    private String videoUrl;
    private List<HeritageItemResponse> relatedItems;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
} 