package com.example.restaurant.repository;

import com.example.restaurant.model.Produit;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProduitRepository extends JpaRepository<Produit, Long> {

    Optional<Produit> findByNom(String nom);
    List<Produit> findByCategorieName(String nomCategorie);
    List<Produit> findByCategorieId(Long categorieId);



}
