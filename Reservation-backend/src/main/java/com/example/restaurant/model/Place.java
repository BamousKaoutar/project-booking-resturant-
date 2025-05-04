package com.example.restaurant.model;

import jakarta.persistence.*;


@Entity
public class Place {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int numero;

    private boolean disponible;

    @ManyToOne
    @JoinColumn(name = "table_id")
    private Table table;

    // Getter pour numero
    public int getNumero() {
        return numero;
    }

    // Setter pour numero
    public void setNumero(int numero) {
        this.numero = numero;
    }

    // Getter pour disponible
    public boolean isDisponible() {
        return disponible;
    }

    // Setter pour disponible
    public void setDisponible(boolean disponible) {
        this.disponible = disponible;
    }
}
