package com.cultural.heritage.service;

import com.cultural.heritage.dto.LoginRequest;
import com.cultural.heritage.dto.RegisterRequest;
import com.cultural.heritage.dto.UserResponse;

import java.util.Map;

public interface AuthService {
    Map<String, Object> register(RegisterRequest request);
    Map<String, Object> login(LoginRequest request);
    UserResponse getProfile();
} 