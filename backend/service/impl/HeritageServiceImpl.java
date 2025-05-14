package com.cultural.heritage.service.impl;

import com.cultural.heritage.dto.HeritageRequest;
import com.cultural.heritage.dto.HeritageResponse;
import com.cultural.heritage.entity.Category;
import com.cultural.heritage.entity.Heritage;
import com.cultural.heritage.exception.AppException;
import com.cultural.heritage.repository.CategoryRepository;
import com.cultural.heritage.repository.HeritageRepository;
import com.cultural.heritage.service.HeritageService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class HeritageServiceImpl implements HeritageService {

    private final HeritageRepository heritageRepository;
    private final CategoryRepository categoryRepository;
    private final ObjectMapper objectMapper;

    @Override
    public Page<HeritageResponse> getAllHeritage(String categoryId, Pageable pageable) {
        Page<Heritage> heritagePage;
        if (categoryId != null && !categoryId.isEmpty()) {
            heritagePage = heritageRepository.findByCategoryId(categoryId, pageable);
        } else {
            heritagePage = heritageRepository.findAllWithCategory(pageable);
        }
        return heritagePage.map(this::convertToResponse);
    }

    @Override
    public HeritageResponse getHeritageById(String id) {
        Heritage heritage = heritageRepository.findById(id)
                .orElseThrow(() -> new AppException("文化遗产不存在", 404));
        return convertToResponse(heritage);
    }

    @Override
    @Transactional
    public HeritageResponse createHeritage(HeritageRequest request) {
        // 验证分类是否存在
        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new AppException("分类不存在", 404));

        Heritage heritage = new Heritage();
        heritage.setId(UUID.randomUUID().toString());
        heritage.setName(request.getName());
        heritage.setDescription(request.getDescription());
        heritage.setLocation(request.getLocation());
        heritage.setCategoryId(request.getCategoryId());
        heritage.setImages(convertImagesToString(request.getImages()));
        heritage.setCreatedAt(LocalDateTime.now());
        heritage.setUpdatedAt(LocalDateTime.now());

        heritage = heritageRepository.save(heritage);
        heritage.setCategory(category);

        return convertToResponse(heritage);
    }

    @Override
    @Transactional
    public HeritageResponse updateHeritage(String id, HeritageRequest request) {
        Heritage heritage = heritageRepository.findById(id)
                .orElseThrow(() -> new AppException("文化遗产不存在", 404));

        // 验证分类是否存在
        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new AppException("分类不存在", 404));

        heritage.setName(request.getName());
        heritage.setDescription(request.getDescription());
        heritage.setLocation(request.getLocation());
        heritage.setCategoryId(request.getCategoryId());
        heritage.setImages(convertImagesToString(request.getImages()));
        heritage.setUpdatedAt(LocalDateTime.now());

        heritage = heritageRepository.save(heritage);
        heritage.setCategory(category);

        return convertToResponse(heritage);
    }

    @Override
    @Transactional
    public void deleteHeritage(String id) {
        if (!heritageRepository.existsById(id)) {
            throw new AppException("文化遗产不存在", 404);
        }
        heritageRepository.deleteById(id);
    }

    private HeritageResponse convertToResponse(Heritage heritage) {
        HeritageResponse response = new HeritageResponse();
        response.setId(heritage.getId());
        response.setName(heritage.getName());
        response.setDescription(heritage.getDescription());
        response.setLocation(heritage.getLocation());
        response.setCategoryId(heritage.getCategoryId());
        response.setCategoryName(heritage.getCategory() != null ? heritage.getCategory().getName() : null);
        response.setImages(convertStringToImages(heritage.getImages()));
        response.setCreatedAt(heritage.getCreatedAt());
        response.setUpdatedAt(heritage.getUpdatedAt());
        return response;
    }

    private String convertImagesToString(List<String> images) {
        try {
            return objectMapper.writeValueAsString(images);
        } catch (JsonProcessingException e) {
            throw new AppException("图片数据转换失败", 500);
        }
    }

    private List<String> convertStringToImages(String images) {
        try {
            return objectMapper.readValue(images, new TypeReference<List<String>>() {});
        } catch (JsonProcessingException e) {
            throw new AppException("图片数据转换失败", 500);
        }
    }
} 