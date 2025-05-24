package com.example.restaurant.repository;

import com.example.restaurant.model.HoraireDisponible;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.time.LocalDate;
import java.util.List;

public interface HoraireDisponibleRepository extends JpaRepository<HoraireDisponible, Long> {

    // Créneaux disponibles par date
    @Query("SELECT h FROM HoraireDisponible h WHERE " +
           "h.date = :date AND h.estDisponible = true " +
           "ORDER BY h.heureDebut")
    List<HoraireDisponible> findAvailableSlots(@Param("date") LocalDate date);

    // Créneaux disponibles pour une table spécifique
    @Query("SELECT h FROM HoraireDisponible h WHERE " +
           "h.table.id = :tableId AND " +
           "h.date = :date AND " +
           "h.estDisponible = true")
    List<HoraireDisponible> findAvailableSlotsForTable(
        @Param("tableId") Long tableId,
        @Param("date") LocalDate date);
}