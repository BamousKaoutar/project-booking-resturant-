package com.example.restaurant.mapper;

import com.example.restaurant.dto.RestaurantTableDTO;
import com.example.restaurant.model.Reservation;
import com.example.restaurant.model.RestaurantTable;
import org.modelmapper.ModelMapper;

public class RestaurantTableMapper {

    private static final ModelMapper modelMapper = new ModelMapper();

    public static RestaurantTableDTO toDTO(RestaurantTable updatedTable) {
        return modelMapper.map(updatedTable, RestaurantTableDTO.class);
    }

    public static RestaurantTable toEntity(RestaurantTableDTO restaurantTableDTO) {
        return modelMapper.map(restaurantTableDTO, RestaurantTable.class);
    }

  
}
