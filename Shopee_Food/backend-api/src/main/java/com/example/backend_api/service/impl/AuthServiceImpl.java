package com.example.backend_api.service.impl;

import com.example.backend_api.entity.User;
import com.example.backend_api.model.request.LoginRequest;
import com.example.backend_api.model.response.LoginResponse;
import com.example.backend_api.repository.UserRepository;
import com.example.backend_api.service.AuthService;

import com.example.backend_api.security.JwtUtil;
import com.example.backend_api.entity.Token;
import com.example.backend_api.model.enums.TokenType;
import com.example.backend_api.repository.TokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final TokenRepository tokenRepository;

    // Giải thích:
    // - UserRepository: truy vấn thông tin user từ database
    // - BCryptPasswordEncoder: kiểm tra mật khẩu đã mã hoá
    // - JwtUtil: sinh accessToken/refreshToken dạng JWT
    @Override
    public LoginResponse login(LoginRequest loginRequest) {
        User user = userRepository.findByUsername(loginRequest.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));
        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }
        String accessToken = jwtUtil.generateAccessToken(user.getUsername());
        String refreshToken = jwtUtil.generateRefreshToken(user.getUsername());

        // Lưu accessToken vào bảng tokens
        Token accessTokenEntity = Token.builder()
                .token(accessToken)
                .tokenType(TokenType.ACCESS)
                .user(user)
                .revoked(false)
                .issuedAt(new java.sql.Timestamp(System.currentTimeMillis()))
                .expiresAt(new java.sql.Timestamp(System.currentTimeMillis() + 1000 * 60 * 60)) // 1h
                .build();
        tokenRepository.save(accessTokenEntity);

        // Lưu refreshToken vào bảng tokens
        Token refreshTokenEntity = Token.builder()
                .token(refreshToken)
                .tokenType(TokenType.REFRESH)
                .user(user)
                .revoked(false)
                .issuedAt(new java.sql.Timestamp(System.currentTimeMillis()))
                .expiresAt(new java.sql.Timestamp(System.currentTimeMillis() + 1000 * 60 * 60 * 24 * 7)) // 7d
                .build();
        tokenRepository.save(refreshTokenEntity);

        return new LoginResponse(accessToken, refreshToken);
    }
}
