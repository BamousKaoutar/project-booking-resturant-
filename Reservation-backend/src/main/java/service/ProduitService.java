package service;

import dto.ProduitDTO;
import jakarta.transaction.Transactional;
import mapper.ProduitMapper;
import model.Categorie;
import model.Produit;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import repository.CategorieRepository;
import repository.ProduitRepository;



@Service
public class ProduitService {
    @Autowired
    private ProduitRepository produitRepository;

    @Autowired
    private ProduitMapper produitMapper;

    public ProduitDTO creerProduit(ProduitDTO produitDTO) {
        // Convertir le DTO en entité Produit
        Produit produit = produitMapper.toEntity(produitDTO);

        // Sauvegarder le produit dans la base de données
        Produit savedProduit = produitRepository.save(produit);

        // Retourner le DTO du produit sauvegardé
        return produitMapper.toDTO(savedProduit);
    }
}