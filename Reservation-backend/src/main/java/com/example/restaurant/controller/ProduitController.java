package com.example.restaurant.controller;

import com.example.restaurant.dto.ProduitDTO;


import com.example.restaurant.model.Produit;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import com.example.restaurant.service.ProduitService;

import java.util.List;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/produits")
@Validated
public class ProduitController {

    @Autowired
    private ProduitService produitService;

    @GetMapping
    public ResponseEntity<List<Produit>> getAllProduits() {
        List<Produit> produits = produitService.getAllProduits();
        return ResponseEntity.ok(produits);
    }
    @GetMapping("/{id}")
    public ResponseEntity<Produit> getProduitById(@PathVariable Long id) {
        Produit produit = produitService.getProduitById(id);
        return ResponseEntity.ok(produit);
    }

    @GetMapping("/nom/{nom}")
    public ResponseEntity<Produit> getProduitByNom(@PathVariable String nom) {
        Produit produit = produitService.getProduitByNom(nom);
        return ResponseEntity.ok(produit);
    }

    @GetMapping("/par-categorie")
    public ResponseEntity<List<Produit>> getProduitsParCategorie(@RequestParam String nomCategorie) {
        List<Produit> produits = produitService.getProduitsByNomCategorie(nomCategorie);
        if (produits.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(produits);
    }

     @GetMapping("/list")
    public ResponseEntity<List<ProduitDTO>> getAllProduitsList() {
        List<Produit> produits = produitService.getAllProduits();

        // Mapper les entités Produit vers des DTO
        List<ProduitDTO> produitsDto = produits.stream()
            .map(produit -> new ProduitDTO(
                produit.getId(),
                produit.getNom(),
                produit.getDescription(),
                produit.getPrix(),
                produit.getCategorie().getId() // ou autre champ pertinent
            ))
            .collect(Collectors.toList());

        return ResponseEntity.ok(produitsDto);
    }

    @PostMapping("/create")
    public ResponseEntity<Produit> createProduit(@RequestBody @Valid ProduitDTO produitDTO) {
        Produit produit = produitService.createProduit(produitDTO);
        return ResponseEntity.ok(produit);
    }
    @PutMapping("/{id}")
    public ResponseEntity<Produit> updateProduit(@PathVariable Long id, @RequestBody Produit produitDetails) {
        Produit updatedProduit = produitService.updateProduit(id, produitDetails);
        return ResponseEntity.ok(updatedProduit);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduit(@PathVariable Long id) {
        produitService.deleteProduit(id);
        return ResponseEntity.noContent().build();
    }


   

}