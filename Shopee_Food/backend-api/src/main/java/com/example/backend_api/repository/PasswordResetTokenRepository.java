package com.example.backend_api.repository;

import com.example.backend_api.entity.PasswordResetToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Optional;

@Repository
public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Long> {
    
    Optional<PasswordResetToken> findByToken(String token);
    
    @Query("SELECT p FROM PasswordResetToken p WHERE p.user.id = :userId AND p.expiresAt > :now AND p.usedAt IS NULL")
    Optional<PasswordResetToken> findValidTokenByUserId(@Param("userId") Long userId, @Param("now") LocalDateTime now);
    
    @Query("DELETE FROM PasswordResetToken p WHERE p.expiresAt < :now OR p.usedAt IS NOT NULL")
    void deleteExpiredAndUsedTokens(@Param("now") LocalDateTime now);
}
