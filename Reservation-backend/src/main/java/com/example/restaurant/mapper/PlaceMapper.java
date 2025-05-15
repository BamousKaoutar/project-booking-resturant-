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

        // Récupère les IDs des tables liées à la place
        if (place.getTables() != null) {
            placeDTO.setTableIds(place.getTables().stream()
                    .map(RestaurantTable::getId)
                    .collect(Collectors.toList()));
        }

        return placeDTO;
    }

    public static Place toEntity(PlaceDTO placeDTO) {
        Place place = modelMapper.map(placeDTO, Place.class);

        // Si le DTO contient des IDs de tables, les associer à la place
        if (placeDTO.getTableIds() != null && !placeDTO.getTableIds().isEmpty()) {
            List<RestaurantTable> tables = placeDTO.getTableIds().stream()
                    .map(tableId -> {
                        RestaurantTable table = new RestaurantTable();
                        table.setId(tableId);  // Associe l'ID de la table
                        return table;
                    })
                    .collect(Collectors.toList());
            place.setTables(tables);  // Associe les tables à la place
        }

        return place;
    }
}
