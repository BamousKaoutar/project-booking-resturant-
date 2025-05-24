package com.example.restaurant.repository;

import com.example.restaurant.model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    // Trouver les réservations par date
    List<Reservation> findByDate(LocalDate date);

    // Vérifier les conflits de réservation
 /*    @Query("SELECT COUNT(r) > 0 FROM Reservation r WHERE " +
           "r.table.id = :tableId AND " +
           "r.date = :date AND " +
           "((r.heureDebut <= :debut AND r.heureFin > :debut) OR " +
           "(r.heureDebut < :fin AND r.heureFin >= :fin) OR " +
           "(r.heureDebut >= :debut AND r.heureFin <= :fin))")
    boolean existsConflictingReservation(
        @Param("tableId") Long tableId,
        @Param("date") LocalDate date,
        @Param("debut") LocalTime debut,
        @Param("fin") LocalTime fin);

    // Réservations futures d'un client
    @Query("SELECT r FROM Reservation r WHERE " +
           "r.client.id = :clientId AND " +
           "(r.date > CURRENT_DATE OR (r.date = CURRENT_DATE AND r.heureFin > CURRENT_TIME))")
    List<Reservation> findUpcomingByClient(@Param("clientId") Long clientId); */
}