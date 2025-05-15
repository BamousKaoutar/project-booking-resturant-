package com.example.restaurant.dto;

import java.time.LocalTime;

public class ConfigurationDTO {
    private Long id;
    private LocalTime heureOuverture;
    private LocalTime heureFermeture;
    private int dureeCreneauMinutes;

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
}