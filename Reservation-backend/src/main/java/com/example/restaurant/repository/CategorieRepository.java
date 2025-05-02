package com.example.restaurant.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.restaurant.model.Categorie;

public interface CategorieRepository extends JpaRepository<Categorie, Long> {
}
