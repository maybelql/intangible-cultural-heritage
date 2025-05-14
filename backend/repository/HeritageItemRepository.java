package com.cultural.heritage.repository;

import com.cultural.heritage.entity.HeritageItem;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HeritageItemRepository extends JpaRepository<HeritageItem, String> {
    Page<HeritageItem> findByCategory(String category, Pageable pageable);
    Page<HeritageItem> findByProvince(String province, Pageable pageable);
    Page<HeritageItem> findByCity(String city, Pageable pageable);
    
    @Query("SELECT h FROM HeritageItem h WHERE h.name LIKE %:keyword% OR h.description LIKE %:keyword%")
    Page<HeritageItem> searchByKeyword(String keyword, Pageable pageable);
    
    @Query("SELECT h FROM HeritageItem h WHERE h.id IN :ids")
    List<HeritageItem> findByIds(List<String> ids);
} 