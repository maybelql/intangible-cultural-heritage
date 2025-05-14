package com.cultural.heritage.entity;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class User {
    private String id;
    private String name;
    private String email;
    private String password;
    private String role;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
} 