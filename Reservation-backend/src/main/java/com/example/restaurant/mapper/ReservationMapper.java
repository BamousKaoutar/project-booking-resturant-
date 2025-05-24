package com.example.restaurant.mapper;

import com.example.restaurant.dto.ReservationDTO;
import com.example.restaurant.model.Reservation;
import org.modelmapper.ModelMapper;

public class ReservationMapper {
    private static final ModelMapper modelMapper = new ModelMapper();

    public static ReservationDTO toDTO(Reservation reservation) {
        System.out.println("statut  :  "+reservation.getStatut());
        return reservation != null ? modelMapper.map(reservation, ReservationDTO.class) : null;
    }

    public static Reservation toEntity(ReservationDTO reservationDTO) {
        return reservationDTO != null ? modelMapper.map(reservationDTO, Reservation.class) : null;
    }
}