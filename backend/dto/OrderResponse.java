package com.cultural.heritage.dto;

import com.cultural.heritage.entity.OrderStatus;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class OrderResponse {
    private String id;
    private String userId;
    private String userName;
    private BigDecimal totalAmount;
    private OrderStatus status;
    private String statusDescription;
    private String address;
    private String phone;
    private String receiverName;
    private List<OrderItemResponse> items;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
} 