package com.example.restaurant.repository;

import com.example.restaurant.model.RestaurantTable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.time.LocalDateTime;
import java.util.List;

public interface RestaurantTableRepository extends JpaRepository<RestaurantTable, Long> {

    // Trouver les tables par capacité minimale
    List<RestaurantTable> findByCapaciteGreaterThanEqual(int capaciteMin);

    // Vérifier la disponibilité d'une table pour un créneau spécifique
/*     @Query("SELECT t FROM RestaurantTable t WHERE t.id = :tableId AND t.disponible = true " +
           "AND NOT EXISTS (" +
           "  SELECT r FROM Reservation r WHERE r.table.id = :tableId " +
           "  AND r.date = CAST(:debut AS date) " +
           "  AND r.heureDebut < :fin " +
           "  AND r.heureFin > :debut" +
           ")")
    List<RestaurantTable> checkTableAvailability(
        @Param("tableId") Long tableId,
        @Param("debut") LocalDateTime debut,
        @Param("fin") LocalDateTime fin);  */
}