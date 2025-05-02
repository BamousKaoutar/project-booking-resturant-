package com.example.restaurant.service;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;

import com.example.restaurant.dto.ProduitDTO;
import com.example.restaurant.mapper.ProduitMapper;
import com.example.restaurant.model.Produit;
import com.example.restaurant.repository.CategorieRepository;
import com.example.restaurant.repository.ProduitRepository;

public class ProduitService {
    @Autowired
    private ProduitRepository produitRepository;

    @Autowired
    private CategorieRepository categorieRepository;

    @Transactional
    public ProduitDTO ajouterProduit(ProduitDTO produitDTO) {
        Produit produit = ProduitMapper.INSTANCE.produitDTOToProduit(produitDTO);
        produit = produitRepository.save(produit);
        return ProduitMapper.INSTANCE.produitToProduitDTO(produit);
    }
}
