package com.example.restaurant.model;

import java.time.LocalTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Configuration {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private LocalTime heureOuverture;
    private LocalTime heureFermeture;
    private int dureeCreneauMinutes; // ex: 30 min
    private int capaciteMaximale;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public LocalTime getHeureOuverture() {
		return heureOuverture;
	}
	public void setHeureOuverture(LocalTime heureOuverture) {
		this.heureOuverture = heureOuverture;
	}
	public LocalTime getHeureFermeture() {
		return heureFermeture;
	}
	public void setHeureFermeture(LocalTime heureFermeture) {
		this.heureFermeture = heureFermeture;
	}
	public int getDureeCreneauMinutes() {
		return dureeCreneauMinutes;
	}
	public void setDureeCreneauMinutes(int dureeCreneauMinutes) {
		this.dureeCreneauMinutes = dureeCreneauMinutes;
	}
	public int getCapaciteMaximale() {
		return capaciteMaximale;
	}
	public void setCapaciteMaximale(int capaciteMaximale) {
		this.capaciteMaximale = capaciteMaximale;
	}
    
}
