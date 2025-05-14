package com.cultural.heritage.controller;

import com.cultural.heritage.dto.HeritageRequest;
import com.cultural.heritage.dto.HeritageResponse;
import com.cultural.heritage.service.HeritageService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/heritage")
@RequiredArgsConstructor
public class HeritageController {

    private final HeritageService heritageService;

    @GetMapping
    public ResponseEntity<Page<HeritageResponse>> getAllHeritage(
            @RequestParam(required = false) String categoryId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "DESC") String direction) {
        
        Sort.Direction sortDirection = Sort.Direction.fromString(direction);
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by(sortDirection, sortBy));
        
        return ResponseEntity.ok(heritageService.getAllHeritage(categoryId, pageRequest));
    }

    @GetMapping("/{id}")
    public ResponseEntity<HeritageResponse> getHeritageById(@PathVariable String id) {
        return ResponseEntity.ok(heritageService.getHeritageById(id));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<HeritageResponse> createHeritage(@Valid @RequestBody HeritageRequest request) {
        return ResponseEntity.ok(heritageService.createHeritage(request));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<HeritageResponse> updateHeritage(
            @PathVariable String id,
            @Valid @RequestBody HeritageRequest request) {
        return ResponseEntity.ok(heritageService.updateHeritage(id, request));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteHeritage(@PathVariable String id) {
        heritageService.deleteHeritage(id);
        return ResponseEntity.ok().build();
    }
} 