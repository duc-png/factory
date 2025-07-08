package com.example.backend_api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.backend_api.repository.UserRepository;
import com.example.backend_api.repository.TokenRepository;
import com.example.backend_api.entity.User;
import com.example.backend_api.entity.Token;
import com.example.backend_api.model.enums.TokenType;
import java.sql.Timestamp;

@RestController
public class OAuth2Controller {
    @Autowired
    private OAuth2AuthorizedClientService authorizedClientService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TokenRepository tokenRepository;

    @GetMapping("/oauth2/success")
    public String oauth2Success(OAuth2AuthenticationToken authentication, @AuthenticationPrincipal OAuth2User principal) {
        OAuth2AuthorizedClient client = authorizedClientService
                .loadAuthorizedClient(
                        authentication.getAuthorizedClientRegistrationId(),
                        authentication.getName());
        String accessToken = client.getAccessToken().getTokenValue();
        String refreshToken = client.getRefreshToken() != null ? client.getRefreshToken().getTokenValue() : null;
        String email = principal.getAttribute("email");

        // Tìm hoặc tạo user theo email
        User user = userRepository.findByEmail(email).orElseGet(() -> {
            User newUser = new User();
            newUser.setEmail(email);
            newUser.setUsername(email);
            newUser.setPassword(""); // OAuth2 user không có password
            return userRepository.save(newUser);
        });

        // Lưu access token
        Token accessTk = Token.builder()
                .token(accessToken)
                .tokenType(TokenType.ACCESS)
                .issuedAt(new Timestamp(System.currentTimeMillis()))
                .expiresAt(new Timestamp(client.getAccessToken().getExpiresAt().toEpochMilli()))
                .revoked(false)
                .deviceInfo(authentication.getAuthorizedClientRegistrationId())
                .build();
        accessTk.setUser(user);
        tokenRepository.save(accessTk);

        // Lưu refresh token nếu có
        if (refreshToken != null) {
            Token refreshTk = Token.builder()
                    .token(refreshToken)
                    .tokenType(TokenType.REFRESH)
                    .issuedAt(new Timestamp(System.currentTimeMillis()))
                    .expiresAt(null)
                    .revoked(false)
                    .deviceInfo(authentication.getAuthorizedClientRegistrationId())
                    .build();
            refreshTk.setUser(user);
            tokenRepository.save(refreshTk);
        }

        return "OAuth2 login thành công! Email: " + email + ", AccessToken: " + accessToken;
    }
}
