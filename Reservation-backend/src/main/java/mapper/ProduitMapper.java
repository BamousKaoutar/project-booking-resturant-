package mapper;

import dto.ProduitDTO;
import model.Categorie;
import model.Produit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import repository.CategorieRepository;

@Component
public class ProduitMapper {

    @Autowired
    private CategorieRepository categorieRepository;  // Repository pour la catégorie

    public Produit toEntity(ProduitDTO produitDTO) {
        Produit produit = new Produit();
        produit.setNom(produitDTO.getNom());
        produit.setDescription(produitDTO.getDescription());
        produit.setPrix(produitDTO.getPrix());
        produit.setPhoto(produitDTO.getPhoto());
        produit.setOrdre(produitDTO.getOrdre());

        // Récupérer la catégorie par son identifiant et l'associer au produit
        if (produitDTO.getCategorieId() != null) {
            Categorie categorie = categorieRepository.findById(produitDTO.getCategorieId())
                    .orElseThrow(() -> new RuntimeException("Catégorie non trouvée"));
            produit.setCategorie(categorie);
        }

        return produit;
    }

    public ProduitDTO toDTO(Produit produit) {
        ProduitDTO produitDTO = new ProduitDTO();
        produitDTO.setNom(produit.getNom());
        produitDTO.setDescription(produit.getDescription());
        produitDTO.setPrix(produit.getPrix());
        produitDTO.setPhoto(produit.getPhoto());
        produitDTO.setOrdre(produit.getOrdre());

        // Ajouter l'ID de la catégorie au DTO
        if (produit.getCategorie() != null) {
            produitDTO.setCategorieId(produit.getCategorie().getId());
        }

        return produitDTO;
    }
}
