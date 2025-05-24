package com.example.restaurant.controller;

import com.example.restaurant.dto.ReservationDTO;
import com.example.restaurant.dto.RestaurantTableDTO;
import com.example.restaurant.mapper.ReservationMapper;
import com.example.restaurant.mapper.RestaurantTableMapper;
import com.example.restaurant.model.Reservation;
import com.example.restaurant.model.RestaurantTable;
import com.example.restaurant.repository.ReservationRepository;
import com.example.restaurant.service.ReservationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/reservations")
public class ReservationController {

    private final ReservationService reservationService;
    private final ReservationRepository reservationRepository;

    public ReservationController(ReservationService reservationService, ReservationRepository reservationRepository) {
        this.reservationService = reservationService;
        this.reservationRepository = reservationRepository;
    }

    @GetMapping
    public ResponseEntity<List<ReservationDTO>> getAllReservations() {
        return ResponseEntity.ok(reservationService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ReservationDTO> getReservationById(@PathVariable Long id) {
        ReservationDTO reservation = reservationService.findById(id);
        if (reservation != null) {
            return ResponseEntity.ok(reservation);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


     @PatchMapping("/{id}/{status}")
    public ResponseEntity<ReservationDTO> toggleAvailability(@PathVariable Long id,@PathVariable String status) {
        Optional<Reservation> reservOptional = reservationRepository.findById(id);
        
        if (reservOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Reservation reservation = reservOptional.get();
        reservation.setStatut(status); // inverse la dispo
        Reservation updatedReservation = reservationRepository.save(reservation);
        return ResponseEntity.ok(ReservationMapper.toDTO(updatedReservation));
    }

    @PostMapping
    public ResponseEntity<ReservationDTO> createReservation(@RequestBody ReservationDTO reservationDTO) {
        System.out.println(reservationDTO.getStatut());
        ReservationDTO savedReservation = reservationService.save(reservationDTO);
        return ResponseEntity.ok(savedReservation);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReservation(@PathVariable Long id) {
        reservationService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
