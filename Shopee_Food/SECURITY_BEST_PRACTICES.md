# 🛡️ Shopee Food Security Best Practices

## 📋 Mục lục

1. [JWT Security](#jwt-security)
2. [OAuth2 Security](#oauth2-security)
3. [Database Security](#database-security)
4. [API Security](#api-security)
5. [Production Security](#production-security)
6. [Monitoring & Logging](#monitoring--logging)

---

## 🔐 JWT Security

### 1. JWT Secret Management

#### ❌ Không nên làm
```properties
# Weak secret
app.jwt.secret=mysecret

# Hardcoded secret
app.jwt.secret=12345678901234567890
```

#### ✅ Nên làm
```properties
# Strong secret (256+ bits)
app.jwt.secret=${JWT_SECRET:randomGeneratedSecretKey256BitsMinimumLengthForProductionUse123456789012345678901234567890}

# Environment variable
app.jwt.secret=${JWT_SECRET}
```

#### Generate Strong JWT Secret
```bash
# Generate 512-bit secret
openssl rand -base64 64

# Or using Node.js
node -e "console.log(require('crypto').randomBytes(64).toString('base64'))"
```

### 2. Token Expiration Strategy

```properties
# Short-lived access token (15-30 minutes in production)
app.jwt.access-token-expiration=1800000  # 30 minutes

# Longer refresh token (7-30 days)
app.jwt.refresh-token-expiration=2592000000  # 30 days

# Remember me tokens (up to 1 year)
app.jwt.remember-me-expiration=31536000000  # 1 year
```

### 3. JWT Claims Validation

```java
public class JwtService {
    
    public Boolean validateToken(String token, UserDetails userDetails) {
        try {
            final Claims claims = extractAllClaims(token);
            
            // Validate standard claims
            if (claims.getExpiration().before(new Date())) {
                throw new TokenExpiredException("Token expired");
            }
            
            // Validate custom claims
            if (!claims.get("tokenType", String.class).equals("access")) {
                throw new InvalidTokenException("Invalid token type");
            }
            
            // Validate issuer
            if (!claims.getIssuer().equals("shopee-food-api")) {
                throw new InvalidTokenException("Invalid issuer");
            }
            
            // Validate audience
            if (!claims.getAudience().equals("shopee-food-web")) {
                throw new InvalidTokenException("Invalid audience");
            }
            
            return true;
            
        } catch (JwtException e) {
            return false;
        }
    }
}
```

### 4. Token Storage Security

#### Frontend (React)
```javascript
// ❌ Không lưu trong localStorage (XSS vulnerable)
localStorage.setItem('token', token);

// ✅ Sử dụng httpOnly cookies
// Backend set cookie
response.addCookie(createSecureCookie("accessToken", token));

// Or secure storage libraries
import SecureStorage from 'secure-web-storage';
const CryptoJS = require('crypto-js');

const secureStorage = new SecureStorage(localStorage, {
    hash: function hash(key) {
        key = CryptoJS.SHA256(key, 'my-secret-key');
        return key.toString();
    },
    encrypt: function encrypt(data) {
        data = CryptoJS.AES.encrypt(data, 'my-secret-key');
        return data.toString();
    },
    decrypt: function decrypt(data) {
        data = CryptoJS.AES.decrypt(data, 'my-secret-key');
        return data.toString(CryptoJS.enc.Utf8);
    }
});
```

---

## 🌐 OAuth2 Security

### 1. OAuth2 Configuration Security

```properties
# Use environment variables for secrets
spring.security.oauth2.client.registration.google.client-id=${GOOGLE_CLIENT_ID}
spring.security.oauth2.client.registration.google.client-secret=${GOOGLE_CLIENT_SECRET}

# Limit scopes to minimum required
spring.security.oauth2.client.registration.google.scope=email,profile
spring.security.oauth2.client.registration.facebook.scope=email,public_profile

# Use secure redirect URIs
app.oauth2.authorized-redirect-uris=https://shopee-food.com/oauth2/redirect,https://admin.shopee-food.com/oauth2/redirect
```

### 2. State Parameter Validation

```java
@Component
public class HttpCookieOAuth2AuthorizationRequestRepository 
    implements AuthorizationRequestRepository<OAuth2AuthorizationRequest> {
    
    @Override
    public void saveAuthorizationRequest(OAuth2AuthorizationRequest authorizationRequest, 
                                       HttpServletRequest request, HttpServletResponse response) {
        if (authorizationRequest == null) {
            removeAuthorizationRequestCookies(request, response);
            return;
        }

        // Generate secure state parameter
        String state = generateSecureState();
        authorizationRequest = OAuth2AuthorizationRequest.from(authorizationRequest)
                .state(state)
                .build();

        // Store in secure cookie with CSRF protection
        CookieUtils.addSecureCookie(response, OAUTH2_AUTHORIZATION_REQUEST_COOKIE_NAME, 
                                  CookieUtils.serialize(authorizationRequest), COOKIE_EXPIRE_SECONDS);
    }
    
    private String generateSecureState() {
        return UUID.randomUUID().toString() + ":" + System.currentTimeMillis();
    }
}
```

### 3. OAuth2 User Info Validation

```java
@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {
    
    private OAuth2User processOAuth2User(OAuth2UserRequest request, OAuth2User oAuth2User) {
        OAuth2UserInfo userInfo = OAuth2UserInfoFactory.getOAuth2UserInfo(
                request.getClientRegistration().getRegistrationId(), 
                oAuth2User.getAttributes()
        );
        
        // Validate required fields
        if (!StringUtils.hasText(userInfo.getEmail())) {
            throw new OAuth2AuthenticationException("Email not found from OAuth2 provider");
        }
        
        if (!isValidEmail(userInfo.getEmail())) {
            throw new OAuth2AuthenticationException("Invalid email format from OAuth2 provider");
        }
        
        // Prevent account takeover
        Optional<User> existingUser = userRepository.findByEmail(userInfo.getEmail());
        if (existingUser.isPresent()) {
            User user = existingUser.get();
            
            // Check if user registered with different provider
            if (!user.getProvider().equals(AuthProvider.valueOf(
                    request.getClientRegistration().getRegistrationId().toUpperCase()))) {
                
                throw new OAuth2AuthenticationException(
                    "Account exists with different provider: " + user.getProvider()
                );
            }
        }
        
        return processUser(request, userInfo);
    }
    
    private boolean isValidEmail(String email) {
        return email != null && email.matches("^[A-Za-z0-9+_.-]+@(.+)$");
    }
}
```

---

## 🗄️ Database Security

### 1. Connection Security

```properties
# Use SSL connections
spring.datasource.url=jdbc:mysql://localhost:3306/shopee_food?useSSL=true&requireSSL=true&serverTimezone=UTC

# Connection pooling security
spring.datasource.hikari.maximum-pool-size=20
spring.datasource.hikari.minimum-idle=5
spring.datasource.hikari.connection-timeout=30000
spring.datasource.hikari.idle-timeout=600000
spring.datasource.hikari.max-lifetime=1800000

# Use strong credentials
spring.datasource.username=${DB_USERNAME}
spring.datasource.password=${DB_PASSWORD}
```

### 2. Data Encryption

```java
@Entity
public class User {
    
    // Encrypt sensitive data
    @Column(name = "phone_number")
    @Convert(converter = EncryptionConverter.class)
    private String phoneNumber;
    
    @Column(name = "address")
    @Convert(converter = EncryptionConverter.class)
    private String address;
    
    // Hash passwords properly
    @Column(name = "password")
    private String password; // BCrypt hashed
}

@Converter
public class EncryptionConverter implements AttributeConverter<String, String> {
    
    @Value("${app.encryption.key}")
    private String encryptionKey;
    
    @Override
    public String convertToDatabaseColumn(String attribute) {
        if (attribute == null) return null;
        return AESUtil.encrypt(attribute, encryptionKey);
    }
    
    @Override
    public String convertToEntityAttribute(String dbData) {
        if (dbData == null) return null;
        return AESUtil.decrypt(dbData, encryptionKey);
    }
}
```

### 3. SQL Injection Prevention

```java
// ✅ Safe - Using JPA Query Methods
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    Optional<User> findByEmail(String email);
    
    @Query("SELECT u FROM User u WHERE u.email = ?1 AND u.isActive = true")
    Optional<User> findActiveUserByEmail(String email);
    
    // ✅ Safe - Using @Param
    @Query("SELECT u FROM User u WHERE u.email = :email AND u.createdAt > :since")
    List<User> findRecentUsersByEmail(@Param("email") String email, @Param("since") LocalDateTime since);
}

// ❌ Unsafe - String concatenation
@Query(value = "SELECT * FROM users WHERE email = '" + email + "'", nativeQuery = true)
```

### 4. Database Access Control

```sql
-- Create application-specific user
CREATE USER 'shopee_food_app'@'localhost' IDENTIFIED BY 'strong_random_password';

-- Grant minimum required privileges
GRANT SELECT, INSERT, UPDATE ON shopee_food.users TO 'shopee_food_app'@'localhost';
GRANT SELECT, INSERT, UPDATE ON shopee_food.orders TO 'shopee_food_app'@'localhost';
GRANT SELECT ON shopee_food.products TO 'shopee_food_app'@'localhost';

-- No DELETE permissions for application user
-- No DDL permissions (CREATE, ALTER, DROP)
-- No SUPER privileges

FLUSH PRIVILEGES;
```

---

## 🔒 API Security

### 1. Input Validation

```java
@RestController
@Validated
public class AuthApi {
    
    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest request) {
        
        // Additional custom validation
        validateRegisterRequest(request);
        
        return ResponseEntity.ok(authService.register(request));
    }
    
    private void validateRegisterRequest(RegisterRequest request) {
        // Validate password strength
        if (!isStrongPassword(request.getPassword())) {
            throw new BadRequestException("Password must contain at least 8 characters, 1 uppercase, 1 lowercase, 1 number, and 1 special character");
        }
        
        // Validate email domain (optional)
        if (isDisposableEmail(request.getEmail())) {
            throw new BadRequestException("Disposable email addresses are not allowed");
        }
        
        // Validate phone number format
        if (!isValidPhoneNumber(request.getPhoneNumber())) {
            throw new BadRequestException("Invalid phone number format");
        }
    }
    
    private boolean isStrongPassword(String password) {
        return password.matches("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$");
    }
}
```

### 2. Rate Limiting Implementation

```java
@Component
public class RateLimitingFilter implements Filter {
    
    private final RedisTemplate<String, String> redisTemplate;
    private final Map<String, RateLimiter> rateLimiters = new ConcurrentHashMap<>();
    
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) 
            throws IOException, ServletException {
        
        HttpServletRequest httpRequest = (HttpServletRequest) request;
        HttpServletResponse httpResponse = (HttpServletResponse) response;
        
        String clientIp = getClientIpAddress(httpRequest);
        String endpoint = httpRequest.getRequestURI();
        
        // Different limits for different endpoints
        RateLimit rateLimit = getRateLimitForEndpoint(endpoint);
        
        if (!isAllowed(clientIp, endpoint, rateLimit)) {
            httpResponse.setStatus(429);
            httpResponse.getWriter().write("{\"error\":\"Rate limit exceeded\"}");
            return;
        }
        
        chain.doFilter(request, response);
    }
    
    private RateLimit getRateLimitForEndpoint(String endpoint) {
        if (endpoint.startsWith("/api/auth/login")) {
            return new RateLimit(5, 15, TimeUnit.MINUTES); // 5 attempts per 15 minutes
        } else if (endpoint.startsWith("/api/auth/register")) {
            return new RateLimit(3, 60, TimeUnit.MINUTES); // 3 attempts per hour
        } else if (endpoint.startsWith("/api/auth/forgot-password")) {
            return new RateLimit(2, 60, TimeUnit.MINUTES); // 2 attempts per hour
        }
        return new RateLimit(100, 1, TimeUnit.MINUTES); // Default: 100 per minute
    }
}
```

### 3. HTTPS Enforcement

```java
@Configuration
public class SecurityConfig {
    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .requiresChannel(channel -> 
                channel.requestMatchers(r -> r.getHeader("X-Forwarded-Proto") != null)
                       .requiresSecure())
            
            .headers(headers -> headers
                .frameOptions().deny()
                .contentTypeOptions().and()
                .httpStrictTransportSecurity(hsts -> hsts
                    .maxAgeInSeconds(31536000)
                    .includeSubdomains(true)
                    .preload(true))
                .and())
                
            .sessionManagement(session -> session
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .sessionFixation().migrateSession());
                
        return http.build();
    }
}
```

### 4. Content Security Policy

```java
@Component
public class SecurityHeadersFilter implements Filter {
    
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) 
            throws IOException, ServletException {
        
        HttpServletResponse httpResponse = (HttpServletResponse) response;
        
        // Content Security Policy
        httpResponse.setHeader("Content-Security-Policy", 
            "default-src 'self'; " +
            "script-src 'self' 'unsafe-inline' https://apis.google.com; " +
            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
            "font-src 'self' https://fonts.gstatic.com; " +
            "img-src 'self' data: https:; " +
            "connect-src 'self' https://api.shopee-food.com");
        
        // Other security headers
        httpResponse.setHeader("X-Content-Type-Options", "nosniff");
        httpResponse.setHeader("X-Frame-Options", "DENY");
        httpResponse.setHeader("X-XSS-Protection", "1; mode=block");
        httpResponse.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
        
        chain.doFilter(request, response);
    }
}
```

---

## 🚀 Production Security

### 1. Environment Variables

```bash
# .env file (never commit to git)
# Database
DB_HOST=prod-mysql.internal
DB_NAME=shopee_food_prod
DB_USERNAME=shopee_food_user
DB_PASSWORD=very_strong_random_password_123!@#

# JWT
JWT_SECRET=super_secure_jwt_secret_key_minimum_256_bits_12345678901234567890
JWT_ACCESS_EXPIRATION=1800000
JWT_REFRESH_EXPIRATION=2592000000

# OAuth2
GOOGLE_CLIENT_ID=prod-google-client-id
GOOGLE_CLIENT_SECRET=prod-google-client-secret
FACEBOOK_CLIENT_ID=prod-facebook-app-id
FACEBOOK_CLIENT_SECRET=prod-facebook-app-secret

# Email
MAIL_USERNAME=noreply@shopee-food.com
MAIL_PASSWORD=secure_mail_app_password

# Encryption
ENCRYPTION_KEY=32_character_encryption_key_123
```

### 2. Docker Security

```dockerfile
# Use non-root user
FROM openjdk:17-jre-slim

# Create application user
RUN groupadd -r appuser && useradd -r -g appuser appuser

# Set working directory
WORKDIR /app

# Copy application
COPY target/shopee-food-api.jar app.jar

# Change ownership
RUN chown -R appuser:appuser /app

# Switch to non-root user
USER appuser

# Expose port
EXPOSE 8080

# Run application
ENTRYPOINT ["java", "-jar", "app.jar"]
```

### 3. Kubernetes Security

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: shopee-food-api
spec:
  replicas: 3
  selector:
    matchLabels:
      app: shopee-food-api
  template:
    metadata:
      labels:
        app: shopee-food-api
    spec:
      containers:
      - name: api
        image: shopee-food/api:latest
        ports:
        - containerPort: 8080
        
        # Security context
        securityContext:
          runAsNonRoot: true
          runAsUser: 1000
          allowPrivilegeEscalation: false
          readOnlyRootFilesystem: true
          capabilities:
            drop:
            - ALL
        
        # Resource limits
        resources:
          limits:
            memory: "1Gi"
            cpu: "500m"
          requests:
            memory: "512Mi"
            cpu: "250m"
        
        # Environment from secrets
        envFrom:
        - secretRef:
            name: shopee-food-secrets
        
        # Health checks
        livenessProbe:
          httpGet:
            path: /api/health
            port: 8080
          initialDelaySeconds: 30
          periodSeconds: 10
        
        readinessProbe:
          httpGet:
            path: /api/health
            port: 8080
          initialDelaySeconds: 5
          periodSeconds: 5
```

---

## 📊 Monitoring & Logging

### 1. Security Logging

```java
@Component
@Slf4j
public class SecurityEventLogger {
    
    @EventListener
    public void handleAuthenticationSuccess(AuthenticationSuccessEvent event) {
        String username = event.getAuthentication().getName();
        String clientIp = getClientIpAddress();
        
        log.info("SECURITY_EVENT: LOGIN_SUCCESS - User: {}, IP: {}, Timestamp: {}", 
                username, clientIp, Instant.now());
        
        // Send to security monitoring system
        securityMonitor.logEvent(SecurityEvent.builder()
                .type(SecurityEventType.LOGIN_SUCCESS)
                .username(username)
                .clientIp(clientIp)
                .timestamp(Instant.now())
                .build());
    }
    
    @EventListener
    public void handleAuthenticationFailure(AbstractAuthenticationFailureEvent event) {
        String username = event.getAuthentication().getName();
        String clientIp = getClientIpAddress();
        String reason = event.getException().getMessage();
        
        log.warn("SECURITY_EVENT: LOGIN_FAILURE - User: {}, IP: {}, Reason: {}, Timestamp: {}", 
                username, clientIp, reason, Instant.now());
        
        // Alert on suspicious activity
        if (isRepeatedFailure(username, clientIp)) {
            securityAlert.sendAlert(SecurityAlert.builder()
                    .type(AlertType.BRUTE_FORCE_ATTEMPT)
                    .username(username)
                    .clientIp(clientIp)
                    .details("Multiple failed login attempts detected")
                    .build());
        }
    }
}
```

### 2. Metrics Collection

```java
@Component
public class SecurityMetrics {
    
    private final Counter loginAttempts = Counter.builder("auth_login_attempts_total")
            .description("Total number of login attempts")
            .tag("result", "success|failure")
            .register(Metrics.globalRegistry);
    
    private final Timer loginDuration = Timer.builder("auth_login_duration")
            .description("Login processing time")
            .register(Metrics.globalRegistry);
    
    private final Gauge activeTokens = Gauge.builder("auth_active_tokens")
            .description("Number of active JWT tokens")
            .register(Metrics.globalRegistry, this, SecurityMetrics::countActiveTokens);
    
    public void recordLoginAttempt(boolean success) {
        loginAttempts.increment(Tags.of("result", success ? "success" : "failure"));
    }
    
    public void recordLoginDuration(Duration duration) {
        loginDuration.record(duration);
    }
    
    private double countActiveTokens() {
        return tokenRepository.countActiveTokens();
    }
}
```

### 3. Alerting Rules

```yaml
# Prometheus alerting rules
groups:
- name: authentication
  rules:
  - alert: HighFailedLoginRate
    expr: rate(auth_login_attempts_total{result="failure"}[5m]) > 10
    for: 2m
    labels:
      severity: warning
    annotations:
      summary: "High rate of failed login attempts"
      description: "Failed login rate is {{ $value }} per second"
  
  - alert: JWTTokenLeakage
    expr: auth_active_tokens > 10000
    for: 5m
    labels:
      severity: critical
    annotations:
      summary: "Possible JWT token leakage"
      description: "Unusually high number of active tokens: {{ $value }}"
  
  - alert: OAuth2CallbackFailures
    expr: rate(oauth2_callback_failures_total[5m]) > 1
    for: 1m
    labels:
      severity: warning
    annotations:
      summary: "OAuth2 callback failures detected"
      description: "OAuth2 callback failure rate: {{ $value }} per second"
```

### 4. Log Analysis

```bash
#!/bin/bash
# security_analysis.sh

# Analyze failed login attempts
echo "=== Top Failed Login IPs ==="
grep "LOGIN_FAILURE" /var/log/shopee-food/security.log | \
  awk '{print $8}' | sort | uniq -c | sort -nr | head -10

# Check for brute force patterns
echo "=== Potential Brute Force Attacks ==="
grep "LOGIN_FAILURE" /var/log/shopee-food/security.log | \
  awk '{print $6, $8}' | sort | uniq -c | \
  awk '$1 > 5 {print "User:", $2, "IP:", $3, "Attempts:", $1}'

# Monitor JWT token usage
echo "=== JWT Token Statistics ==="
grep "TOKEN_" /var/log/shopee-food/security.log | \
  awk '{print $3}' | sort | uniq -c

# Check OAuth2 issues
echo "=== OAuth2 Errors ==="
grep "OAUTH2_ERROR" /var/log/shopee-food/security.log | tail -20
```

---

## 🔍 Security Testing

### 1. Penetration Testing Checklist

#### Authentication Testing
- [ ] Test password brute force protection
- [ ] Verify account lockout mechanisms
- [ ] Test session fixation vulnerabilities
- [ ] Check for timing attack vulnerabilities
- [ ] Verify JWT token security

#### Authorization Testing
- [ ] Test horizontal privilege escalation
- [ ] Test vertical privilege escalation
- [ ] Verify role-based access controls
- [ ] Test direct object references

#### Input Validation
- [ ] Test SQL injection vulnerabilities
- [ ] Test XSS vulnerabilities
- [ ] Test command injection
- [ ] Verify file upload security

### 2. Automated Security Testing

```yaml
# security-tests.yml (GitHub Actions)
name: Security Tests
on: [push, pull_request]

jobs:
  security:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    
    - name: Run OWASP Dependency Check
      uses: dependency-check/Dependency-Check_Action@main
      with:
        project: 'shopee-food'
        path: '.'
        format: 'JSON'
    
    - name: Run Semgrep Security Scan
      uses: returntocorp/semgrep-action@v1
      with:
        config: auto
    
    - name: Run Snyk Security Scan
      uses: snyk/actions/maven@master
      env:
        SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}
```

---

## 📋 Security Compliance

### 1. GDPR Compliance

```java
@Service
public class GDPRComplianceService {
    
    // Right to be forgotten
    @Transactional
    public void deleteUserData(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("User not found"));
        
        // Anonymize user data
        user.setEmail("deleted-" + userId + "@anonymous.com");
        user.setFullName("Deleted User");
        user.setPhoneNumber(null);
        user.setAddress(null);
        user.setAvatar(null);
        user.setIsActive(false);
        
        // Delete related data
        tokenRepository.deleteByUser(user);
        loginAttemptRepository.deleteByEmail(user.getEmail());
        
        userRepository.save(user);
        
        log.info("GDPR: User data deleted for user ID: {}", userId);
    }
    
    // Data export
    public UserDataExport exportUserData(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("User not found"));
        
        return UserDataExport.builder()
                .personalData(extractPersonalData(user))
                .orders(extractOrderData(user))
                .reviews(extractReviewData(user))
                .loginHistory(extractLoginHistory(user))
                .build();
    }
}
```

### 2. PCI DSS Compliance (if handling payments)

```java
@Component
public class PCIComplianceService {
    
    // Never store sensitive payment data
    @EventListener
    public void handlePaymentProcessed(PaymentProcessedEvent event) {
        // Remove sensitive data after processing
        PaymentData paymentData = event.getPaymentData();
        
        // Keep only necessary data for business purposes
        PaymentRecord record = PaymentRecord.builder()
                .orderId(paymentData.getOrderId())
                .amount(paymentData.getAmount())
                .currency(paymentData.getCurrency())
                .status(paymentData.getStatus())
                .maskedCardNumber(maskCardNumber(paymentData.getCardNumber()))
                .timestamp(Instant.now())
                .build();
        
        paymentRepository.save(record);
        
        // Ensure sensitive data is not logged
        log.info("Payment processed for order: {}, amount: {}", 
                record.getOrderId(), record.getAmount());
    }
    
    private String maskCardNumber(String cardNumber) {
        if (cardNumber == null || cardNumber.length() < 4) {
            return "****";
        }
        return "****-****-****-" + cardNumber.substring(cardNumber.length() - 4);
    }
}
```

---

*Tài liệu Security Best Practices này được cập nhật lần cuối: 26/06/2025*
