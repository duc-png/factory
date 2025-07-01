# 🚀 Product CRUD - Spring Boot Backend

## 📁 Spring Boot Project Structure

```
product-backend/
├── src/
│   └── main/
│       ├── java/
│       │   └── com/example/productapi/
│       │       ├── ProductApiApplication.java
│       │       ├── config/
│       │       │   └── CorsConfig.java
│       │       ├── controller/
│       │       │   └── ProductController.java
│       │       ├── entity/
│       │       │   └── Product.java
│       │       ├── repository/
│       │       │   └── ProductRepository.java
│       │       ├── service/
│       │       │   ├── ProductService.java
│       │       │   └── ProductServiceImpl.java
│       │       └── dto/
│       │           ├── ProductDTO.java
│       │           └── ApiResponse.java
│       └── resources/
│           ├── application.yml
│           └── data.sql
├── pom.xml
└── README.md
```

## 📄 Code Examples

### 1. **pom.xml** - Dependencies
```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0">
    <modelVersion>4.0.0</modelVersion>
    
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.2.0</version>
        <relativePath/>
    </parent>
    
    <groupId>com.example</groupId>
    <artifactId>product-api</artifactId>
    <version>1.0.0</version>
    <name>Product CRUD API</name>
    
    <properties>
        <java.version>17</java.version>
    </properties>
    
    <dependencies>
        <!-- Spring Boot Web -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        
        <!-- Spring Boot Data JPA -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-jpa</artifactId>
        </dependency>
        
        <!-- H2 Database (for development) -->
        <dependency>
            <groupId>com.h2database</groupId>
            <artifactId>h2</artifactId>
            <scope>runtime</scope>
        </dependency>
        
        <!-- MySQL Driver (for production) -->
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
            <scope>runtime</scope>
        </dependency>
        
        <!-- Validation -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-validation</artifactId>
        </dependency>
        
        <!-- Lombok -->
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>
        
        <!-- Test -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>
    
    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>
</project>
```

### 2. **Product.java** - Entity
```java
package com.example.productapi.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "products")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Product {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank(message = "Product name is required")
    @Size(min = 2, max = 100, message = "Product name must be between 2 and 100 characters")
    @Column(nullable = false, length = 100)
    private String name;
    
    @NotNull(message = "Price is required")
    @DecimalMin(value = "0.0", inclusive = false, message = "Price must be greater than 0")
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal price;
    
    @NotBlank(message = "Category is required")
    @Column(nullable = false, length = 50)
    private String category;
    
    @NotNull(message = "Stock is required")
    @Min(value = 0, message = "Stock cannot be negative")
    @Column(nullable = false)
    private Integer stock;
    
    @Size(max = 500, message = "Description cannot exceed 500 characters")
    @Column(length = 500)
    private String description;
    
    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    @Column(name = "is_active")
    private Boolean isActive = true;
}
```

### 3. **ProductDTO.java** - Data Transfer Object
```java
package com.example.productapi.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class ProductDTO {
    private Long id;
    
    @NotBlank(message = "Product name is required")
    @Size(min = 2, max = 100, message = "Product name must be between 2 and 100 characters")
    private String name;
    
    @NotNull(message = "Price is required")
    @DecimalMin(value = "0.0", inclusive = false, message = "Price must be greater than 0")
    private BigDecimal price;
    
    @NotBlank(message = "Category is required")
    private String category;
    
    @NotNull(message = "Stock is required")
    @Min(value = 0, message = "Stock cannot be negative")
    private Integer stock;
    
    @Size(max = 500, message = "Description cannot exceed 500 characters")
    private String description;
    
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Boolean isActive;
}
```

### 4. **ApiResponse.java** - Response Wrapper
```java
package com.example.productapi.dto;

import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ApiResponse<T> {
    private boolean success;
    private String message;
    private T data;
    private String timestamp;
    
    public static <T> ApiResponse<T> success(T data, String message) {
        return new ApiResponse<>(true, message, data, java.time.LocalDateTime.now().toString());
    }
    
    public static <T> ApiResponse<T> error(String message) {
        return new ApiResponse<>(false, message, null, java.time.LocalDateTime.now().toString());
    }
}
```

### 5. **ProductRepository.java** - Repository
```java
package com.example.productapi.repository;

import com.example.productapi.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    
    // Find active products
    List<Product> findByIsActiveTrue();
    
    // Find by category
    List<Product> findByCategoryAndIsActiveTrue(String category);
    
    // Search by name or description
    @Query("SELECT p FROM Product p WHERE " +
           "(LOWER(p.name) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(p.description) LIKE LOWER(CONCAT('%', :keyword, '%'))) " +
           "AND p.isActive = true")
    List<Product> searchByKeyword(@Param("keyword") String keyword);
    
    // Find by price range
    List<Product> findByPriceBetweenAndIsActiveTrue(BigDecimal minPrice, BigDecimal maxPrice);
    
    // Find low stock products
    List<Product> findByStockLessThanAndIsActiveTrue(Integer threshold);
    
    // Custom find with active check
    @Query("SELECT p FROM Product p WHERE p.id = :id AND p.isActive = true")
    Optional<Product> findByIdAndActive(@Param("id") Long id);
}
```

### 6. **ProductService.java** - Service Interface
```java
package com.example.productapi.service;

import com.example.productapi.dto.ProductDTO;
import java.util.List;

public interface ProductService {
    List<ProductDTO> getAllProducts();
    ProductDTO getProductById(Long id);
    ProductDTO createProduct(ProductDTO productDTO);
    ProductDTO updateProduct(Long id, ProductDTO productDTO);
    void deleteProduct(Long id);
    List<ProductDTO> searchProducts(String keyword);
    List<ProductDTO> getProductsByCategory(String category);
    List<ProductDTO> getLowStockProducts(Integer threshold);
}
```

### 7. **ProductServiceImpl.java** - Service Implementation
```java
package com.example.productapi.service;

import com.example.productapi.dto.ProductDTO;
import com.example.productapi.entity.Product;
import com.example.productapi.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {
    
    private final ProductRepository productRepository;
    
    @Override
    public List<ProductDTO> getAllProducts() {
        return productRepository.findByIsActiveTrue()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    @Override
    public ProductDTO getProductById(Long id) {
        Product product = productRepository.findByIdAndActive(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
        return convertToDTO(product);
    }
    
    @Override
    @Transactional
    public ProductDTO createProduct(ProductDTO productDTO) {
        Product product = convertToEntity(productDTO);
        product.setIsActive(true);
        Product savedProduct = productRepository.save(product);
        return convertToDTO(savedProduct);
    }
    
    @Override
    @Transactional
    public ProductDTO updateProduct(Long id, ProductDTO productDTO) {
        Product existingProduct = productRepository.findByIdAndActive(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
        
        // Update fields
        existingProduct.setName(productDTO.getName());
        existingProduct.setPrice(productDTO.getPrice());
        existingProduct.setCategory(productDTO.getCategory());
        existingProduct.setStock(productDTO.getStock());
        existingProduct.setDescription(productDTO.getDescription());
        
        Product updatedProduct = productRepository.save(existingProduct);
        return convertToDTO(updatedProduct);
    }
    
    @Override
    @Transactional
    public void deleteProduct(Long id) {
        Product product = productRepository.findByIdAndActive(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
        
        // Soft delete
        product.setIsActive(false);
        productRepository.save(product);
    }
    
    @Override
    public List<ProductDTO> searchProducts(String keyword) {
        return productRepository.searchByKeyword(keyword)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    @Override
    public List<ProductDTO> getProductsByCategory(String category) {
        return productRepository.findByCategoryAndIsActiveTrue(category)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    @Override
    public List<ProductDTO> getLowStockProducts(Integer threshold) {
        return productRepository.findByStockLessThanAndIsActiveTrue(threshold)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    // Helper methods
    private ProductDTO convertToDTO(Product product) {
        ProductDTO dto = new ProductDTO();
        dto.setId(product.getId());
        dto.setName(product.getName());
        dto.setPrice(product.getPrice());
        dto.setCategory(product.getCategory());
        dto.setStock(product.getStock());
        dto.setDescription(product.getDescription());
        dto.setCreatedAt(product.getCreatedAt());
        dto.setUpdatedAt(product.getUpdatedAt());
        dto.setIsActive(product.getIsActive());
        return dto;
    }
    
    private Product convertToEntity(ProductDTO dto) {
        Product product = new Product();
        product.setName(dto.getName());
        product.setPrice(dto.getPrice());
        product.setCategory(dto.getCategory());
        product.setStock(dto.getStock());
        product.setDescription(dto.getDescription());
        return product;
    }
}
```

### 8. **ProductController.java** - REST Controller
```java
package com.example.productapi.controller;

import com.example.productapi.dto.ApiResponse;
import com.example.productapi.dto.ProductDTO;
import com.example.productapi.service.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000") // React dev server
public class ProductController {
    
    private final ProductService productService;
    
    @GetMapping
    public ResponseEntity<ApiResponse<List<ProductDTO>>> getAllProducts() {
        List<ProductDTO> products = productService.getAllProducts();
        return ResponseEntity.ok(
            ApiResponse.success(products, "Products retrieved successfully")
        );
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ProductDTO>> getProductById(@PathVariable Long id) {
        try {
            ProductDTO product = productService.getProductById(id);
            return ResponseEntity.ok(
                ApiResponse.success(product, "Product retrieved successfully")
            );
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(ApiResponse.error(e.getMessage()));
        }
    }
    
    @PostMapping
    public ResponseEntity<ApiResponse<ProductDTO>> createProduct(@Valid @RequestBody ProductDTO productDTO) {
        try {
            ProductDTO createdProduct = productService.createProduct(productDTO);
            return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(createdProduct, "Product created successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(ApiResponse.error("Failed to create product: " + e.getMessage()));
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<ProductDTO>> updateProduct(
            @PathVariable Long id, 
            @Valid @RequestBody ProductDTO productDTO) {
        try {
            ProductDTO updatedProduct = productService.updateProduct(id, productDTO);
            return ResponseEntity.ok(
                ApiResponse.success(updatedProduct, "Product updated successfully")
            );
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(ApiResponse.error(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(ApiResponse.error("Failed to update product: " + e.getMessage()));
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteProduct(@PathVariable Long id) {
        try {
            productService.deleteProduct(id);
            return ResponseEntity.ok(
                ApiResponse.success(null, "Product deleted successfully")
            );
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(ApiResponse.error(e.getMessage()));
        }
    }
    
    @GetMapping("/search")
    public ResponseEntity<ApiResponse<List<ProductDTO>>> searchProducts(@RequestParam String keyword) {
        List<ProductDTO> products = productService.searchProducts(keyword);
        return ResponseEntity.ok(
            ApiResponse.success(products, "Search completed successfully")
        );
    }
    
    @GetMapping("/category/{category}")
    public ResponseEntity<ApiResponse<List<ProductDTO>>> getProductsByCategory(@PathVariable String category) {
        List<ProductDTO> products = productService.getProductsByCategory(category);
        return ResponseEntity.ok(
            ApiResponse.success(products, "Products by category retrieved successfully")
        );
    }
    
    @GetMapping("/low-stock")
    public ResponseEntity<ApiResponse<List<ProductDTO>>> getLowStockProducts(
            @RequestParam(defaultValue = "10") Integer threshold) {
        List<ProductDTO> products = productService.getLowStockProducts(threshold);
        return ResponseEntity.ok(
            ApiResponse.success(products, "Low stock products retrieved successfully")
        );
    }
}
```

### 9. **CorsConfig.java** - CORS Configuration
```java
package com.example.productapi.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.Arrays;

@Configuration
public class CorsConfig implements WebMvcConfigurer {
    
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:3000") // React dev server
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
    
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOriginPatterns(Arrays.asList("*"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
```

### 10. **application.yml** - Configuration
```yaml
server:
  port: 8080
  servlet:
    context-path: /

spring:
  application:
    name: product-api
    
  # Database Configuration
  datasource:
    url: jdbc:h2:mem:testdb
    driver-class-name: org.h2.Driver
    username: sa
    password: password
    
  # JPA Configuration
  jpa:
    database-platform: org.hibernate.dialect.H2Dialect
    hibernate:
      ddl-auto: create-drop
    show-sql: true
    properties:
      hibernate:
        format_sql: true
        
  # H2 Console (for development)
  h2:
    console:
      enabled: true
      path: /h2-console
      
  # SQL initialization
  sql:
    init:
      mode: always

# Logging
logging:
  level:
    com.example.productapi: DEBUG
    org.springframework.web: DEBUG
    
# Custom properties
app:
  cors:
    allowed-origins: http://localhost:3000
```

### 11. **data.sql** - Sample Data
```sql
-- Insert sample products
INSERT INTO products (name, price, category, stock, description, is_active, created_at, updated_at) VALUES
('iPhone 15 Pro', 999.99, 'Electronics', 50, 'Latest iPhone with advanced features', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Samsung Galaxy S24', 899.99, 'Electronics', 30, 'Premium Android smartphone', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('MacBook Air M3', 1299.99, 'Computers', 25, 'Lightweight laptop with M3 chip', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('AirPods Pro', 249.99, 'Audio', 100, 'Wireless earbuds with noise cancellation', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('iPad Air', 599.99, 'Electronics', 40, 'Powerful tablet for work and creativity', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Dell XPS 13', 1199.99, 'Computers', 15, 'Premium ultrabook laptop', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Sony WH-1000XM4', 349.99, 'Audio', 60, 'Industry-leading noise canceling headphones', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Magic Mouse', 79.99, 'Accessories', 80, 'Wireless rechargeable mouse', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
```

## 🚀 How to Run

### Spring Boot Backend:
```bash
# Clone/create project
cd product-backend

# Run with Maven
./mvnw spring-boot:run

# Or run with IDE
# Right-click on ProductApiApplication.java -> Run

# API will be available at: http://localhost:8080/api/products
# H2 Console: http://localhost:8080/h2-console
```

### Connect React Frontend:
```javascript
// Update productService in ProductCRUD.js
const API_BASE_URL = 'http://localhost:8080/api/products';

const productService = {
  getAll: async () => {
    const response = await fetch(API_BASE_URL);
    const result = await response.json();
    return result.data; // Extract data from ApiResponse
  },
  
  create: async (product) => {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    });
    const result = await response.json();
    return result.data;
  },
  
  // ... other methods
};
```

## 🎯 API Endpoints

- **GET** `/api/products` - Get all products
- **GET** `/api/products/{id}` - Get product by ID
- **POST** `/api/products` - Create new product
- **PUT** `/api/products/{id}` - Update product
- **DELETE** `/api/products/{id}` - Delete product (soft delete)
- **GET** `/api/products/search?keyword=` - Search products
- **GET** `/api/products/category/{category}` - Get by category
- **GET** `/api/products/low-stock?threshold=` - Get low stock products

Perfect for learning React + Spring Boot! 🚀
