package com.cultural.heritage.repository;

import com.cultural.heritage.entity.Story;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface StoryRepository extends JpaRepository<Story, String> {
    @Query("SELECT s FROM Story s LEFT JOIN FETCH s.heritage LEFT JOIN FETCH s.author WHERE s.heritageId = :heritageId")
    Page<Story> findByHeritageId(String heritageId, Pageable pageable);

    @Query("SELECT s FROM Story s LEFT JOIN FETCH s.heritage LEFT JOIN FETCH s.author")
    Page<Story> findAllWithDetails(Pageable pageable);

    @Query("SELECT COUNT(sl) > 0 FROM StoryLike sl WHERE sl.storyId = :storyId AND sl.userId = :userId")
    boolean existsByStoryIdAndUserId(String storyId, String userId);
} 