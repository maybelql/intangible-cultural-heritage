package com.cultural.heritage.service;

import com.cultural.heritage.dto.HeritageItemRequest;
import com.cultural.heritage.dto.HeritageItemResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface HeritageItemService {
    Page<HeritageItemResponse> getAllHeritageItems(Pageable pageable);
    Page<HeritageItemResponse> getHeritageItemsByCategory(String category, Pageable pageable);
    Page<HeritageItemResponse> getHeritageItemsByProvince(String province, Pageable pageable);
    Page<HeritageItemResponse> getHeritageItemsByCity(String city, Pageable pageable);
    Page<HeritageItemResponse> searchHeritageItems(String keyword, Pageable pageable);
    HeritageItemResponse getHeritageItemById(String id);
    HeritageItemResponse createHeritageItem(HeritageItemRequest request);
    HeritageItemResponse updateHeritageItem(String id, HeritageItemRequest request);
    void deleteHeritageItem(String id);
    List<HeritageItemResponse> getRelatedHeritageItems(List<String> ids);
} 