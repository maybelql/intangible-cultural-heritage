package com.cultural.heritage.service;

import com.cultural.heritage.dto.HeritageRequest;
import com.cultural.heritage.dto.HeritageResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface HeritageService {
    Page<HeritageResponse> getAllHeritage(String categoryId, Pageable pageable);
    HeritageResponse getHeritageById(String id);
    HeritageResponse createHeritage(HeritageRequest request);
    HeritageResponse updateHeritage(String id, HeritageRequest request);
    void deleteHeritage(String id);
} 