package com.cultural.heritage.service;

import com.cultural.heritage.dto.CommentRequest;
import com.cultural.heritage.dto.CommentResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface CommentService {
    Page<CommentResponse> getCommentsByStory(String storyId, Pageable pageable);
    CommentResponse getCommentById(String id);
    CommentResponse createComment(String storyId, CommentRequest request, String userId);
    CommentResponse updateComment(String id, CommentRequest request);
    void deleteComment(String id);
    void toggleLike(String id, String userId);
} 