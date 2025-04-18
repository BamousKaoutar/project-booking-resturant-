package service;

import dto.ProduitDTO;
import jakarta.transaction.Transactional;
import mapper.ProduitMapper;
import model.Produit;
import org.springframework.beans.factory.annotation.Autowired;
import repository.CategorieRepository;
import repository.ProduitRepository;

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
