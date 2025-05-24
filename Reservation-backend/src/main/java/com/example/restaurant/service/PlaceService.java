package com.example.restaurant.service;

import com.example.restaurant.dto.PlaceDTO;
import com.example.restaurant.mapper.PlaceMapper;
import com.example.restaurant.model.Place;
import com.example.restaurant.model.RestaurantTable;
import com.example.restaurant.repository.PlaceRepository;
import com.example.restaurant.repository.RestaurantTableRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlaceService {

    @Autowired
    private PlaceRepository placeRepository;

    @Autowired
    private RestaurantTableRepository restaurantTableRepository;

    // CREATE
    public PlaceDTO createPlace(PlaceDTO placeDTO) {
        Place place = PlaceMapper.toEntity(placeDTO);
        place.setLibelle(placeDTO.getLibelle());         // <-- Ajouté
        place.setDescription(placeDTO.getDescription()); // <-- Ajouté
        place = placeRepository.save(place);
        return PlaceMapper.toDTO(place);
    }

    // READ (single place by ID)
    public PlaceDTO getPlaceById(Long id) {
        Place place = placeRepository.findById(id).orElseThrow(() -> new RuntimeException("Place not found"));
        return PlaceMapper.toDTO(place);
    }

    // READ (all places)
    public List<PlaceDTO> getAllPlaces() {
        List<Place> places = placeRepository.findAll();
        return places.stream().map(PlaceMapper::toDTO).toList();
    }

    // UPDATE
    public PlaceDTO updatePlace(Long id, PlaceDTO placeDTO) {
        Place place = placeRepository.findById(id).orElseThrow(() -> new RuntimeException("Place not found"));
      //  place.setNumero(placeDTO.getNumero());
      //  place.setDisponible(placeDTO.isDisponible());
        place.setImageUrl(placeDTO.getImageUrl());

        place.setLibelle(placeDTO.getLibelle());         // <-- Ajouté
        place.setDescription(placeDTO.getDescription()); // <-- Ajouté



        place = placeRepository.save(place);
        return PlaceMapper.toDTO(place);
    }

    // DELETE
    public void deletePlace(Long id) {
        Place place = placeRepository.findById(id).orElseThrow(() -> new RuntimeException("Place not found"));
        placeRepository.delete(place);
    }
}
