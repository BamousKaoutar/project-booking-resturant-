package com.example.restaurant.service;

import com.example.restaurant.dto.RestaurantTableDTO;
import com.example.restaurant.mapper.RestaurantTableMapper;
import com.example.restaurant.model.Place;
import com.example.restaurant.model.RestaurantTable;
import com.example.restaurant.repository.PlaceRepository;
import com.example.restaurant.repository.RestaurantTableRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RestaurantTableService {

    @Autowired
    private RestaurantTableRepository restaurantTableRepository;

    @Autowired
    private PlaceRepository placeRepository;

    // CREATE
    public RestaurantTableDTO createRestaurantTable(RestaurantTableDTO restaurantTableDTO) {
        RestaurantTable restaurantTable = RestaurantTableMapper.toEntity(restaurantTableDTO);

        if (restaurantTableDTO.getPlaceId() != null) {
            Place place = placeRepository.findById(restaurantTableDTO.getPlaceId())
                    .orElseThrow(() -> new RuntimeException("Place introuvable avec id " + restaurantTableDTO.getPlaceId()));
            restaurantTable.setPlace(place);
        }

        restaurantTable = restaurantTableRepository.save(restaurantTable);
        return RestaurantTableMapper.toDTO(restaurantTable);
    }

    // READ (single table by ID)
    public RestaurantTableDTO getRestaurantTableById(Long id) {
        RestaurantTable restaurantTable = restaurantTableRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("RestaurantTable not found"));
        return RestaurantTableMapper.toDTO(restaurantTable);
    }

    // READ (all tables)
    public List<RestaurantTableDTO> getAllRestaurantTables() {
        List<RestaurantTable> restaurantTables = restaurantTableRepository.findAll();
        return restaurantTables.stream().map(RestaurantTableMapper::toDTO).collect(Collectors.toList());
    }

    // UPDATE
    public RestaurantTableDTO updateRestaurantTable(Long id, RestaurantTableDTO restaurantTableDTO) {
        RestaurantTable restaurantTable = restaurantTableRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("RestaurantTable not found"));

        restaurantTable.setNom(restaurantTableDTO.getNom());
        restaurantTable.setCapacite(restaurantTableDTO.getCapacite());

        if (restaurantTableDTO.getPlaceId() != null) {
            Place place = placeRepository.findById(restaurantTableDTO.getPlaceId())
                    .orElseThrow(() -> new RuntimeException("Place introuvable avec id " + restaurantTableDTO.getPlaceId()));
            restaurantTable.setPlace(place);
        }

        restaurantTable = restaurantTableRepository.save(restaurantTable);
        return RestaurantTableMapper.toDTO(restaurantTable);
    }

    // DELETE
    public void deleteRestaurantTable(Long id) {
        RestaurantTable restaurantTable = restaurantTableRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("RestaurantTable not found"));
        restaurantTableRepository.delete(restaurantTable);
    }
}
