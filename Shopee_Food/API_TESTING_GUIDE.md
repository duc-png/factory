# 🔧 Shopee Food API Testing Guide

## 📋 Mục lục

1. [Cài đặt và Setup](#cài-đặt-và-setup)
2. [Authentication Testing](#authentication-testing)
3. [OAuth2 Testing](#oauth2-testing)
4. [Frontend Integration](#frontend-integration)
5. [Common Issues & Solutions](#common-issues--solutions)

---

## 🚀 Cài đặt và Setup

### 1. Clone và Build Project

```bash
# Clone repository
git clone https://github.com/your-repo/shopee-food.git
cd shopee-food/backend-api

# Build project
mvn clean install

# Run application
mvn spring-boot:run
```

### 2. Database Setup

```sql
-- Tạo database
CREATE DATABASE shopee_food CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE shopee_food;

-- Insert default roles
INSERT INTO roles (name, description, created_at) VALUES 
('USER', 'Regular user role', NOW()),
('SHOP_OWNER', 'Shop owner role', NOW()),
('ADMIN', 'Administrator role', NOW());
```

### 3. Application Configuration

Tạo file `application-local.properties`:

```properties
# Local development settings
spring.datasource.url=jdbc:mysql://localhost:3306/shopee_food
spring.datasource.username=root
spring.datasource.password=your_password

# JWT settings
app.jwt.secret=mySecretKey123456789012345678901234567890123456789012345678901234567890
app.jwt.access-token-expiration=86400000
app.jwt.refresh-token-expiration=604800000

# Email settings (for testing)
spring.mail.username=your-test-email@gmail.com
spring.mail.password=your-app-password

# OAuth2 settings (for testing)
spring.security.oauth2.client.registration.google.client-id=test-google-client-id
spring.security.oauth2.client.registration.google.client-secret=test-google-client-secret
```

---

## 🔐 Authentication Testing

### 1. Register New User

**Request:**
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Test User",
    "email": "test@example.com",
    "password": "Password123",
    "confirmPassword": "Password123",
    "phoneNumber": "+84123456789",
    "address": "123 Test Street, Ho Chi Minh City"
  }'
```

**Expected Response:**
```json
{
  "message": "Đăng ký thành công! Vui lòng kiểm tra email để xác thực tài khoản.",
  "data": 1
}
```

### 2. Verify Email (Skip for Testing)

Để test nhanh, bạn có thể update database trực tiếp:

```sql
UPDATE users SET email_verified = true WHERE email = 'test@example.com';
```

### 3. Login

**Request:**
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Password123",
    "rememberMe": false
  }'
```

**Expected Response:**
```json
{
  "accessToken": "eyJhbGciOiJIUzUxMiJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoidGVzdEBleGFtcGxlLmNvbSIsImZ1bGxOYW1lIjoiVGVzdCBVc2VyIiwicm9sZXMiOlsiVVNFUiJdLCJzdWIiOiJ0ZXN0QGV4YW1wbGUuY29tIiwiaWF0IjoxNzAzOTgwODAwLCJleHAiOjE3MDQwNjcyMDB9...",
  "refreshToken": "eyJhbGciOiJIUzUxMiJ9.eyJ1c2VySWQiOjEsInRva2VuVHlwZSI6InJlZnJlc2giLCJzdWIiOiJ0ZXN0QGV4YW1wbGUuY29tIiwiaWF0IjoxNzAzOTgwODAwLCJleHAiOjE3MDQ1ODU2MDB9...",
  "tokenType": "Bearer",
  "expiresIn": 86400,
  "user": {
    "id": 1,
    "email": "test@example.com",
    "fullName": "Test User",
    "phoneNumber": "+84123456789",
    "avatar": null,
    "emailVerified": true,
    "isActive": true,
    "roles": ["USER"],
    "createdAt": "2025-01-01T00:00:00",
    "lastLoginAt": "2025-01-01T12:00:00"
  }
}
```

### 4. Test Protected Endpoint

```bash
# Lưu access token từ response login
ACCESS_TOKEN="your-access-token-here"

# Test protected endpoint
curl -X GET http://localhost:8080/api/auth/validate-token \
  -H "Authorization: Bearer $ACCESS_TOKEN"
```

### 5. Refresh Token

```bash
# Lưu refresh token từ response login
REFRESH_TOKEN="your-refresh-token-here"

curl -X POST http://localhost:8080/api/auth/refresh-token \
  -H "Content-Type: application/json" \
  -d "{\"refreshToken\": \"$REFRESH_TOKEN\"}"
```

### 6. Forgot Password

```bash
curl -X POST http://localhost:8080/api/auth/forgot-password \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com"
  }'
```

### 7. Logout

```bash
curl -X POST http://localhost:8080/api/auth/logout \
  -H "Authorization: Bearer $ACCESS_TOKEN"
```

---

## 🌐 OAuth2 Testing

### 1. Test OAuth2 Authorization URLs

#### Google Login
```bash
# Mở trong browser
http://localhost:8080/oauth2/authorize/google?redirect_uri=http://localhost:3000/oauth2/redirect
```

#### Facebook Login
```bash
# Mở trong browser  
http://localhost:8080/oauth2/authorize/facebook?redirect_uri=http://localhost:3000/oauth2/redirect
```

#### GitHub Login
```bash
# Mở trong browser
http://localhost:8080/oauth2/authorize/github?redirect_uri=http://localhost:3000/oauth2/redirect
```

### 2. OAuth2 Setup cho Testing

#### Google OAuth2 Setup

1. Truy cập [Google Cloud Console](https://console.cloud.google.com/)
2. Tạo project mới: "Shopee Food Test"
3. Enable APIs: Google+ API
4. Tạo OAuth 2.0 Client ID:
   - Application type: Web application
   - Name: Shopee Food Local Test
   - Authorized redirect URIs:
     ```
     http://localhost:8080/login/oauth2/code/google
     ```
5. Copy Client ID và Client Secret vào `application.properties`

#### Facebook OAuth2 Setup

1. Truy cập [Facebook Developers](https://developers.facebook.com/)
2. Tạo app mới: "Shopee Food Test"
3. Add Facebook Login product
4. Settings > Basic:
   - Add platform: Website
   - Site URL: `http://localhost:8080`
5. Facebook Login > Settings:
   - Valid OAuth Redirect URIs:
     ```
     http://localhost:8080/login/oauth2/code/facebook
     ```
6. Copy App ID và App Secret

---

## 💻 Frontend Integration

### 1. React Login Component

```javascript
// LoginPage.jsx
import React, { useState } from 'react';
import axios from 'axios';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', formData);
      const { accessToken, refreshToken, user } = response.data;
      
      // Lưu tokens
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('user', JSON.stringify(user));
      
      // Redirect đến dashboard
      window.location.href = '/dashboard';
      
    } catch (error) {
      console.error('Login failed:', error.response?.data);
      alert(error.response?.data?.message || 'Đăng nhập thất bại');
    }
  };

  const handleOAuth2Login = (provider) => {
    window.location.href = `http://localhost:8080/oauth2/authorize/${provider}?redirect_uri=http://localhost:3000/oauth2/redirect`;
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({...formData, password: e.target.value})}
          required
        />
        <label>
          <input
            type="checkbox"
            checked={formData.rememberMe}
            onChange={(e) => setFormData({...formData, rememberMe: e.target.checked})}
          />
          Remember me
        </label>
        <button type="submit">Đăng nhập</button>
      </form>
      
      <div className="oauth2-buttons">
        <button onClick={() => handleOAuth2Login('google')}>
          Đăng nhập với Google
        </button>
        <button onClick={() => handleOAuth2Login('facebook')}>
          Đăng nhập với Facebook
        </button>
        <button onClick={() => handleOAuth2Login('github')}>
          Đăng nhập với GitHub
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
```

### 2. OAuth2 Redirect Handler

```javascript
// OAuth2RedirectHandler.jsx
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const OAuth2RedirectHandler = () => {
  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const token = urlParams.get('token');
    const refreshToken = urlParams.get('refreshToken');
    const error = urlParams.get('error');

    if (token) {
      // Lưu tokens
      localStorage.setItem('accessToken', token);
      localStorage.setItem('refreshToken', refreshToken);
      
      // Lấy thông tin user
      fetchUserInfo(token);
      
    } else if (error) {
      console.error('OAuth2 Error:', error);
      alert('Đăng nhập thất bại: ' + error);
      window.location.href = '/login';
    }
  }, [location]);

  const fetchUserInfo = async (token) => {
    try {
      const response = await axios.get('http://localhost:8080/api/auth/validate-token', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      localStorage.setItem('user', JSON.stringify(response.data.data));
      window.location.href = '/dashboard';
      
    } catch (error) {
      console.error('Failed to fetch user info:', error);
      window.location.href = '/login';
    }
  };

  return (
    <div>
      <p>Đang xử lý đăng nhập...</p>
    </div>
  );
};

export default OAuth2RedirectHandler;
```

### 3. Axios Interceptor cho JWT

```javascript
// axiosConfig.js
import axios from 'axios';

// Request interceptor để thêm JWT token
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor để handle token expiry
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const response = await axios.post('http://localhost:8080/api/auth/refresh-token', {
          refreshToken: refreshToken
        });

        const { accessToken } = response.data;
        localStorage.setItem('accessToken', accessToken);

        // Retry original request
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axios(originalRequest);

      } catch (refreshError) {
        // Refresh token expired, redirect to login
        localStorage.clear();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axios;
```

---

## 🐛 Common Issues & Solutions

### 1. JWT Token Issues

#### Problem: "Token không hợp lệ"
```bash
# Debug JWT token
curl -X GET http://localhost:8080/api/auth/validate-token \
  -H "Authorization: Bearer your-token" \
  -v
```

**Solutions:**
- Kiểm tra JWT secret trong `application.properties`
- Verify token chưa expired
- Đảm bảo format: `Bearer token`

#### Problem: "Token đã hết hạn"
**Solution:** Sử dụng refresh token để lấy access token mới

### 2. OAuth2 Issues

#### Problem: "Redirect URI mismatch"
**Solutions:**
- Kiểm tra redirect URI trong OAuth2 provider settings
- Đảm bảo URL match chính xác (http vs https, port numbers)
- Format: `http://localhost:8080/login/oauth2/code/google`

#### Problem: "OAuth2 callback error"
**Solutions:**
- Enable debug logging:
  ```properties
  logging.level.org.springframework.security.oauth2=TRACE
  ```
- Kiểm tra client ID và client secret
- Verify scopes requested

### 3. Email Issues

#### Problem: "Không gửi được email"
**Solutions:**
- Kiểm tra Gmail app password
- Enable 2FA cho Gmail account
- Verify SMTP settings:
  ```properties
  spring.mail.host=smtp.gmail.com
  spring.mail.port=587
  spring.mail.properties.mail.smtp.auth=true
  spring.mail.properties.mail.smtp.starttls.enable=true
  ```

### 4. Database Issues

#### Problem: "Connection refused"
**Solutions:**
- Kiểm tra MySQL service đang chạy
- Verify database credentials
- Check database exists:
  ```sql
  SHOW DATABASES;
  USE shopee_food;
  SHOW TABLES;
  ```

#### Problem: "Foreign key constraint fails"
**Solutions:**
- Đảm bảo roles table có data:
  ```sql
  INSERT INTO roles (name, description, created_at) VALUES 
  ('USER', 'Regular user role', NOW());
  ```

### 5. CORS Issues

#### Problem: "CORS policy blocked"
**Solutions:**
- Kiểm tra allowed origins trong `SecurityConfig.java`
- Thêm frontend URL vào CORS configuration
- Verify preflight OPTIONS requests

### 6. Rate Limiting Issues

#### Problem: "Too many login attempts"
**Solutions:**
- Wait 15 minutes cho rate limit reset
- Clear login attempts từ database:
  ```sql
  DELETE FROM login_attempts WHERE email = 'test@example.com';
  ```

---

## 🧪 Testing Checklist

### ✅ Basic Authentication
- [ ] User registration works
- [ ] Email verification works  
- [ ] Login with email/password works
- [ ] JWT tokens are generated
- [ ] Protected endpoints require authentication
- [ ] Logout invalidates tokens
- [ ] Refresh token flow works

### ✅ OAuth2 Integration
- [ ] Google OAuth2 login works
- [ ] Facebook OAuth2 login works  
- [ ] GitHub OAuth2 login works
- [ ] OAuth2 callbacks handle success
- [ ] OAuth2 callbacks handle errors
- [ ] User info extracted correctly

### ✅ Security Features
- [ ] Rate limiting prevents brute force
- [ ] Email verification required
- [ ] Password reset flow works
- [ ] Account lockout works
- [ ] Role-based access control works
- [ ] CORS properly configured

### ✅ Error Handling
- [ ] Invalid credentials return proper error
- [ ] Expired tokens return 401
- [ ] Missing tokens return 401
- [ ] Rate limit returns 429
- [ ] Server errors return 500

---

## 📊 Performance Testing

### Load Testing với curl

```bash
#!/bin/bash
# load_test.sh

echo "Starting load test..."

for i in {1..100}; do
  curl -X POST http://localhost:8080/api/auth/login \
    -H "Content-Type: application/json" \
    -d '{
      "email": "test@example.com",
      "password": "Password123"
    }' \
    -w "Time: %{time_total}s, Status: %{http_code}\n" \
    -o /dev/null \
    -s &
done

wait
echo "Load test completed!"
```

### Database Performance

```sql
-- Check login attempts performance
EXPLAIN SELECT * FROM login_attempts 
WHERE email = 'test@example.com' 
AND attempt_at > DATE_SUB(NOW(), INTERVAL 15 MINUTE);

-- Add index if needed
CREATE INDEX idx_login_attempts_email_time ON login_attempts(email, attempt_at);

-- Check token queries performance  
EXPLAIN SELECT * FROM tokens 
WHERE user_id = 1 AND revoked_at IS NULL;

-- Add index if needed
CREATE INDEX idx_tokens_user_revoked ON tokens(user_id, revoked_at);
```

---

## 🔄 CI/CD Integration

### GitHub Actions Example

```yaml
# .github/workflows/auth-test.yml
name: Authentication Tests

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    services:
      mysql:
        image: mysql:8.0
        env:
          MYSQL_ROOT_PASSWORD: test_password
          MYSQL_DATABASE: shopee_food_test
        options: --health-cmd="mysqladmin ping" --health-interval=10s --health-timeout=5s --health-retries=3

    steps:
    - uses: actions/checkout@v2
    
    - name: Set up JDK 17
      uses: actions/setup-java@v2
      with:
        java-version: '17'
        distribution: 'temurin'
        
    - name: Cache Maven packages
      uses: actions/cache@v2
      with:
        path: ~/.m2
        key: ${{ runner.os }}-m2-${{ hashFiles('**/pom.xml') }}
        
    - name: Run tests
      run: mvn clean test
      env:
        SPRING_DATASOURCE_URL: jdbc:mysql://localhost:3306/shopee_food_test
        SPRING_DATASOURCE_USERNAME: root
        SPRING_DATASOURCE_PASSWORD: test_password
        
    - name: Run integration tests
      run: |
        # Start application in background
        mvn spring-boot:run &
        sleep 30
        
        # Run API tests
        curl -X POST http://localhost:8080/api/auth/register \
          -H "Content-Type: application/json" \
          -d '{"fullName":"Test User","email":"test@example.com","password":"Password123","confirmPassword":"Password123"}'
```

---

*Hướng dẫn testing này được cập nhật lần cuối: 26/06/2025*
