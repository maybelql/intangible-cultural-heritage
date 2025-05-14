package com.cultural.heritage.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;

@Data
public class HeritageItemRequest {
    @NotBlank(message = "名称不能为空")
    private String name;

    @NotBlank(message = "类别不能为空")
    private String category;

    @NotBlank(message = "省份不能为空")
    private String province;

    @NotBlank(message = "城市不能为空")
    private String city;

    @NotBlank(message = "描述不能为空")
    private String description;

    @NotBlank(message = "历史不能为空")
    private String history;

    @NotBlank(message = "技艺不能为空")
    private String technique;

    @NotBlank(message = "传承人不能为空")
    private String inheritor;

    @NotNull(message = "图片列表不能为空")
    private List<String> images;

    @NotBlank(message = "主图不能为空")
    private String heroImage;

    private String videoUrl;

    private List<String> relatedItemIds;
} 