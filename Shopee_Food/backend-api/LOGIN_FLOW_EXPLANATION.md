/**
 * LUỒNG LOGIN CHI TIẾT - STEP BY STEP
 */

// 1. USER GỬI REQUEST LOGIN
POST /api/auth/login
{
    "username": "admin",
    "password": "123456"
}

// 2. BACKEND XỬ LÝ
AuthController.login() 
    → AuthService.login()
        → UserRepository.findByUsername("admin")  // Tìm user trong DB
        → passwordEncoder.matches("123456", hashedPassword)  // Kiểm tra password
        → jwtUtil.generateToken("admin")  // Tạo JWT token

// 3. TẠO JWT TOKEN
JwtUtil.generateToken("admin") tạo ra token:
{
    "sub": "admin",           // Subject (username)
    "iat": 1687612000,        // Issued At (thời gian tạo)
    "exp": 1687698400         // Expiration (thời gian hết hạn)
}

// 4. LỰU TOKEN VÀO DATABASE (OPTIONAL)
Token tokenEntity = Token.builder()
    .token("eyJhbGciOiJIUzUxMiJ9...")
    .tokenType(TokenType.ACCESS)
    .issuedAt(new Timestamp(now))
    .expiresAt(new Timestamp(now + 24h))
    .revoked(false)
    .user(user)
    .build();
tokenRepository.save(tokenEntity);

// 5. TRẢ VỀ CHO FRONTEND
{
    "token": "eyJhbGciOiJIUzUxMiJ9...",
    "tokenType": "Bearer",
    "userId": 1,
    "username": "admin",
    "email": "admin@shopee.com",
    "message": "Đăng nhập thành công!"
}
