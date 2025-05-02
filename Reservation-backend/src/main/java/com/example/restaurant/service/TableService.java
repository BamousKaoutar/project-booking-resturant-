package com.example.restaurant.service;

import com.example.restaurant.model.Table;
import com.example.restaurant.repository.TableRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TableService {

    @Autowired
    private TableRepository tableRepository;

    public List<Table> getAllTables() {
        return tableRepository.findAll();
    }

    public Optional<Table> getTableById(Long id) {
        return tableRepository.findById(id);
    }

    public Table createTable(Table table) {
        return tableRepository.save(table);
    }

    public Table updateTable(Long id, Table tableDetails) {
        Table table = tableRepository.findById(id).orElseThrow();
        table.setNom(tableDetails.getNom());
        table.setCapacite(tableDetails.getCapacite());
        return tableRepository.save(table);
    }

    public void deleteTable(Long id) {
        tableRepository.deleteById(id);
    }
}
