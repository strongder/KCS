package com.example.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.entity.Role;
import java.util.List;


public interface RoleRepository extends JpaRepository<Role, Long> {

	Role findByName(String name);
}
