package com.cultural.heritage.repository;

import com.cultural.heritage.entity.StoryLike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StoryLikeRepository extends JpaRepository<StoryLike, String> {
    boolean existsByStoryIdAndUserId(String storyId, String userId);
    void deleteByStoryIdAndUserId(String storyId, String userId);
    long countByStoryId(String storyId);
} 