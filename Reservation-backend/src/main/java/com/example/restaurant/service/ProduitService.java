package com.example.restaurant.service;

import com.example.restaurant.dto.ProduitDTO;
import com.example.restaurant.mapper.ProduitMapper;
import com.example.restaurant.model.Categorie;
import com.example.restaurant.model.Produit;
import com.example.restaurant.repository.ProduitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProduitService {

    @Autowired
    private ProduitRepository produitRepository;

    @Autowired
    private CategorieService categorieService;

    public Produit createProduit(ProduitDTO produitDTO) {
        Categorie categorie = categorieService.getCategorieById(produitDTO.getCategorieId());
        if (categorie != null) {
            Produit produit = ProduitMapper.toEntity(produitDTO);
            produit.setCategorie(categorie);
            return produitRepository.save(produit);
        }
        return null;
    }

    public Produit updateProduit(Long id, Produit produitDetails) {
        Produit produit = produitRepository.findById(id).orElseThrow(() -> new RuntimeException("Produit non trouvé"));
        produit.setNom(produitDetails.getNom());
        produit.setDescription(produitDetails.getDescription());
        produit.setPrix(produitDetails.getPrix());
        produit.setOrdre(produitDetails.getOrdre());
        produit.setCategorie(produitDetails.getCategorie());
        return produitRepository.save(produit);
    }

    public void deleteProduit(Long id) {
        Produit produit = produitRepository.findById(id).orElseThrow(() -> new RuntimeException("Produit non trouvé"));
        produitRepository.delete(produit);
    }
}