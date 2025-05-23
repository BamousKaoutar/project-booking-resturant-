package com.example.restaurant.controller;

import com.example.restaurant.model.Categorie;
import com.example.restaurant.service.CategorieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categories")
public class CategorieController {

    @Autowired
    private CategorieService categorieService;

    @GetMapping
    public List<Categorie> getAllCategories() {
        return categorieService.getAllCategories();
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<Categorie> getCategorieById(@PathVariable Long id) {
        Categorie categorie = categorieService.getCategorieById(id);
        if (categorie != null) {
            return ResponseEntity.ok(categorie);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/nom/{nom}")
    public ResponseEntity<Categorie> getCategorieByNom(@PathVariable String nom) {
        Categorie categorie = categorieService.getCategorieByNom(nom);
        if (categorie != null) {
            return ResponseEntity.ok(categorie);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @PostMapping("/create")
    public Categorie createCategorie(@RequestBody Categorie categorie) {
        return categorieService.createCategorie(categorie);
    }
    @PutMapping("/{id}")
    public ResponseEntity<Categorie> updateCategorie(@PathVariable Long id, @RequestBody Categorie categorieDetails) {
        Categorie updatedCategorie = categorieService.updateCategorie(id, categorieDetails);
        return ResponseEntity.ok(updatedCategorie);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCategorie(@PathVariable Long id) {
        categorieService.deleteCategorie(id);
        return ResponseEntity.noContent().build();
    }
}