package com.example.restaurant.mapper;

import com.example.restaurant.dto.ConfigurationDTO;
import com.example.restaurant.model.Configuration;
import org.modelmapper.ModelMapper;

public class ConfigurationMapper {
    private static final ModelMapper modelMapper = new ModelMapper();

    public static ConfigurationDTO toDTO(Configuration config) {
        return config != null ? modelMapper.map(config, ConfigurationDTO.class) : null;
    }

    public static Configuration toEntity(ConfigurationDTO configDTO) {
        return configDTO != null ? modelMapper.map(configDTO, Configuration.class) : null;
    }
}