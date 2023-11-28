package com.example.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.entity.Resources;

public interface ResourcesRepository extends JpaRepository<Resources, Long> {

}
