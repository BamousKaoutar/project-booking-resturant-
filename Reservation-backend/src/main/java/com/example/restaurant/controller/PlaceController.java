package com.example.restaurant.controller;

import com.example.restaurant.dto.PlaceDTO;
import com.example.restaurant.service.PlaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/places")
public class PlaceController {

    @Autowired
    private PlaceService placeService;

    // CREATE
    @PostMapping
    public PlaceDTO createPlace(@RequestBody PlaceDTO placeDTO) {
        return placeService.createPlace(placeDTO);
    }

    // READ (single place)
    @GetMapping("/{id}")
    public PlaceDTO getPlaceById(@PathVariable Long id) {
        return placeService.getPlaceById(id);
    }

    // READ (all places)
    @GetMapping
    public List<PlaceDTO> getAllPlaces() {
        return placeService.getAllPlaces();
    }

    // UPDATE
    @PutMapping("/{id}")
    public PlaceDTO updatePlace(@PathVariable Long id, @RequestBody PlaceDTO placeDTO) {
        return placeService.updatePlace(id, placeDTO);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public void deletePlace(@PathVariable Long id) {
        placeService.deletePlace(id);
    }
}
