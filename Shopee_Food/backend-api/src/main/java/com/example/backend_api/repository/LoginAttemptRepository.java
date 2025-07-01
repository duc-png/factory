package com.example.backend_api.repository;

import com.example.backend_api.entity.LoginAttempt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface LoginAttemptRepository extends JpaRepository<LoginAttempt, Long> {
    
    @Query("SELECT l FROM LoginAttempt l WHERE l.email = :email AND l.success = false AND l.attemptAt > :since ORDER BY l.attemptAt DESC")
    List<LoginAttempt> findRecentFailedAttemptsByEmail(@Param("email") String email, @Param("since") LocalDateTime since);
    
    @Query("SELECT l FROM LoginAttempt l WHERE l.email = :email ORDER BY l.attemptAt DESC")
    List<LoginAttempt> findAllAttemptsByEmail(@Param("email") String email);
    
    @Query("SELECT l FROM LoginAttempt l WHERE l.ipAddress = :ipAddress AND l.success = false AND l.attemptAt > :since ORDER BY l.attemptAt DESC")
    List<LoginAttempt> findRecentFailedAttemptsByIp(@Param("ipAddress") String ipAddress, @Param("since") LocalDateTime since);
    
    @Query("DELETE FROM LoginAttempt l WHERE l.attemptAt < :cutoff")
    void deleteOldAttempts(@Param("cutoff") LocalDateTime cutoff);
}
