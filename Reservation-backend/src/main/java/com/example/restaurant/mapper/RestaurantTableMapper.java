package com.example.restaurant.mapper;

import com.example.restaurant.dto.RestaurantTableDTO;
import com.example.restaurant.model.RestaurantTable;
import org.modelmapper.ModelMapper;

public class RestaurantTableMapper {

    private static final ModelMapper modelMapper = new ModelMapper();

    public static RestaurantTableDTO toDTO(RestaurantTable restaurantTable) {
        return modelMapper.map(restaurantTable, RestaurantTableDTO.class);
    }

    public static RestaurantTable toEntity(RestaurantTableDTO restaurantTableDTO) {
        return modelMapper.map(restaurantTableDTO, RestaurantTable.class);
    }
}
