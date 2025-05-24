package com.example.restaurant.mapper;

import com.example.restaurant.dto.ProduitDTO;
import com.example.restaurant.model.Produit;
import org.modelmapper.ModelMapper;

public class ProduitMapper {

    private static final ModelMapper modelMapper = new ModelMapper();

    public static ProduitDTO toDTO(Produit produit) {
        return modelMapper.map(produit, ProduitDTO.class);
    }

    public static Produit toEntity(ProduitDTO produitDTO) {
        return modelMapper.map(produitDTO, Produit.class);
    }
}