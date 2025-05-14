package com.cultural.heritage.repository;

import com.cultural.heritage.entity.Heritage;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface HeritageRepository extends JpaRepository<Heritage, String> {
    @Query("SELECT h FROM Heritage h LEFT JOIN FETCH h.category WHERE h.categoryId = :categoryId")
    Page<Heritage> findByCategoryId(String categoryId, Pageable pageable);

    @Query("SELECT h FROM Heritage h LEFT JOIN FETCH h.category")
    Page<Heritage> findAllWithCategory(Pageable pageable);
} 