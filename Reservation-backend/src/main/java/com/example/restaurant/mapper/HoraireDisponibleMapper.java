package com.example.restaurant.mapper;

import com.example.restaurant.dto.HoraireDisponibleDTO;
import com.example.restaurant.model.HoraireDisponible;
import org.modelmapper.ModelMapper;

public class HoraireDisponibleMapper {
    private static final ModelMapper modelMapper = new ModelMapper();

    public static HoraireDisponibleDTO toDTO(HoraireDisponible horaire) {
        return horaire != null ? modelMapper.map(horaire, HoraireDisponibleDTO.class) : null;
    }

    public static HoraireDisponible toEntity(HoraireDisponibleDTO horaireDTO) {
        return horaireDTO != null ? modelMapper.map(horaireDTO, HoraireDisponible.class) : null;
    }
}