package com.cultural.heritage.service;

import com.cultural.heritage.dto.StoryRequest;
import com.cultural.heritage.dto.StoryResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface StoryService {
    Page<StoryResponse> getAllStories(Pageable pageable);
    Page<StoryResponse> getStoriesByHeritage(String heritageId, Pageable pageable);
    Page<StoryResponse> getStoriesByAuthor(String authorId, Pageable pageable);
    StoryResponse getStoryById(String id);
    StoryResponse createStory(StoryRequest request, String authorId);
    StoryResponse updateStory(String id, StoryRequest request);
    void deleteStory(String id);
    void incrementViews(String id);
    void toggleLike(String id, String userId);
} 