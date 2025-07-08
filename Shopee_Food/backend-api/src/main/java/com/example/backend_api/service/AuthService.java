package com.example.backend_api.service;

import com.example.backend_api.model.request.LoginRequest;
import com.example.backend_api.model.response.LoginResponse;

public interface AuthService {
    LoginResponse login(LoginRequest loginRequest);
}
