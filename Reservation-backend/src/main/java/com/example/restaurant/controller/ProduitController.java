package com.example.restaurant.controller;

import com.example.restaurant.dto.ProduitDTO;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.restaurant.service.ProduitService;


@RestController
@RequestMapping("/api/produits")
public class ProduitController {

    @Autowired
    private ProduitService produitService;

    @PostMapping
    public ResponseEntity<ProduitDTO> ajouterProduit(@RequestBody @Valid ProduitDTO produitDTO) {
        ProduitDTO createdProduit = produitService.ajouterProduit(produitDTO);
        return ResponseEntity.ok(createdProduit);
    }

}