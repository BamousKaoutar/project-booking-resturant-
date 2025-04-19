package service;

import dto.CategorieDTO;
import jakarta.transaction.Transactional;
import mapper.CategorieMapper;
import model.Categorie;
import org.springframework.beans.factory.annotation.Autowired;
import repository.CategorieRepository;
import repository.ProduitRepository;

public class CategorieService {
    @Autowired
    private CategorieRepository categorieRepository;

    @Autowired
    private ProduitRepository produitRepository;

    @Transactional
    public CategorieDTO ajouterCategorieAvecProduits(CategorieDTO categorieDTO) {
        Categorie categorie = CategorieMapper.INSTANCE.categorieDTOToCategorie(categorieDTO);
        categorie = categorieRepository.save(categorie);
        return CategorieMapper.INSTANCE.categorieToCategorieDTO(categorie);
    }
}
