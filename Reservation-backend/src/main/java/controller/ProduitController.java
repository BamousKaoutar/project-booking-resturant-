package controller;

import dto.ProduitDTO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import service.ProduitService;

//@Controller
@RestController
//@RequestMapping("/api/menu")
public class ProduitController {

    @Autowired
    private ProduitService produitService;

    @PostMapping("/produits")
    public ResponseEntity<ProduitDTO> ajouterProduit(@RequestBody ProduitDTO produitDTO) {

        ProduitDTO createdProduit = produitService.creerProduit(produitDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdProduit);
    }
    @GetMapping("/test")
    public ResponseEntity<String> test() {
        return ResponseEntity.ok("API fonctionne");
    }

}