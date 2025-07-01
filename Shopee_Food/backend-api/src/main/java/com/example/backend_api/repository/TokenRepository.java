package com.example.backend_api.repository;

import com.example.backend_api.entity.Token;
import com.example.backend_api.entity.User;
import com.example.backend_api.model.enums.TokenType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

/**
 * Repository để thao tác với Token trong database
 */
@Repository
public interface TokenRepository extends JpaRepository<Token, Integer> {
    
    /**
     * Tìm token theo token string
     */
    Optional<Token> findByToken(String token);
    
    /**
     * Tìm token chưa bị revoke
     */
    Optional<Token> findByTokenAndRevokedFalse(String token);
    
    /**
     * Tìm tất cả tokens của user chưa bị revoke
     */
    List<Token> findByUserAndRevokedFalse(User user);
    
    /**
     * Tìm tokens theo user và type
     */
    List<Token> findByUserAndTokenType(User user, TokenType tokenType);
    
    /**
     * Tìm tokens hết hạn chưa bị revoke
     */
    List<Token> findByExpiresAtBeforeAndRevokedFalse(Timestamp timestamp);
    
    /**
     * Đếm số tokens active của user
     */
    long countByUserAndRevokedFalse(User user);
}
