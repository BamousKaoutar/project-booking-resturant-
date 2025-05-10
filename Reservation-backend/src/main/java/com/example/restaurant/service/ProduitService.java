package com.example.restaurant.service;

import com.example.restaurant.dto.ProduitDTO;
import com.example.restaurant.mapper.ProduitMapper;
import com.example.restaurant.model.Categorie;
import com.example.restaurant.model.Produit;
import com.example.restaurant.repository.CategorieRepository;
import com.example.restaurant.repository.ProduitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProduitService {

    @Autowired
    private ProduitRepository produitRepository;

    @Autowired
    private CategorieRepository categorieRepository;

    @Autowired
    private CategorieService categorieService;

    public List<Produit> getAllProduits() {
        return produitRepository.findAll();
    }

    public Produit getProduitById(Long id) {
        return produitRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Produit non trouvé avec ID: " + id));
    }

    public Produit getProduitByNom(String nom) {
        return produitRepository.findByNom(nom)
                .orElseThrow(() -> new RuntimeException("Produit non trouvé avec le nom: " + nom));
    }
    public List<Produit> getProduitsByNomCategorie(String nomCategorie) {
        return produitRepository.findByCategorieNom(nomCategorie);
    }

    public Produit createProduit(ProduitDTO produitDTO) {

        if (produitDTO.getCategorieId() == null) {
            throw new IllegalArgumentException("L'ID de la catégorie est requis");
        }


        Categorie categorie = categorieService.getCategorieById(produitDTO.getCategorieId());


        if (categorie == null) {
            throw new RuntimeException("Categorie non trouvée avec l'ID: " + produitDTO.getCategorieId());
        }


        Produit produit = ProduitMapper.toEntity(produitDTO);


        produit.setCategorie(categorie);


        return produitRepository.save(produit);
    }


    public Produit updateProduit(Long id, Produit produitDetails) {

        Produit produit = produitRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Produit non trouvé avec l'id : " + id));


        produit.setNom(produitDetails.getNom());
        produit.setDescription(produitDetails.getDescription());
        produit.setPrix(produitDetails.getPrix());
        produit.setOrdre(produitDetails.getOrdre());


        if (produitDetails.getCategorie() != null && produitDetails.getCategorie().getId() != null) {
            Long categorieId = produitDetails.getCategorie().getId();


            Categorie categorie = categorieRepository.findById(categorieId)
                    .orElseThrow(() -> new RuntimeException("Catégorie non trouvée avec l'id : " + categorieId));

            produit.setCategorie(categorie);
        } else {

            produit.setCategorie(null);
        }

        return produitRepository.save(produit);
    }


    public void deleteProduit(Long id) {
        Produit produit = produitRepository.findById(id).orElseThrow(() -> new RuntimeException("Produit non trouvé"));
        produitRepository.delete(produit);
    }
}