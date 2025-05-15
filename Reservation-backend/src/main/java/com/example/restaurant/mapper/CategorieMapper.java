package com.example.restaurant.mapper;


import com.example.restaurant.dto.CategorieDTO;
import com.example.restaurant.model.Categorie;
import org.modelmapper.ModelMapper;


public class CategorieMapper {

    private static final ModelMapper modelMapper = new ModelMapper();

    public static CategorieDTO toDTO(Categorie categorie) {
        return modelMapper.map(categorie, CategorieDTO.class);
    }

    public static Categorie toEntity(CategorieDTO categorieDTO) {
        return modelMapper.map(categorieDTO, Categorie.class);
    }
}