package com.example.restaurant.controller;

import com.example.restaurant.dto.RestaurantTableDTO;
import com.example.restaurant.service.RestaurantTableService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/restaurant-tables")
public class RestaurantTableController {

    @Autowired
    private RestaurantTableService restaurantTableService;

    // CREATE
    @PostMapping
    public RestaurantTableDTO createRestaurantTable(@RequestBody RestaurantTableDTO restaurantTableDTO) {
        return restaurantTableService.createRestaurantTable(restaurantTableDTO);
    }

    // READ (single table by ID)
    @GetMapping("/{id}")
    public RestaurantTableDTO getRestaurantTableById(@PathVariable Long id) {
        return restaurantTableService.getRestaurantTableById(id);
    }

    // READ (all tables)
    @GetMapping
    public List<RestaurantTableDTO> getAllRestaurantTables() {
        return restaurantTableService.getAllRestaurantTables();
    }

    // UPDATE
    @PutMapping("/{id}")
    public RestaurantTableDTO updateRestaurantTable(@PathVariable Long id, @RequestBody RestaurantTableDTO restaurantTableDTO) {
        return restaurantTableService.updateRestaurantTable(id, restaurantTableDTO);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public void deleteRestaurantTable(@PathVariable Long id) {
        restaurantTableService.deleteRestaurantTable(id);
    }
}
