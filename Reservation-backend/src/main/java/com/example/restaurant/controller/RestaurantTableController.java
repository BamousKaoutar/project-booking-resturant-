package com.example.restaurant.controller;

import com.example.restaurant.dto.RestaurantTableDTO;
import com.example.restaurant.mapper.RestaurantTableMapper;
import com.example.restaurant.model.RestaurantTable;
import com.example.restaurant.repository.RestaurantTableRepository;
import com.example.restaurant.service.RestaurantTableService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/restaurant-tables")
public class RestaurantTableController {

    @Autowired
    private RestaurantTableService restaurantTableService;

    @Autowired
    private RestaurantTableRepository restaurantTableRepository ;

    // CREATE
    @PostMapping
    public RestaurantTableDTO createRestaurantTable(@RequestBody RestaurantTableDTO restaurantTableDTO) {
        return restaurantTableService.createRestaurantTable(restaurantTableDTO);
    }

    @PatchMapping("/{id}/toggle-availability")
    public ResponseEntity<RestaurantTableDTO> toggleAvailability(@PathVariable Long id) {
        Optional<RestaurantTable> optionalTable = restaurantTableRepository.findById(id);
        
        if (optionalTable.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        RestaurantTable table = optionalTable.get();
        table.setDisponible(!Boolean.TRUE.equals(table.isDisponible())); // inverse la dispo
        RestaurantTable updatedTable = restaurantTableRepository.save(table);
        return ResponseEntity.ok(RestaurantTableMapper.toDTO(updatedTable));
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
