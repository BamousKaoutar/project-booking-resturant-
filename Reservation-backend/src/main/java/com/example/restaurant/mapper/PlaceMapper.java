package com.example.restaurant.mapper;

import com.example.restaurant.dto.PlaceDTO;
import com.example.restaurant.model.Place;
import com.example.restaurant.model.RestaurantTable;
import org.modelmapper.ModelMapper;

import java.util.List;
import java.util.stream.Collectors;

public class PlaceMapper {

    private static final ModelMapper modelMapper = new ModelMapper();

    public static PlaceDTO toDTO(Place place) {
        PlaceDTO placeDTO = modelMapper.map(place, PlaceDTO.class);

        

        return placeDTO;
    }

    public static Place toEntity(PlaceDTO placeDTO) {
        Place place = modelMapper.map(placeDTO, Place.class);


        return place;
    }
}
