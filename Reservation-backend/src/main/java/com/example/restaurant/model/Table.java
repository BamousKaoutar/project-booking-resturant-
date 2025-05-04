package com.example.restaurant.model;

import java.util.List;



import lombok.*;
import jakarta.persistence.*;


@Entity
@Data
public class Table {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nom;  // Nom de la table
    private int capacite; // Capacité de la table

    @OneToMany(mappedBy = "table")
    private List<Place> places;

    // Getter et Setter pour nom
    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    // Getter et Setter pour capacite
    public int getCapacite() {
        return capacite;
    }

    public void setCapacite(int capacite) {
        this.capacite = capacite;
    }
}
