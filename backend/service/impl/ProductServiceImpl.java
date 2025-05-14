package com.cultural.heritage.service.impl;

import com.cultural.heritage.dto.ProductRequest;
import com.cultural.heritage.dto.ProductResponse;
import com.cultural.heritage.entity.Product;
import com.cultural.heritage.exception.AppException;
import com.cultural.heritage.repository.ProductRepository;
import com.cultural.heritage.service.ProductService;
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
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final ObjectMapper objectMapper;

    @Override
    public Page<ProductResponse> getAllProducts(Pageable pageable) {
        return productRepository.findAllAvailable(pageable)
                .map(this::convertToResponse);
    }

    @Override
    public ProductResponse getProductById(String id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new AppException("商品不存在", 404));
        return convertToResponse(product);
    }

    @Override
    @Transactional
    public ProductResponse createProduct(ProductRequest request) {
        Product product = new Product();
        product.setId(UUID.randomUUID().toString());
        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setStock(request.getStock());
        product.setImages(convertImagesToString(request.getImages()));
        product.setCreatedAt(LocalDateTime.now());
        product.setUpdatedAt(LocalDateTime.now());

        product = productRepository.save(product);
        return convertToResponse(product);
    }

    @Override
    @Transactional
    public ProductResponse updateProduct(String id, ProductRequest request) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new AppException("商品不存在", 404));

        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setStock(request.getStock());
        product.setImages(convertImagesToString(request.getImages()));
        product.setUpdatedAt(LocalDateTime.now());

        product = productRepository.save(product);
        return convertToResponse(product);
    }

    @Override
    @Transactional
    public void deleteProduct(String id) {
        if (!productRepository.existsById(id)) {
            throw new AppException("商品不存在", 404);
        }
        productRepository.deleteById(id);
    }

    @Override
    @Transactional
    public void updateStock(String id, Integer quantity) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new AppException("商品不存在", 404));

        int newStock = product.getStock() - quantity;
        if (newStock < 0) {
            throw new AppException("商品库存不足", 400);
        }

        product.setStock(newStock);
        product.setUpdatedAt(LocalDateTime.now());
        productRepository.save(product);
    }

    private ProductResponse convertToResponse(Product product) {
        ProductResponse response = new ProductResponse();
        response.setId(product.getId());
        response.setName(product.getName());
        response.setDescription(product.getDescription());
        response.setPrice(product.getPrice());
        response.setStock(product.getStock());
        response.setImages(convertStringToImages(product.getImages()));
        response.setCreatedAt(product.getCreatedAt());
        response.setUpdatedAt(product.getUpdatedAt());
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