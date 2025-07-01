package com.example.backend_api.model.enums;

public enum AuthProvider {
    LOCAL("Local Authentication"),
    GOOGLE("Google OAuth2"),
    FACEBOOK("Facebook OAuth2"),
    GITHUB("GitHub OAuth2");

    private final String description;

    AuthProvider(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }

    public static AuthProvider fromString(String provider) {
        if (provider == null) return LOCAL;
        
        try {
            return AuthProvider.valueOf(provider.toUpperCase());
        } catch (IllegalArgumentException e) {
            return LOCAL;
        }
    }
}
