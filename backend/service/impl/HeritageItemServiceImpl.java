package com.cultural.heritage.service.impl;

import com.cultural.heritage.dto.HeritageItemRequest;
import com.cultural.heritage.dto.HeritageItemResponse;
import com.cultural.heritage.entity.HeritageItem;
import com.cultural.heritage.exception.AppException;
import com.cultural.heritage.repository.HeritageItemRepository;
import com.cultural.heritage.service.HeritageItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class HeritageItemServiceImpl implements HeritageItemService {

    private final HeritageItemRepository heritageItemRepository;

    @Override
    public Page<HeritageItemResponse> getAllHeritageItems(Pageable pageable) {
        return heritageItemRepository.findAll(pageable)
                .map(this::convertToResponse);
    }

    @Override
    public Page<HeritageItemResponse> getHeritageItemsByCategory(String category, Pageable pageable) {
        return heritageItemRepository.findByCategory(category, pageable)
                .map(this::convertToResponse);
    }

    @Override
    public Page<HeritageItemResponse> getHeritageItemsByProvince(String province, Pageable pageable) {
        return heritageItemRepository.findByProvince(province, pageable)
                .map(this::convertToResponse);
    }

    @Override
    public Page<HeritageItemResponse> getHeritageItemsByCity(String city, Pageable pageable) {
        return heritageItemRepository.findByCity(city, pageable)
                .map(this::convertToResponse);
    }

    @Override
    public Page<HeritageItemResponse> searchHeritageItems(String keyword, Pageable pageable) {
        return heritageItemRepository.searchByKeyword(keyword, pageable)
                .map(this::convertToResponse);
    }

    @Override
    public HeritageItemResponse getHeritageItemById(String id) {
        return heritageItemRepository.findById(id)
                .map(this::convertToResponse)
                .orElseThrow(() -> new AppException("非遗项目不存在"));
    }

    @Override
    @Transactional
    public HeritageItemResponse createHeritageItem(HeritageItemRequest request) {
        HeritageItem item = new HeritageItem();
        updateItemFromRequest(item, request);
        return convertToResponse(heritageItemRepository.save(item));
    }

    @Override
    @Transactional
    public HeritageItemResponse updateHeritageItem(String id, HeritageItemRequest request) {
        HeritageItem item = heritageItemRepository.findById(id)
                .orElseThrow(() -> new AppException("非遗项目不存在"));
        updateItemFromRequest(item, request);
        return convertToResponse(heritageItemRepository.save(item));
    }

    @Override
    @Transactional
    public void deleteHeritageItem(String id) {
        if (!heritageItemRepository.existsById(id)) {
            throw new AppException("非遗项目不存在");
        }
        heritageItemRepository.deleteById(id);
    }

    @Override
    public List<HeritageItemResponse> getRelatedHeritageItems(List<String> ids) {
        return heritageItemRepository.findByIds(ids)
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    private void updateItemFromRequest(HeritageItem item, HeritageItemRequest request) {
        item.setName(request.getName());
        item.setCategory(request.getCategory());
        item.setProvince(request.getProvince());
        item.setCity(request.getCity());
        item.setDescription(request.getDescription());
        item.setHistory(request.getHistory());
        item.setTechnique(request.getTechnique());
        item.setInheritor(request.getInheritor());
        item.setImages(request.getImages());
        item.setHeroImage(request.getHeroImage());
        item.setVideoUrl(request.getVideoUrl());

        if (request.getRelatedItemIds() != null && !request.getRelatedItemIds().isEmpty()) {
            List<HeritageItem> relatedItems = heritageItemRepository.findByIds(request.getRelatedItemIds());
            item.setRelatedItems(relatedItems);
        }
    }

    private HeritageItemResponse convertToResponse(HeritageItem item) {
        HeritageItemResponse response = new HeritageItemResponse();
        response.setId(item.getId());
        response.setName(item.getName());
        response.setCategory(item.getCategory());
        response.setProvince(item.getProvince());
        response.setCity(item.getCity());
        response.setDescription(item.getDescription());
        response.setHistory(item.getHistory());
        response.setTechnique(item.getTechnique());
        response.setInheritor(item.getInheritor());
        response.setImages(item.getImages());
        response.setHeroImage(item.getHeroImage());
        response.setVideoUrl(item.getVideoUrl());
        response.setCreatedAt(item.getCreatedAt());
        response.setUpdatedAt(item.getUpdatedAt());

        if (item.getRelatedItems() != null) {
            response.setRelatedItems(item.getRelatedItems().stream()
                    .map(this::convertToResponse)
                    .collect(Collectors.toList()));
        }

        return response;
    }
} 