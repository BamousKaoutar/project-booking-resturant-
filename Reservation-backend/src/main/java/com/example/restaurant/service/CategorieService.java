package com.example.restaurant.service;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;

import com.example.restaurant.dto.CategorieDTO;
import com.example.restaurant.mapper.CategorieMapper;
import com.example.restaurant.model.Categorie;
import com.example.restaurant.repository.CategorieRepository;
import com.example.restaurant.repository.ProduitRepository;

public class CategorieService {
    @Autowired
    private CategorieRepository categorieRepository;

    @Autowired
    private ProduitRepository produitRepository;

    @Transactional
    public CategorieDTO ajouterCategorieAvecProduits(CategorieDTO categorieDTO) {
        Categorie categorie = CategorieMapper.INSTANCE.categorieDTOToCategorie(categorieDTO);
        categorie = categorieRepository.save(categorie);
        return CategorieMapper.INSTANCE.categorieToCategorieDTO(categorie);
    }
}
