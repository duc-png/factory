package com.example.backend_api.repository;

import com.example.backend_api.entity.EmailVerificationToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Optional;

@Repository
public interface EmailVerificationTokenRepository extends JpaRepository<EmailVerificationToken, Long> {
    
    Optional<EmailVerificationToken> findByToken(String token);
    
    @Query("SELECT e FROM EmailVerificationToken e WHERE e.user.id = :userId AND e.createdAt > :since ORDER BY e.createdAt DESC")
    Optional<EmailVerificationToken> findRecentTokenByUser(@Param("userId") Long userId, @Param("since") LocalDateTime since);
    
    @Query("SELECT e FROM EmailVerificationToken e WHERE e.user.id = :userId AND e.expiresAt > :now AND e.verifiedAt IS NULL")
    Optional<EmailVerificationToken> findValidTokenByUserId(@Param("userId") Long userId, @Param("now") LocalDateTime now);
    
    @Query("DELETE FROM EmailVerificationToken e WHERE e.expiresAt < :now OR e.verifiedAt IS NOT NULL")
    void deleteExpiredAndUsedTokens(@Param("now") LocalDateTime now);
}
