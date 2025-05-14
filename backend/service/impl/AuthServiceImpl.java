package com.cultural.heritage.service.impl;

import com.cultural.heritage.dto.LoginRequest;
import com.cultural.heritage.dto.RegisterRequest;
import com.cultural.heritage.dto.UserResponse;
import com.cultural.heritage.entity.User;
import com.cultural.heritage.exception.AppException;
import com.cultural.heritage.repository.UserRepository;
import com.cultural.heritage.security.JwtTokenProvider;
import com.cultural.heritage.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final AuthenticationManager authenticationManager;

    @Override
    public Map<String, Object> register(RegisterRequest request) {
        // 检查邮箱是否已存在
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new AppException("该邮箱已被注册", 400);
        }

        // 创建新用户
        User user = new User();
        user.setId(UUID.randomUUID().toString());
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole("USER");

        userRepository.save(user);

        // 生成token
        String token = jwtTokenProvider.generateToken(user);

        Map<String, Object> response = new HashMap<>();
        response.put("user", convertToUserResponse(user));
        response.put("token", token);

        return response;
    }

    @Override
    public Map<String, Object> login(LoginRequest request) {
        // 验证用户
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        // 获取用户信息
        User user = userRepository.findByEmail(request.getEmail())
            .orElseThrow(() -> new AppException("用户不存在", 404));

        // 生成token
        String token = jwtTokenProvider.generateToken(user);

        Map<String, Object> response = new HashMap<>();
        response.put("user", convertToUserResponse(user));
        response.put("token", token);

        return response;
    }

    @Override
    public UserResponse getProfile() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new AppException("用户不存在", 404));
        return convertToUserResponse(user);
    }

    private UserResponse convertToUserResponse(User user) {
        UserResponse response = new UserResponse();
        response.setId(user.getId());
        response.setName(user.getName());
        response.setEmail(user.getEmail());
        response.setRole(user.getRole());
        return response;
    }
} 