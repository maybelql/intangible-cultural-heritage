package com.cultural.heritage.repository;

import com.cultural.heritage.entity.Comment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepository extends JpaRepository<Comment, String> {
    Page<Comment> findByStoryIdAndParentIdIsNull(String storyId, Pageable pageable);
    
    @Query("SELECT c FROM Comment c LEFT JOIN FETCH c.user LEFT JOIN FETCH c.parent WHERE c.id = :id")
    Comment findByIdWithRelations(String id);
    
    long countByStoryId(String storyId);
    
    @Query("SELECT COUNT(c) FROM Comment c WHERE c.parentId = :parentId")
    long countReplies(String parentId);
} 