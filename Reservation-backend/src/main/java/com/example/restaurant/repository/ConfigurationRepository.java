package com.example.restaurant.repository;

import com.example.restaurant.model.Configuration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ConfigurationRepository extends JpaRepository<Configuration, Long> {
    @Query("SELECT c FROM Configuration c ORDER BY c.id DESC LIMIT 1")
    Configuration findCurrentConfiguration();
}
