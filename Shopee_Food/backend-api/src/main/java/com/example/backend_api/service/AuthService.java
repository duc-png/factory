package com.example.backend_api.service;

import com.example.backend_api.entity.User;
import com.example.backend_api.exception.AccountDisabledException;
import com.example.backend_api.exception.InvalidPasswordException;
import com.example.backend_api.exception.UserNotFoundException;
import com.example.backend_api.model.request.LoginRequest;
import com.example.backend_api.model.response.LoginResponse;
import com.example.backend_api.repository.UserRepository;
import com.example.backend_api.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@Transactional
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    public LoginResponse login(LoginRequest request) {
        // Find user by username or email
        User user = userRepository.findByUsernameOrEmail(request.getUsername())
                .orElseThrow(() -> new UserNotFoundException("User not found with identifier: " + request.getUsername()));

        // Check if account is active
        if (!user.getIsActive()) {
            throw new AccountDisabledException("Account is disabled");
        }

        // Check if account is locked - SỬA: sử dụng LocalDateTime
        if (user.getLockedUntil() != null && user.getLockedUntil().isAfter(LocalDateTime.now())) {
            throw new AccountDisabledException("Account is temporarily locked until: " + user.getLockedUntil());
        }

        // Verify password
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            handleFailedLogin(user);
            throw new InvalidPasswordException("Invalid password");
        }

        // Reset login attempts on successful login
        user.setLoginAttempts(0);
        user.setLockedUntil(null);
        user.setLastLogin(LocalDateTime.now());
        userRepository.save(user);

        // Generate tokens
        String accessToken = jwtUtil.generateAccessToken(user);
        String refreshToken = jwtUtil.generateRefreshToken(user);

        // Create user info
        LoginResponse.UserInfo userInfo = new LoginResponse.UserInfo(
                user.getUserID(),
                user.getUsername(),
                user.getEmail(),
                user.getFullName(),
                user.getRole()
        );

        return new LoginResponse(accessToken, refreshToken, "Bearer", 86400L, userInfo);
    }

    private void handleFailedLogin(User user) {
        int attempts = user.getLoginAttempts() + 1;
        user.setLoginAttempts(attempts);

        // Lock account after 5 failed attempts for 15 minutes
        if (attempts >= 5) {
            user.setLockedUntil(LocalDateTime.now().plusMinutes(15));
        }

        userRepository.save(user);
    }

    public boolean validateToken(String token, String username) {
        return jwtUtil.validateToken(token, username);
    }

    public String getUsernameFromToken(String token) {
        return jwtUtil.getUsernameFromToken(token);
    }
}