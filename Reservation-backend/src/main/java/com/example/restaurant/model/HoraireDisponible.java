package com.example.restaurant.model;

import java.time.LocalDate;
import java.time.LocalTime;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class HoraireDisponible {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    private RestaurantTable table;
    
    private LocalDate date;
    private LocalTime heureDebut;
    private LocalTime heureFin;
    private boolean estDisponible;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public RestaurantTable getTable() {
		return table;
	}
	public void setTable(RestaurantTable table) {
		this.table = table;
	}
	public LocalDate getDate() {
		return date;
	}
	public void setDate(LocalDate date) {
		this.date = date;
	}
	public LocalTime getHeureDebut() {
		return heureDebut;
	}
	public void setHeureDebut(LocalTime heureDebut) {
		this.heureDebut = heureDebut;
	}
	public LocalTime getHeureFin() {
		return heureFin;
	}
	public void setHeureFin(LocalTime heureFin) {
		this.heureFin = heureFin;
	}
	public boolean isEstDisponible() {
		return estDisponible;
	}
	public void setEstDisponible(boolean estDisponible) {
		this.estDisponible = estDisponible;
	}
    
}
