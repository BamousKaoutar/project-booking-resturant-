package com.example.restaurant.service;
/*
import com.example.restaurant.model.Place;
import com.example.restaurant.repository.PlaceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PlaceService {

    @Autowired
    private PlaceRepository placeRepository;

    public List<Place> getAllPlaces() {
        return placeRepository.findAll();
    }

    public Optional<Place> getPlaceById(Long id) {
        return placeRepository.findById(id);
    }

    public Place createPlace(Place place) {
        return placeRepository.save(place);
    }

    public Place updatePlace(Long id, Place placeDetails) {
        Place place = placeRepository.findById(id).orElseThrow();
        place.setNumero(placeDetails.getNumero());
        place.setDisponible(placeDetails.isDisponible());
        return placeRepository.save(place);
    }

    public void deletePlace(Long id) {
        placeRepository.deleteById(id);
    }
}
*/