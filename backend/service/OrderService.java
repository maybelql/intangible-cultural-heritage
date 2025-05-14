package com.cultural.heritage.service;

import com.cultural.heritage.dto.OrderRequest;
import com.cultural.heritage.dto.OrderResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface OrderService {
    Page<OrderResponse> getAllOrders(String userId, Pageable pageable);
    OrderResponse getOrderById(String id);
    OrderResponse createOrder(OrderRequest request, String userId);
    OrderResponse updateOrderStatus(String id, String status);
} 