package com.example.restaurant.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class CategorieDTO {
    private Long id;
    private String nom;
    private String description;
    private Integer ordre;
    private List<ProduitDTO> produits;
}
