package com.cultural.heritage.controller;

import com.cultural.heritage.dto.StoryRequest;
import com.cultural.heritage.dto.StoryResponse;
import com.cultural.heritage.service.StoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/stories")
@RequiredArgsConstructor
public class StoryController {

    private final StoryService storyService;

    @GetMapping
    public ResponseEntity<Page<StoryResponse>> getAllStories(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "DESC") String direction) {
        
        Sort.Direction sortDirection = Sort.Direction.fromString(direction);
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by(sortDirection, sortBy));
        
        return ResponseEntity.ok(storyService.getAllStories(pageRequest));
    }

    @GetMapping("/heritage/{heritageId}")
    public ResponseEntity<Page<StoryResponse>> getStoriesByHeritage(
            @PathVariable String heritageId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));
        return ResponseEntity.ok(storyService.getStoriesByHeritage(heritageId, pageRequest));
    }

    @GetMapping("/author/{authorId}")
    public ResponseEntity<Page<StoryResponse>> getStoriesByAuthor(
            @PathVariable String authorId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));
        return ResponseEntity.ok(storyService.getStoriesByAuthor(authorId, pageRequest));
    }

    @GetMapping("/favorites")
    public ResponseEntity<Page<StoryResponse>> getFavorites(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @AuthenticationPrincipal UserDetails userDetails) {
        
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));
        return ResponseEntity.ok(storyService.getFavoritesByUser(userDetails.getUsername(), pageRequest));
    }

    @GetMapping("/{id}")
    public ResponseEntity<StoryResponse> getStoryById(@PathVariable String id) {
        storyService.incrementViews(id);
        return ResponseEntity.ok(storyService.getStoryById(id));
    }

    @PostMapping
    public ResponseEntity<StoryResponse> createStory(
            @Valid @RequestBody StoryRequest request,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(storyService.createStory(request, userDetails.getUsername()));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or @storyService.isAuthor(#id, authentication.principal.username)")
    public ResponseEntity<StoryResponse> updateStory(
            @PathVariable String id,
            @Valid @RequestBody StoryRequest request) {
        return ResponseEntity.ok(storyService.updateStory(id, request));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or @storyService.isAuthor(#id, authentication.principal.username)")
    public ResponseEntity<Void> deleteStory(@PathVariable String id) {
        storyService.deleteStory(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{id}/like")
    public ResponseEntity<Void> toggleLike(
            @PathVariable String id,
            @AuthenticationPrincipal UserDetails userDetails) {
        storyService.toggleLike(id, userDetails.getUsername());
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{id}/favorite")
    public ResponseEntity<Void> toggleFavorite(
            @PathVariable String id,
            @AuthenticationPrincipal UserDetails userDetails) {
        storyService.toggleFavorite(id, userDetails.getUsername());
        return ResponseEntity.ok().build();
    }
} 