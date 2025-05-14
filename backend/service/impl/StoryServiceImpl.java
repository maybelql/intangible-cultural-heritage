package com.cultural.heritage.service.impl;

import com.cultural.heritage.dto.StoryRequest;
import com.cultural.heritage.dto.StoryResponse;
import com.cultural.heritage.entity.Heritage;
import com.cultural.heritage.entity.Story;
import com.cultural.heritage.entity.StoryFavorite;
import com.cultural.heritage.entity.StoryLike;
import com.cultural.heritage.entity.User;
import com.cultural.heritage.exception.AppException;
import com.cultural.heritage.repository.HeritageRepository;
import com.cultural.heritage.repository.StoryFavoriteRepository;
import com.cultural.heritage.repository.StoryLikeRepository;
import com.cultural.heritage.repository.StoryRepository;
import com.cultural.heritage.repository.UserRepository;
import com.cultural.heritage.service.StoryService;
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
public class StoryServiceImpl implements StoryService {

    private final StoryRepository storyRepository;
    private final HeritageRepository heritageRepository;
    private final UserRepository userRepository;
    private final StoryLikeRepository storyLikeRepository;
    private final StoryFavoriteRepository storyFavoriteRepository;
    private final ObjectMapper objectMapper;

    @Override
    public Page<StoryResponse> getAllStories(Pageable pageable) {
        return storyRepository.findAllWithRelations(pageable)
                .map(this::convertToResponse);
    }

    @Override
    public Page<StoryResponse> getStoriesByHeritage(String heritageId, Pageable pageable) {
        return storyRepository.findByHeritageId(heritageId, pageable)
                .map(this::convertToResponse);
    }

    @Override
    public Page<StoryResponse> getStoriesByAuthor(String authorId, Pageable pageable) {
        return storyRepository.findByAuthorId(authorId, pageable)
                .map(this::convertToResponse);
    }

    @Override
    public StoryResponse getStoryById(String id) {
        Story story = storyRepository.findByIdWithRelations(id)
                .orElseThrow(() -> new AppException("故事不存在", 404));
        return convertToResponse(story);
    }

    @Override
    @Transactional
    public StoryResponse createStory(StoryRequest request, String authorId) {
        User author = userRepository.findById(authorId)
                .orElseThrow(() -> new AppException("用户不存在", 404));

        Story story = new Story();
        story.setId(UUID.randomUUID().toString());
        story.setTitle(request.getTitle());
        story.setContent(request.getContent());
        story.setAuthorId(authorId);
        story.setHeritageId(request.getHeritageId());
        story.setImages(convertImagesToString(request.getImages()));
        story.setCreatedAt(LocalDateTime.now());
        story.setUpdatedAt(LocalDateTime.now());

        story = storyRepository.save(story);
        return convertToResponse(story);
    }

    @Override
    @Transactional
    public StoryResponse updateStory(String id, StoryRequest request) {
        Story story = storyRepository.findById(id)
                .orElseThrow(() -> new AppException("故事不存在", 404));

        story.setTitle(request.getTitle());
        story.setContent(request.getContent());
        story.setHeritageId(request.getHeritageId());
        story.setImages(convertImagesToString(request.getImages()));
        story.setUpdatedAt(LocalDateTime.now());

        story = storyRepository.save(story);
        return convertToResponse(story);
    }

    @Override
    @Transactional
    public void deleteStory(String id) {
        if (!storyRepository.existsById(id)) {
            throw new AppException("故事不存在", 404);
        }
        storyRepository.deleteById(id);
    }

    @Override
    @Transactional
    public void incrementViews(String id) {
        Story story = storyRepository.findById(id)
                .orElseThrow(() -> new AppException("故事不存在", 404));
        story.setViews(story.getViews() + 1);
        storyRepository.save(story);
    }

    @Override
    @Transactional
    public void toggleLike(String id, String userId) {
        Story story = storyRepository.findById(id)
                .orElseThrow(() -> new AppException("故事不存在", 404));

        if (storyLikeRepository.existsByStoryIdAndUserId(id, userId)) {
            // 取消点赞
            storyLikeRepository.deleteByStoryIdAndUserId(id, userId);
            story.setLikes(story.getLikes() - 1);
        } else {
            // 添加点赞
            StoryLike like = new StoryLike();
            like.setId(UUID.randomUUID().toString());
            like.setStoryId(id);
            like.setUserId(userId);
            like.setCreatedAt(LocalDateTime.now());
            storyLikeRepository.save(like);
            story.setLikes(story.getLikes() + 1);
        }
        storyRepository.save(story);
    }

    @Override
    @Transactional
    public void toggleFavorite(String id, String userId) {
        Story story = storyRepository.findById(id)
                .orElseThrow(() -> new AppException("故事不存在", 404));

        if (storyFavoriteRepository.existsByStoryIdAndUserId(id, userId)) {
            // 取消收藏
            storyFavoriteRepository.deleteByStoryIdAndUserId(id, userId);
        } else {
            // 添加收藏
            StoryFavorite favorite = new StoryFavorite();
            favorite.setId(UUID.randomUUID().toString());
            favorite.setStoryId(id);
            favorite.setUserId(userId);
            favorite.setCreatedAt(LocalDateTime.now());
            storyFavoriteRepository.save(favorite);
        }
    }

    @Override
    public Page<StoryResponse> getFavoritesByUser(String userId, Pageable pageable) {
        return storyFavoriteRepository.findByUserId(userId, pageable)
                .map(favorite -> convertToResponse(favorite.getStory()));
    }

    @Override
    public boolean isAuthor(String id, String userId) {
        Story story = storyRepository.findById(id)
                .orElseThrow(() -> new AppException("故事不存在", 404));
        return story.getAuthorId().equals(userId);
    }

    private StoryResponse convertToResponse(Story story) {
        StoryResponse response = new StoryResponse();
        response.setId(story.getId());
        response.setTitle(story.getTitle());
        response.setContent(story.getContent());
        response.setAuthorId(story.getAuthorId());
        response.setAuthorName(story.getAuthor() != null ? story.getAuthor().getUsername() : null);
        response.setHeritageId(story.getHeritageId());
        response.setHeritageName(story.getHeritage() != null ? story.getHeritage().getName() : null);
        response.setImages(convertStringToImages(story.getImages()));
        response.setViews(story.getViews());
        response.setLikes(story.getLikes());
        response.setCreatedAt(story.getCreatedAt());
        response.setUpdatedAt(story.getUpdatedAt());
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