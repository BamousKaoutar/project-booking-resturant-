package com.example.restaurant.mapper;

import com.example.restaurant.dto.ClientDTO;
import com.example.restaurant.model.Client;
import org.modelmapper.ModelMapper;

public class ClientMapper {
    private static final ModelMapper modelMapper = new ModelMapper();

    public static ClientDTO toDTO(Client client) {
        return client != null ? modelMapper.map(client, ClientDTO.class) : null;
    }

    public static Client toEntity(ClientDTO clientDTO) {
        return clientDTO != null ? modelMapper.map(clientDTO, Client.class) : null;
    }
}
