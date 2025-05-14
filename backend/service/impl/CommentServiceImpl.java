package com.cultural.heritage.service.impl;

import com.cultural.heritage.dto.CommentRequest;
import com.cultural.heritage.dto.CommentResponse;
import com.cultural.heritage.entity.Comment;
import com.cultural.heritage.entity.CommentLike;
import com.cultural.heritage.entity.Story;
import com.cultural.heritage.entity.User;
import com.cultural.heritage.exception.AppException;
import com.cultural.heritage.repository.CommentLikeRepository;
import com.cultural.heritage.repository.CommentRepository;
import com.cultural.heritage.repository.StoryRepository;
import com.cultural.heritage.repository.UserRepository;
import com.cultural.heritage.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;
    private final StoryRepository storyRepository;
    private final UserRepository userRepository;
    private final CommentLikeRepository commentLikeRepository;

    @Override
    public Page<CommentResponse> getCommentsByStory(String storyId, Pageable pageable) {
        return commentRepository.findByStoryIdAndParentIdIsNull(storyId, pageable)
                .map(this::convertToResponse);
    }

    @Override
    public CommentResponse getCommentById(String id) {
        Comment comment = commentRepository.findByIdWithRelations(id)
                .orElseThrow(() -> new AppException("评论不存在", 404));
        return convertToResponse(comment);
    }

    @Override
    @Transactional
    public CommentResponse createComment(String storyId, CommentRequest request, String userId) {
        // 验证故事是否存在
        Story story = storyRepository.findById(storyId)
                .orElseThrow(() -> new AppException("故事不存在", 404));

        // 验证用户是否存在
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new AppException("用户不存在", 404));

        // 如果是回复，验证父评论是否存在
        if (request.getParentId() != null) {
            Comment parent = commentRepository.findById(request.getParentId())
                    .orElseThrow(() -> new AppException("父评论不存在", 404));
            if (!parent.getStoryId().equals(storyId)) {
                throw new AppException("父评论不属于该故事", 400);
            }
        }

        Comment comment = new Comment();
        comment.setId(UUID.randomUUID().toString());
        comment.setContent(request.getContent());
        comment.setStoryId(storyId);
        comment.setUserId(userId);
        comment.setParentId(request.getParentId());
        comment.setLikes(0);
        comment.setCreatedAt(LocalDateTime.now());
        comment.setUpdatedAt(LocalDateTime.now());

        comment = commentRepository.save(comment);
        return convertToResponse(comment);
    }

    @Override
    @Transactional
    public CommentResponse updateComment(String id, CommentRequest request) {
        Comment comment = commentRepository.findById(id)
                .orElseThrow(() -> new AppException("评论不存在", 404));

        comment.setContent(request.getContent());
        comment.setUpdatedAt(LocalDateTime.now());

        comment = commentRepository.save(comment);
        return convertToResponse(comment);
    }

    @Override
    @Transactional
    public void deleteComment(String id) {
        if (!commentRepository.existsById(id)) {
            throw new AppException("评论不存在", 404);
        }
        commentRepository.deleteById(id);
    }

    @Override
    @Transactional
    public CommentResponse toggleLike(String id, String userId) {
        Comment comment = commentRepository.findById(id)
                .orElseThrow(() -> new AppException("评论不存在", 404));
        
        boolean isLiked = commentLikeRepository.existsByCommentIdAndUserId(id, userId);
        if (isLiked) {
            commentLikeRepository.deleteByCommentIdAndUserId(id, userId);
            comment.setLikes(comment.getLikes() - 1);
        } else {
            CommentLike like = new CommentLike();
            like.setId(UUID.randomUUID().toString());
            like.setCommentId(id);
            like.setUserId(userId);
            commentLikeRepository.save(like);
            comment.setLikes(comment.getLikes() + 1);
        }

        comment = commentRepository.save(comment);
        return convertToResponse(comment);
    }

    private CommentResponse convertToResponse(Comment comment) {
        CommentResponse response = new CommentResponse();
        response.setId(comment.getId());
        response.setContent(comment.getContent());
        response.setStoryId(comment.getStoryId());
        response.setUserId(comment.getUserId());
        response.setUserName(comment.getUser() != null ? comment.getUser().getUsername() : null);
        response.setParentId(comment.getParentId());
        response.setLikes(comment.getLikes());
        response.setCreatedAt(comment.getCreatedAt());
        response.setUpdatedAt(comment.getUpdatedAt());

        if (comment.getReplies() != null) {
            response.setReplies(comment.getReplies().stream()
                    .map(this::convertToResponse)
                    .collect(Collectors.toList()));
        }

        return response;
    }
} 