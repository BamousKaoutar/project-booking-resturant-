package dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ProduitDTO {
    private Long id;
    private String nom;
    private String description;
    private double prix;
    private int ordre;  // Ordre du produit dans la catégorie
    private Long categorieId;
}
