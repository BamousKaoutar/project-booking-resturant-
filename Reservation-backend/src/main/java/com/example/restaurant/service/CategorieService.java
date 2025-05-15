package com.example.restaurant.service;

import com.example.restaurant.model.Categorie;
import com.example.restaurant.repository.CategorieRepository;
import com.example.restaurant.repository.ProduitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategorieService {

    @Autowired
    private CategorieRepository categorieRepository;

    @Autowired
    private ProduitRepository produitRepository;

    public List<Categorie> getAllCategories() {
        return categorieRepository.findAll();
    }

    public Categorie getCategorieById(Long id) {
        return categorieRepository.findById(id).orElse(null); // Return Categorie or null if not found
    }

    public Categorie getCategorieByNom(String nom) {
        return categorieRepository.findByNom(nom).stream().findFirst().orElse(null);
    }

    public Categorie createCategorie(Categorie categorie) {
        return categorieRepository.save(categorie);
    }
    public Categorie updateCategorie(Long id, Categorie categorieDetails) {
        Categorie categorie = categorieRepository.findById(id).orElseThrow(() -> new RuntimeException("Categorie non trouvée"));
        categorie.setNom(categorieDetails.getNom());
        categorie.setDescription(categorieDetails.getDescription());
        categorie.setOrdre(categorieDetails.getOrdre());
        return categorieRepository.save(categorie);
    }

    public void deleteCategorie(Long id) {

        Categorie categorie = categorieRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Categorie non trouvée"));

        // si la catégorie contient des produits
        if (!produitRepository.findByCategorieId(id).isEmpty()) {
            throw new RuntimeException("Impossible de supprimer la catégorie : elle contient des produits.");
        }

        // si elle ne contient pas de produits
        categorieRepository.delete(categorie);
    }

}