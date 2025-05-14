package com.cultural.heritage.repository;

import com.cultural.heritage.entity.CommentLike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentLikeRepository extends JpaRepository<CommentLike, String> {
    boolean existsByCommentIdAndUserId(String commentId, String userId);
    void deleteByCommentIdAndUserId(String commentId, String userId);
    long countByCommentId(String commentId);
} 