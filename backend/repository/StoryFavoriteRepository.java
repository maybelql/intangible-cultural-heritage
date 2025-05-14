package com.cultural.heritage.repository;

import com.cultural.heritage.entity.StoryFavorite;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StoryFavoriteRepository extends JpaRepository<StoryFavorite, String> {
    boolean existsByStoryIdAndUserId(String storyId, String userId);
    void deleteByStoryIdAndUserId(String storyId, String userId);
    Page<StoryFavorite> findByUserId(String userId, Pageable pageable);
    long countByStoryId(String storyId);
} 