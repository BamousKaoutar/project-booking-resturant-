package com.example.restaurant.service;

import com.example.restaurant.dto.ReservationDTO;
import com.example.restaurant.model.Reservation;
import com.example.restaurant.model.RestaurantTable;
import com.example.restaurant.repository.ReservationRepository;
import com.example.restaurant.repository.RestaurantTableRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ReservationService {

    private final ReservationRepository reservationRepository;
    private final RestaurantTableRepository restaurantTableRepository;

    public ReservationService(ReservationRepository reservationRepository, RestaurantTableRepository restaurantTableRepository) {
        this.reservationRepository = reservationRepository;
        this.restaurantTableRepository = restaurantTableRepository;
    }

    public List<ReservationDTO> findAll() {
        for (Reservation el : reservationRepository.findAll()) {
            System.out.println("ststus : "+el.getStatut());
        }
        return reservationRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public ReservationDTO findById(Long id) {
        return reservationRepository.findById(id)
                .map(this::convertToDTO)
                .orElse(null);
    }

    public ReservationDTO save(ReservationDTO dto) {
        Reservation reservation = convertToEntity(dto);
        Reservation saved = reservationRepository.save(reservation);
        return convertToDTO(saved);
    }

    public void delete(Long id) {
        reservationRepository.deleteById(id);
    }

    // === Mappers ===
    private ReservationDTO convertToDTO(Reservation entity) {
        ReservationDTO dto = new ReservationDTO();
        dto.setId(entity.getId());
        dto.setDate(entity.getDate());
        dto.setHeureDebut(entity.getHeureDebut());
        dto.setNombrePersonnes(entity.getNombrePersonnes());
        dto.setNom(entity.getNom());
        dto.setEmail(entity.getEmail());
        dto.setPhone(entity.getPhone());
        dto.setStatut(entity.getStatut());
        dto.setTableId(entity.getTable() != null ? entity.getTable().getId() : null);
        return dto;
    }

    private Reservation convertToEntity(ReservationDTO dto) {
        Reservation entity = new Reservation();
        entity.setId(dto.getId());
        entity.setDate(dto.getDate());
        entity.setHeureDebut(dto.getHeureDebut());
        entity.setNombrePersonnes(dto.getNombrePersonnes());
        entity.setNom(dto.getNom());
        entity.setEmail(dto.getEmail());
        entity.setStatut(dto.getStatut());
        entity.setPhone(dto.getPhone());

        if (dto.getTableId() != null) {
            Optional<RestaurantTable> tableOpt = restaurantTableRepository.findById(dto.getTableId());
            tableOpt.ifPresent(entity::setTable);
        }

        return entity;
    }
}
