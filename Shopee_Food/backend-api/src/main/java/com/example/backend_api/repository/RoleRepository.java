package com.example.backend_api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<RoleRepository, Integer> {
    Optional<RoleRepository> findByRoleName(String roleName);
}
