package com.cultural.heritage.service.impl;

import com.cultural.heritage.dto.OrderItemRequest;
import com.cultural.heritage.dto.OrderItemResponse;
import com.cultural.heritage.dto.OrderRequest;
import com.cultural.heritage.dto.OrderResponse;
import com.cultural.heritage.entity.Order;
import com.cultural.heritage.entity.OrderItem;
import com.cultural.heritage.entity.OrderStatus;
import com.cultural.heritage.entity.Product;
import com.cultural.heritage.entity.User;
import com.cultural.heritage.exception.AppException;
import com.cultural.heritage.repository.OrderRepository;
import com.cultural.heritage.repository.ProductRepository;
import com.cultural.heritage.repository.UserRepository;
import com.cultural.heritage.service.OrderService;
import com.cultural.heritage.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final ProductService productService;

    @Override
    public Page<OrderResponse> getAllOrders(String userId, Pageable pageable) {
        Page<Order> orderPage;
        if (userId != null && !userId.isEmpty()) {
            orderPage = orderRepository.findByUserId(userId, pageable);
        } else {
            orderPage = orderRepository.findAllWithUser(pageable);
        }
        return orderPage.map(this::convertToResponse);
    }

    @Override
    public OrderResponse getOrderById(String id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new AppException("订单不存在", 404));
        return convertToResponse(order);
    }

    @Override
    @Transactional
    public OrderResponse createOrder(OrderRequest request, String userId) {
        // 验证用户是否存在
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new AppException("用户不存在", 404));

        // 获取商品信息并锁定库存
        List<String> productIds = request.getItems().stream()
                .map(OrderItemRequest::getProductId)
                .collect(Collectors.toList());
        List<Product> products = productRepository.findAllByIdForUpdate(productIds);

        // 验证商品是否存在
        if (products.size() != productIds.size()) {
            throw new AppException("部分商品不存在", 404);
        }

        // 创建订单
        Order order = new Order();
        order.setId(UUID.randomUUID().toString());
        order.setUserId(userId);
        order.setStatus(OrderStatus.PENDING);
        order.setAddress(request.getAddress());
        order.setPhone(request.getPhone());
        order.setReceiverName(request.getReceiverName());
        order.setCreatedAt(LocalDateTime.now());
        order.setUpdatedAt(LocalDateTime.now());

        // 创建订单项
        List<OrderItem> orderItems = new ArrayList<>();
        BigDecimal totalAmount = BigDecimal.ZERO;

        Map<String, Product> productMap = products.stream()
                .collect(Collectors.toMap(Product::getId, p -> p));

        for (OrderItemRequest itemRequest : request.getItems()) {
            Product product = productMap.get(itemRequest.getProductId());
            int quantity = itemRequest.getQuantity();

            // 验证库存
            if (product.getStock() < quantity) {
                throw new AppException("商品" + product.getName() + "库存不足", 400);
            }

            // 创建订单项
            OrderItem orderItem = new OrderItem();
            orderItem.setId(UUID.randomUUID().toString());
            orderItem.setOrderId(order.getId());
            orderItem.setProductId(product.getId());
            orderItem.setQuantity(quantity);
            orderItem.setPrice(product.getPrice());
            orderItem.setSubtotal(product.getPrice().multiply(BigDecimal.valueOf(quantity)));
            orderItems.add(orderItem);

            // 更新库存
            productService.updateStock(product.getId(), quantity);

            // 累加总金额
            totalAmount = totalAmount.add(orderItem.getSubtotal());
        }

        order.setTotalAmount(totalAmount);
        order.setItems(orderItems);
        order = orderRepository.save(order);

        return convertToResponse(order);
    }

    @Override
    @Transactional
    public OrderResponse updateOrderStatus(String id, String status) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new AppException("订单不存在", 404));

        try {
            OrderStatus newStatus = OrderStatus.valueOf(status.toUpperCase());
            order.setStatus(newStatus);
            order.setUpdatedAt(LocalDateTime.now());
            order = orderRepository.save(order);
            return convertToResponse(order);
        } catch (IllegalArgumentException e) {
            throw new AppException("无效的订单状态", 400);
        }
    }

    private OrderResponse convertToResponse(Order order) {
        OrderResponse response = new OrderResponse();
        response.setId(order.getId());
        response.setUserId(order.getUserId());
        response.setUserName(order.getUser() != null ? order.getUser().getUsername() : null);
        response.setTotalAmount(order.getTotalAmount());
        response.setStatus(order.getStatus());
        response.setStatusDescription(order.getStatus().getDescription());
        response.setAddress(order.getAddress());
        response.setPhone(order.getPhone());
        response.setReceiverName(order.getReceiverName());
        response.setItems(order.getItems().stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList()));
        response.setCreatedAt(order.getCreatedAt());
        response.setUpdatedAt(order.getUpdatedAt());
        return response;
    }

    private OrderItemResponse convertToResponse(OrderItem orderItem) {
        OrderItemResponse response = new OrderItemResponse();
        response.setId(orderItem.getId());
        response.setProductId(orderItem.getProductId());
        response.setProductName(orderItem.getProduct() != null ? orderItem.getProduct().getName() : null);
        response.setQuantity(orderItem.getQuantity());
        response.setPrice(orderItem.getPrice());
        response.setSubtotal(orderItem.getSubtotal());
        return response;
    }
} 