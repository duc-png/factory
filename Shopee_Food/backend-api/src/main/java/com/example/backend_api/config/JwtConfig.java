package com.example.backend_api.config;

import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

import javax.crypto.SecretKey;
import java.util.Base64;

@Configuration
public class JwtConfig {
    
    @Value("${jwt.secret}")
    private String secret;
    
    @Value("${jwt.expiration:86400}") // 24 hours default
    private Long expiration;
    
    @Value("${jwt.refresh-expiration:604800}") // 7 days default
    private Long refreshExpiration;
    
    public SecretKey getSecretKey() {
        byte[] keyBytes = Base64.getDecoder().decode(secret);
        return Keys.hmacShaKeyFor(keyBytes);
    }
    
    public Long getExpiration() {
        return expiration;
    }
    
    public Long getRefreshExpiration() {
        return refreshExpiration;
    }
}