-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: localhost    Database: shopee_food
-- ------------------------------------------------------
-- Server version	9.3.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `addresses`
--

DROP TABLE IF EXISTS `addresses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `addresses` (
  `addressID` int NOT NULL AUTO_INCREMENT,
  `userID` int DEFAULT NULL,
  `address` varchar(255) NOT NULL,
  `city` varchar(100) NOT NULL,
  `postalCode` varchar(20) DEFAULT NULL,
  `postal_code` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`addressID`),
  KEY `userID` (`userID`),
  CONSTRAINT `addresses_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `addresses`
--

LOCK TABLES `addresses` WRITE;
/*!40000 ALTER TABLE `addresses` DISABLE KEYS */;
INSERT INTO `addresses` VALUES (1,2,'123 Nguyen Trai Street','Ho Chi Minh City','70000','70000'),(2,3,'456 Le Loi Boulevard','Ho Chi Minh City','70001','70001'),(3,4,'789 Hai Ba Trung Street','Hanoi','10000','10000'),(4,5,'321 Dong Khoi Street','Ho Chi Minh City','70002','70002'),(5,2,'123 Nguyen Trai Street','Ho Chi Minh City','70000','70000'),(6,3,'456 Le Loi Boulevard','Ho Chi Minh City','70001','70001'),(7,4,'789 Hai Ba Trung Street','Hanoi','10000','10000'),(8,5,'321 Dong Khoi Street','Ho Chi Minh City','70002','70002');
/*!40000 ALTER TABLE `addresses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auditlogs`
--

DROP TABLE IF EXISTS `auditlogs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auditlogs` (
  `logID` int NOT NULL AUTO_INCREMENT,
  `userID` int DEFAULT NULL,
  `action` varchar(100) NOT NULL,
  `targetType` varchar(50) DEFAULT NULL,
  `targetID` int DEFAULT NULL,
  `targetUserID` int DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `ipAddress` varchar(45) DEFAULT NULL,
  `userAgent` varchar(500) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `created_at` datetime(6) DEFAULT NULL,
  `ip_address` varchar(255) DEFAULT NULL,
  `target_type` varchar(50) DEFAULT NULL,
  `target_userid` int DEFAULT NULL,
  `user_agent` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`logID`),
  KEY `userID` (`userID`),
  KEY `idx_auditlogs_target_user` (`targetUserID`),
  KEY `idx_auditlogs_action` (`action`),
  KEY `idx_auditlogs_created_at` (`createdAt`),
  KEY `idx_auditlogs_security` (`action`,`createdAt`,`ipAddress`),
  KEY `FKqlif0b774b2rn7aqimyhuocvl` (`target_userid`),
  CONSTRAINT `auditlogs_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`),
  CONSTRAINT `fk_auditlogs_target_user` FOREIGN KEY (`targetUserID`) REFERENCES `users` (`userID`) ON DELETE SET NULL,
  CONSTRAINT `FKqlif0b774b2rn7aqimyhuocvl` FOREIGN KEY (`target_userid`) REFERENCES `users` (`userID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auditlogs`
--

LOCK TABLES `auditlogs` WRITE;
/*!40000 ALTER TABLE `auditlogs` DISABLE KEYS */;
/*!40000 ALTER TABLE `auditlogs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `cartID` int NOT NULL AUTO_INCREMENT,
  `userID` int DEFAULT NULL,
  `productID` int DEFAULT NULL,
  `quantity` int DEFAULT '1',
  `optionValueID` int DEFAULT NULL,
  `note` varchar(255) DEFAULT NULL,
  `addedDate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `option_valueid` int DEFAULT NULL,
  PRIMARY KEY (`cartID`),
  UNIQUE KEY `unique_user_product` (`userID`,`productID`),
  UNIQUE KEY `UKeetirg8kae689c9nuukcgure0` (`userID`,`productID`),
  KEY `productID` (`productID`),
  KEY `optionValueID` (`optionValueID`),
  KEY `FK33vax10oseqmh2ld7mycivr8u` (`option_valueid`),
  CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`),
  CONSTRAINT `cart_ibfk_2` FOREIGN KEY (`productID`) REFERENCES `products` (`productID`),
  CONSTRAINT `cart_ibfk_3` FOREIGN KEY (`optionValueID`) REFERENCES `option_values` (`valueID`),
  CONSTRAINT `FK33vax10oseqmh2ld7mycivr8u` FOREIGN KEY (`option_valueid`) REFERENCES `option_values` (`valueID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart_toppings`
--

DROP TABLE IF EXISTS `cart_toppings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart_toppings` (
  `cartToppingID` int NOT NULL AUTO_INCREMENT,
  `cartID` int DEFAULT NULL,
  `toppingID` int DEFAULT NULL,
  PRIMARY KEY (`cartToppingID`),
  UNIQUE KEY `unique_cart_topping` (`cartID`,`toppingID`),
  UNIQUE KEY `UK6r3sdgs7v89gywsj5gmqt6373` (`cartID`,`toppingID`),
  KEY `toppingID` (`toppingID`),
  CONSTRAINT `cart_toppings_ibfk_1` FOREIGN KEY (`cartID`) REFERENCES `cart` (`cartID`),
  CONSTRAINT `cart_toppings_ibfk_2` FOREIGN KEY (`toppingID`) REFERENCES `product_toppings` (`toppingID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart_toppings`
--

LOCK TABLES `cart_toppings` WRITE;
/*!40000 ALTER TABLE `cart_toppings` DISABLE KEYS */;
/*!40000 ALTER TABLE `cart_toppings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `categoryID` int NOT NULL AUTO_INCREMENT,
  `categoryName` varchar(100) NOT NULL,
  `category_name` varchar(100) NOT NULL,
  PRIMARY KEY (`categoryID`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Vietnamese Food','Vietnamese Food'),(2,'Fast Food','Fast Food'),(3,'Beverages','Beverages'),(4,'Desserts','Desserts'),(5,'Asian Cuisine','Asian Cuisine'),(6,'Vietnamese Food','Vietnamese Food'),(7,'Fast Food','Fast Food'),(8,'Beverages','Beverages'),(9,'Desserts','Desserts'),(10,'Asian Cuisine','Asian Cuisine');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `email_verification_tokens`
--

DROP TABLE IF EXISTS `email_verification_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `email_verification_tokens` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userID` int NOT NULL,
  `token` varchar(255) NOT NULL,
  `expiresAt` timestamp NOT NULL,
  `used` tinyint(1) DEFAULT '0',
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `created_at` datetime(6) DEFAULT NULL,
  `expires_at` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_token` (`token`),
  KEY `idx_user_id` (`userID`),
  KEY `idx_expires_at` (`expiresAt`),
  KEY `idx_used` (`used`),
  CONSTRAINT `fk_email_verification_user` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `email_verification_tokens`
--

LOCK TABLES `email_verification_tokens` WRITE;
/*!40000 ALTER TABLE `email_verification_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `email_verification_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `favorite_products`
--

DROP TABLE IF EXISTS `favorite_products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `favorite_products` (
  `favoriteID` int NOT NULL AUTO_INCREMENT,
  `userID` int DEFAULT NULL,
  `productID` int DEFAULT NULL,
  `addedDate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `added_date` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`favoriteID`),
  KEY `userID` (`userID`),
  KEY `productID` (`productID`),
  CONSTRAINT `favorite_products_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`),
  CONSTRAINT `favorite_products_ibfk_2` FOREIGN KEY (`productID`) REFERENCES `products` (`productID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favorite_products`
--

LOCK TABLES `favorite_products` WRITE;
/*!40000 ALTER TABLE `favorite_products` DISABLE KEYS */;
INSERT INTO `favorite_products` VALUES (1,2,1,'2025-07-01 02:07:32',NULL),(2,2,5,'2025-07-01 02:07:32',NULL),(3,3,3,'2025-07-01 02:07:32',NULL),(4,3,6,'2025-07-01 02:07:32',NULL);
/*!40000 ALTER TABLE `favorite_products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `favorite_shops`
--

DROP TABLE IF EXISTS `favorite_shops`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `favorite_shops` (
  `favoriteID` int NOT NULL AUTO_INCREMENT,
  `userID` int DEFAULT NULL,
  `shopID` int DEFAULT NULL,
  `addedDate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `added_date` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`favoriteID`),
  KEY `userID` (`userID`),
  KEY `shopID` (`shopID`),
  CONSTRAINT `favorite_shops_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`),
  CONSTRAINT `favorite_shops_ibfk_2` FOREIGN KEY (`shopID`) REFERENCES `shops` (`shopID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favorite_shops`
--

LOCK TABLES `favorite_shops` WRITE;
/*!40000 ALTER TABLE `favorite_shops` DISABLE KEYS */;
INSERT INTO `favorite_shops` VALUES (1,2,1,'2025-07-01 02:07:35',NULL),(2,2,3,'2025-07-01 02:07:35',NULL),(3,3,2,'2025-07-01 02:07:35',NULL),(4,3,3,'2025-07-01 02:07:35',NULL);
/*!40000 ALTER TABLE `favorite_shops` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `login_attempts`
--

DROP TABLE IF EXISTS `login_attempts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `login_attempts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `identifier` varchar(255) NOT NULL,
  `identifierType` enum('EMAIL','IP') NOT NULL,
  `attempts` int DEFAULT '1',
  `lastAttemptAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `blockedUntil` timestamp NULL DEFAULT NULL,
  `blocked_until` datetime(6) DEFAULT NULL,
  `identifier_type` enum('EMAIL','IP') NOT NULL,
  `last_attempt_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_identifier` (`identifier`,`identifierType`),
  UNIQUE KEY `UK1vcs73twfr0kdyq60uvatxcdj` (`identifier`,`identifier_type`),
  KEY `idx_identifier` (`identifier`),
  KEY `idx_blocked_until` (`blockedUntil`),
  KEY `idx_last_attempt` (`lastAttemptAt`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `login_attempts`
--

LOCK TABLES `login_attempts` WRITE;
/*!40000 ALTER TABLE `login_attempts` DISABLE KEYS */;
/*!40000 ALTER TABLE `login_attempts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `option_values`
--

DROP TABLE IF EXISTS `option_values`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `option_values` (
  `valueID` int NOT NULL AUTO_INCREMENT,
  `optionID` int DEFAULT NULL,
  `valueName` varchar(100) NOT NULL,
  `additionalPrice` decimal(5,2) DEFAULT '0.00',
  `additional_price` decimal(38,2) NOT NULL,
  `value_name` varchar(100) NOT NULL,
  PRIMARY KEY (`valueID`),
  KEY `optionID` (`optionID`),
  CONSTRAINT `option_values_ibfk_1` FOREIGN KEY (`optionID`) REFERENCES `product_options` (`optionID`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `option_values`
--

LOCK TABLES `option_values` WRITE;
/*!40000 ALTER TABLE `option_values` DISABLE KEYS */;
/*!40000 ALTER TABLE `option_values` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_items` (
  `orderItemID` int NOT NULL AUTO_INCREMENT,
  `orderID` int DEFAULT NULL,
  `productID` int DEFAULT NULL,
  `quantity` int NOT NULL,
  `price` decimal(38,2) NOT NULL,
  `optionValueID` int DEFAULT NULL,
  `note` varchar(255) DEFAULT NULL,
  `option_valueid` int DEFAULT NULL,
  PRIMARY KEY (`orderItemID`),
  KEY `orderID` (`orderID`),
  KEY `productID` (`productID`),
  KEY `optionValueID` (`optionValueID`),
  KEY `FK2rjl2bn8ocmmm6kn04lsp07px` (`option_valueid`),
  CONSTRAINT `FK2rjl2bn8ocmmm6kn04lsp07px` FOREIGN KEY (`option_valueid`) REFERENCES `option_values` (`valueID`),
  CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`orderID`) REFERENCES `orders` (`orderID`),
  CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`productID`) REFERENCES `products` (`productID`),
  CONSTRAINT `order_items_ibfk_3` FOREIGN KEY (`optionValueID`) REFERENCES `option_values` (`valueID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_items`
--

LOCK TABLES `order_items` WRITE;
/*!40000 ALTER TABLE `order_items` DISABLE KEYS */;
/*!40000 ALTER TABLE `order_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_toppings`
--

DROP TABLE IF EXISTS `order_toppings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_toppings` (
  `orderToppingID` int NOT NULL AUTO_INCREMENT,
  `orderItemID` int DEFAULT NULL,
  `toppingID` int DEFAULT NULL,
  `order_itemid` int DEFAULT NULL,
  PRIMARY KEY (`orderToppingID`),
  UNIQUE KEY `unique_orderitem_topping` (`orderItemID`,`toppingID`),
  UNIQUE KEY `UK3b3jnyb6jxirrrokwvuavmqxo` (`order_itemid`,`toppingID`),
  KEY `toppingID` (`toppingID`),
  CONSTRAINT `order_toppings_ibfk_1` FOREIGN KEY (`orderItemID`) REFERENCES `order_items` (`orderItemID`),
  CONSTRAINT `order_toppings_ibfk_2` FOREIGN KEY (`toppingID`) REFERENCES `product_toppings` (`toppingID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_toppings`
--

LOCK TABLES `order_toppings` WRITE;
/*!40000 ALTER TABLE `order_toppings` DISABLE KEYS */;
/*!40000 ALTER TABLE `order_toppings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `orderID` int NOT NULL AUTO_INCREMENT,
  `userID` int DEFAULT NULL,
  `totalAmount` decimal(10,2) NOT NULL,
  `status` enum('Cancelled','Delivered','Pending','Processing','Shipped') DEFAULT NULL,
  `orderDate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `paymentStatus` enum('Pending','Completed','Failed') DEFAULT 'Pending',
  `deliveryAddress` text,
  `delivery_address` varchar(255) DEFAULT NULL,
  `payment_status` enum('Completed','Failed','Pending') DEFAULT NULL,
  `total_amount` decimal(38,2) NOT NULL,
  PRIMARY KEY (`orderID`),
  KEY `userID` (`userID`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,2,75000.00,'Delivered','2025-07-01 02:07:10','Completed','123 Nguyen Trai Street, HCMC','123 Nguyen Trai Street, HCMC','Completed',75000.00),(2,3,135000.00,'Processing','2025-07-01 02:07:10','Completed','456 Le Loi Boulevard, HCMC','456 Le Loi Boulevard, HCMC','Completed',135000.00),(3,2,80000.00,'Pending','2025-07-01 02:07:10','Pending','123 Nguyen Trai Street, HCMC','123 Nguyen Trai Street, HCMC','Pending',80000.00);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_reset_tokens`
--

DROP TABLE IF EXISTS `password_reset_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `password_reset_tokens` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userID` int NOT NULL,
  `token` varchar(255) NOT NULL,
  `expiresAt` timestamp NOT NULL,
  `used` tinyint(1) DEFAULT '0',
  `ipAddress` varchar(45) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `created_at` datetime(6) DEFAULT NULL,
  `expires_at` datetime(6) NOT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_token` (`token`),
  KEY `idx_user_id` (`userID`),
  KEY `idx_expires_at` (`expiresAt`),
  KEY `idx_used` (`used`),
  CONSTRAINT `fk_password_reset_user` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_reset_tokens`
--

LOCK TABLES `password_reset_tokens` WRITE;
/*!40000 ALTER TABLE `password_reset_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_reset_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payments`
--

DROP TABLE IF EXISTS `payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payments` (
  `paymentID` int NOT NULL AUTO_INCREMENT,
  `orderID` int DEFAULT NULL,
  `paymentMethod` enum('Cash','Bank','VNPay') NOT NULL,
  `paymentStatus` enum('Pending','Completed','Failed') DEFAULT 'Pending',
  `paymentDate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `payment_date` datetime(6) DEFAULT NULL,
  `payment_method` enum('Bank','Cash','VNPay') DEFAULT NULL,
  `payment_status` enum('Completed','Failed','Pending') DEFAULT NULL,
  PRIMARY KEY (`paymentID`),
  KEY `orderID` (`orderID`),
  CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`orderID`) REFERENCES `orders` (`orderID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payments`
--

LOCK TABLES `payments` WRITE;
/*!40000 ALTER TABLE `payments` DISABLE KEYS */;
INSERT INTO `payments` VALUES (1,1,'VNPay','Completed','2025-07-01 02:07:19',NULL,'VNPay','Completed'),(2,2,'Cash','Completed','2025-07-01 02:07:19',NULL,'Cash','Completed'),(3,3,'Bank','Pending','2025-07-01 02:07:19',NULL,'Bank','Pending');
/*!40000 ALTER TABLE `payments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_options`
--

DROP TABLE IF EXISTS `product_options`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_options` (
  `optionID` int NOT NULL AUTO_INCREMENT,
  `productID` int DEFAULT NULL,
  `optionName` varchar(100) NOT NULL,
  `option_name` varchar(100) NOT NULL,
  PRIMARY KEY (`optionID`),
  KEY `productID` (`productID`),
  CONSTRAINT `product_options_ibfk_1` FOREIGN KEY (`productID`) REFERENCES `products` (`productID`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_options`
--

LOCK TABLES `product_options` WRITE;
/*!40000 ALTER TABLE `product_options` DISABLE KEYS */;
INSERT INTO `product_options` VALUES (1,1,'Size','Size'),(2,2,'Size','Size'),(3,3,'Size','Size'),(4,4,'Size','Size'),(5,5,'Size','Size'),(6,1,'Size','Size'),(7,2,'Size','Size'),(8,3,'Size','Size'),(9,4,'Size','Size'),(10,5,'Size','Size');
/*!40000 ALTER TABLE `product_options` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_toppings`
--

DROP TABLE IF EXISTS `product_toppings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_toppings` (
  `toppingID` int NOT NULL AUTO_INCREMENT,
  `productID` int DEFAULT NULL,
  `toppingName` varchar(100) NOT NULL,
  `additionalPrice` decimal(5,2) DEFAULT '0.00',
  `categoryID` int DEFAULT NULL,
  `additional_price` decimal(38,2) NOT NULL,
  `topping_name` varchar(100) NOT NULL,
  PRIMARY KEY (`toppingID`),
  KEY `productID` (`productID`),
  KEY `categoryID` (`categoryID`),
  CONSTRAINT `product_toppings_ibfk_1` FOREIGN KEY (`productID`) REFERENCES `products` (`productID`),
  CONSTRAINT `product_toppings_ibfk_2` FOREIGN KEY (`categoryID`) REFERENCES `topping_categories` (`categoryID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_toppings`
--

LOCK TABLES `product_toppings` WRITE;
/*!40000 ALTER TABLE `product_toppings` DISABLE KEYS */;
/*!40000 ALTER TABLE `product_toppings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `productID` int NOT NULL AUTO_INCREMENT,
  `shopID` int DEFAULT NULL,
  `categoryID` int DEFAULT NULL,
  `productName` varchar(100) NOT NULL,
  `price` decimal(38,2) NOT NULL,
  `stock` int DEFAULT '0',
  `imageURL` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `isActive` tinyint(1) DEFAULT '1',
  `is_active` bit(1) NOT NULL,
  `product_name` varchar(100) NOT NULL,
  PRIMARY KEY (`productID`),
  KEY `shopID` (`shopID`),
  KEY `categoryID` (`categoryID`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`shopID`) REFERENCES `shops` (`shopID`),
  CONSTRAINT `products_ibfk_2` FOREIGN KEY (`categoryID`) REFERENCES `categories` (`categoryID`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,1,1,'Pho Bo',65000.00,100,NULL,'Traditional Vietnamese beef noodle soup',1,_binary '','Pho Bo'),(2,1,1,'Pho Ga',60000.00,100,NULL,'Traditional Vietnamese chicken noodle soup',1,_binary '','Pho Ga'),(3,2,2,'Whopper Burger',120000.00,50,NULL,'Signature Burger King burger',1,_binary '','Whopper Burger'),(4,2,2,'Chicken Burger',95000.00,50,NULL,'Crispy chicken burger',1,_binary '','Chicken Burger'),(5,3,3,'Vietnamese Coffee',35000.00,200,NULL,'Traditional Vietnamese iced coffee',1,_binary '','Vietnamese Coffee'),(6,3,4,'Tiramisu',45000.00,30,NULL,'Italian coffee-flavored dessert',1,_binary '','Tiramisu'),(7,1,1,'Pho Bo',65000.00,100,NULL,'Traditional Vietnamese beef noodle soup',1,_binary '','Pho Bo'),(8,1,1,'Pho Ga',60000.00,100,NULL,'Traditional Vietnamese chicken noodle soup',1,_binary '','Pho Ga'),(9,2,2,'Whopper Burger',120000.00,50,NULL,'Signature Burger King burger',1,_binary '','Whopper Burger'),(10,2,2,'Chicken Burger',95000.00,50,NULL,'Crispy chicken burger',1,_binary '','Chicken Burger'),(11,3,3,'Vietnamese Coffee',35000.00,200,NULL,'Traditional Vietnamese iced coffee',1,_binary '','Vietnamese Coffee'),(12,3,4,'Tiramisu',45000.00,30,NULL,'Italian coffee-flavored dessert',1,_binary '','Tiramisu');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `purchase_history`
--

DROP TABLE IF EXISTS `purchase_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `purchase_history` (
  `historyID` int NOT NULL AUTO_INCREMENT,
  `userID` int DEFAULT NULL,
  `orderID` int DEFAULT NULL,
  `purchaseDate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `purchase_date` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`historyID`),
  KEY `userID` (`userID`),
  KEY `orderID` (`orderID`),
  CONSTRAINT `purchase_history_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`),
  CONSTRAINT `purchase_history_ibfk_2` FOREIGN KEY (`orderID`) REFERENCES `orders` (`orderID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `purchase_history`
--

LOCK TABLES `purchase_history` WRITE;
/*!40000 ALTER TABLE `purchase_history` DISABLE KEYS */;
INSERT INTO `purchase_history` VALUES (1,2,1,'2025-07-01 02:07:43',NULL),(2,3,2,'2025-07-01 02:07:43',NULL);
/*!40000 ALTER TABLE `purchase_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reports`
--

DROP TABLE IF EXISTS `reports`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reports` (
  `reportID` int NOT NULL AUTO_INCREMENT,
  `reportType` enum('Sales','Customer','Order','Product') NOT NULL,
  `reportDate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `totalAmount` decimal(10,2) DEFAULT NULL,
  `totalOrders` int DEFAULT NULL,
  `totalProducts` int DEFAULT NULL,
  `totalCustomers` int DEFAULT NULL,
  `details` varchar(255) DEFAULT NULL,
  `report_date` datetime(6) DEFAULT NULL,
  `report_type` enum('Customer','Order','Product','Sales') NOT NULL,
  `total_amount` decimal(38,2) DEFAULT NULL,
  `total_customers` int DEFAULT NULL,
  `total_orders` int DEFAULT NULL,
  `total_products` int DEFAULT NULL,
  PRIMARY KEY (`reportID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reports`
--

LOCK TABLES `reports` WRITE;
/*!40000 ALTER TABLE `reports` DISABLE KEYS */;
/*!40000 ALTER TABLE `reports` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review_images`
--

DROP TABLE IF EXISTS `review_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `review_images` (
  `imageID` int NOT NULL AUTO_INCREMENT,
  `reviewID` int DEFAULT NULL,
  `imageURL` varchar(255) NOT NULL,
  `uploadDate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `upload_date` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`imageID`),
  KEY `reviewID` (`reviewID`),
  CONSTRAINT `review_images_ibfk_1` FOREIGN KEY (`reviewID`) REFERENCES `reviews` (`reviewID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review_images`
--

LOCK TABLES `review_images` WRITE;
/*!40000 ALTER TABLE `review_images` DISABLE KEYS */;
/*!40000 ALTER TABLE `review_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviews` (
  `reviewID` int NOT NULL AUTO_INCREMENT,
  `userID` int DEFAULT NULL,
  `productID` int DEFAULT NULL,
  `rating` int DEFAULT NULL,
  `comment` varchar(255) DEFAULT NULL,
  `reviewDate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `reviewType` enum('product','shop','shipper') NOT NULL DEFAULT 'product',
  `review_date` datetime(6) DEFAULT NULL,
  `review_type` enum('product','shipper','shop') NOT NULL,
  PRIMARY KEY (`reviewID`),
  KEY `userID` (`userID`),
  KEY `productID` (`productID`),
  CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`),
  CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`productID`) REFERENCES `products` (`productID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
INSERT INTO `reviews` VALUES (1,2,1,5,'Excellent pho! Very authentic taste.','2025-07-01 02:07:26','product',NULL,'product'),(2,2,5,4,'Good coffee, but could be stronger.','2025-07-01 02:07:26','product',NULL,'product'),(3,3,3,4,'Great burger, but delivery was a bit slow.','2025-07-01 02:07:26','product',NULL,'product');
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `roleID` int NOT NULL AUTO_INCREMENT,
  `roleName` varchar(50) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `permissions` json DEFAULT NULL,
  `isActive` tinyint(1) DEFAULT '1',
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `role_name` varchar(50) NOT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `is_active` bit(1) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`roleID`),
  UNIQUE KEY `roleName` (`roleName`),
  UNIQUE KEY `UKovpqau8r3lgfnmak7xyel2bt0` (`role_name`),
  KEY `idx_roles_active` (`isActive`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'ADMIN','System Administrator',NULL,1,'2025-07-01 02:03:51','2025-07-01 02:03:51','ADMIN',NULL,_binary '',NULL),(2,'CUSTOMER','Regular Customer',NULL,1,'2025-07-01 02:03:51','2025-07-01 02:03:51','CUSTOMER',NULL,_binary '',NULL),(3,'SHOP_OWNER','Shop Owner',NULL,1,'2025-07-01 02:03:51','2025-07-01 02:03:51','SHOP_OWNER',NULL,_binary '',NULL),(4,'SHIPPER','Delivery Person',NULL,1,'2025-07-01 02:03:51','2025-07-01 02:03:51','SHIPPER',NULL,_binary '',NULL);
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shipments`
--

DROP TABLE IF EXISTS `shipments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shipments` (
  `shipmentID` int NOT NULL AUTO_INCREMENT,
  `orderID` int DEFAULT NULL,
  `shipperID` int DEFAULT NULL,
  `deliveryStatus` enum('Pending','Out for Delivery','Delivered') DEFAULT 'Pending',
  `deliveryDate` timestamp NULL DEFAULT NULL,
  `delivery_date` datetime(6) DEFAULT NULL,
  `delivery_status` enum('Delivered','Out_for_Delivery','Pending') DEFAULT NULL,
  PRIMARY KEY (`shipmentID`),
  KEY `orderID` (`orderID`),
  KEY `shipperID` (`shipperID`),
  CONSTRAINT `shipments_ibfk_1` FOREIGN KEY (`orderID`) REFERENCES `orders` (`orderID`),
  CONSTRAINT `shipments_ibfk_2` FOREIGN KEY (`shipperID`) REFERENCES `users` (`userID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shipments`
--

LOCK TABLES `shipments` WRITE;
/*!40000 ALTER TABLE `shipments` DISABLE KEYS */;
INSERT INTO `shipments` VALUES (1,1,6,'Delivered','2025-06-30 07:30:00',NULL,'Delivered'),(2,2,7,'Out for Delivery',NULL,NULL,'Out_for_Delivery'),(3,3,6,'Pending',NULL,NULL,'Pending');
/*!40000 ALTER TABLE `shipments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shipper_payouts`
--

DROP TABLE IF EXISTS `shipper_payouts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shipper_payouts` (
  `payoutID` int NOT NULL AUTO_INCREMENT,
  `orderID` int DEFAULT NULL,
  `shipperID` int DEFAULT NULL,
  `payoutAmount` decimal(10,2) NOT NULL,
  `payoutDate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `status` enum('Completed','Failed','Pending','Processing') DEFAULT NULL,
  `transactionID` varchar(255) DEFAULT NULL,
  `payout_amount` decimal(38,2) NOT NULL,
  `payout_date` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`payoutID`),
  UNIQUE KEY `orderID` (`orderID`),
  UNIQUE KEY `UKllu57cut936dmjhhakfg3ik9p` (`orderID`),
  KEY `shipperID` (`shipperID`),
  CONSTRAINT `shipper_payouts_ibfk_1` FOREIGN KEY (`orderID`) REFERENCES `orders` (`orderID`),
  CONSTRAINT `shipper_payouts_ibfk_2` FOREIGN KEY (`shipperID`) REFERENCES `users` (`userID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shipper_payouts`
--

LOCK TABLES `shipper_payouts` WRITE;
/*!40000 ALTER TABLE `shipper_payouts` DISABLE KEYS */;
INSERT INTO `shipper_payouts` VALUES (1,1,6,15000.00,'2025-07-01 02:07:52','Completed',NULL,15000.00,NULL),(2,2,7,15000.00,'2025-07-01 02:07:52','Processing',NULL,15000.00,NULL);
/*!40000 ALTER TABLE `shipper_payouts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shop_payouts`
--

DROP TABLE IF EXISTS `shop_payouts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shop_payouts` (
  `payoutID` int NOT NULL AUTO_INCREMENT,
  `orderID` int DEFAULT NULL,
  `shopID` int DEFAULT NULL,
  `payoutAmount` decimal(10,2) NOT NULL,
  `payoutDate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `status` enum('Completed','Failed','Pending','Processing') DEFAULT NULL,
  `transactionID` varchar(255) DEFAULT NULL,
  `payout_amount` decimal(38,2) NOT NULL,
  `payout_date` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`payoutID`),
  UNIQUE KEY `orderID` (`orderID`),
  UNIQUE KEY `UK1sysshjdw2s760yrwwv16i0j4` (`orderID`),
  KEY `shopID` (`shopID`),
  CONSTRAINT `shop_payouts_ibfk_1` FOREIGN KEY (`orderID`) REFERENCES `orders` (`orderID`),
  CONSTRAINT `shop_payouts_ibfk_2` FOREIGN KEY (`shopID`) REFERENCES `shops` (`shopID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shop_payouts`
--

LOCK TABLES `shop_payouts` WRITE;
/*!40000 ALTER TABLE `shop_payouts` DISABLE KEYS */;
INSERT INTO `shop_payouts` VALUES (1,1,1,67500.00,'2025-07-01 02:07:48','Completed',NULL,67500.00,NULL),(2,2,2,121500.00,'2025-07-01 02:07:48','Processing',NULL,121500.00,NULL);
/*!40000 ALTER TABLE `shop_payouts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shops`
--

DROP TABLE IF EXISTS `shops`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shops` (
  `shopID` int NOT NULL AUTO_INCREMENT,
  `shopName` varchar(100) NOT NULL,
  `ownerID` int DEFAULT NULL,
  `address` varchar(255) NOT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `rating` decimal(38,2) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `status` enum('active','banned','pending') DEFAULT NULL,
  `logoURL` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `shop_name` varchar(100) NOT NULL,
  PRIMARY KEY (`shopID`),
  KEY `ownerID` (`ownerID`),
  CONSTRAINT `shops_ibfk_1` FOREIGN KEY (`ownerID`) REFERENCES `users` (`userID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shops`
--

LOCK TABLES `shops` WRITE;
/*!40000 ALTER TABLE `shops` DISABLE KEYS */;
INSERT INTO `shops` VALUES (1,'Pho 24',4,'100 Nguyen Hue Street, District 1, HCMC','0283123456',4.50,'2025-07-01 02:05:27','active',NULL,NULL,'Pho 24'),(2,'Burger King Vietnam',5,'200 Le Thanh Ton Street, District 1, HCMC','0283123457',4.20,'2025-07-01 02:05:27','active',NULL,NULL,'Burger King Vietnam'),(3,'Highlands Coffee',4,'300 Dong Khoi Street, District 1, HCMC','0283123458',4.70,'2025-07-01 02:05:27','active',NULL,NULL,'Highlands Coffee'),(4,'Pho 24',4,'100 Nguyen Hue Street, District 1, HCMC','0283123456',4.50,'2025-07-01 02:06:46','active',NULL,NULL,'Pho 24'),(5,'Burger King Vietnam',5,'200 Le Thanh Ton Street, District 1, HCMC','0283123457',4.20,'2025-07-01 02:06:46','active',NULL,NULL,'Burger King Vietnam'),(6,'Highlands Coffee',4,'300 Dong Khoi Street, District 1, HCMC','0283123458',4.70,'2025-07-01 02:06:46','active',NULL,NULL,'Highlands Coffee');
/*!40000 ALTER TABLE `shops` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `statistics`
--

DROP TABLE IF EXISTS `statistics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `statistics` (
  `statID` int NOT NULL AUTO_INCREMENT,
  `statType` enum('Product','Order','Customer','Review') NOT NULL,
  `weekOfYear` int DEFAULT NULL,
  `monthOfYear` int DEFAULT NULL,
  `total` int DEFAULT NULL,
  `avgRating` decimal(3,2) DEFAULT NULL,
  `details` varchar(255) DEFAULT NULL,
  `statDate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `avg_rating` decimal(38,2) DEFAULT NULL,
  `month_of_year` int DEFAULT NULL,
  `stat_date` datetime(6) DEFAULT NULL,
  `stat_type` enum('Customer','Order','Product','Review') NOT NULL,
  `week_of_year` int DEFAULT NULL,
  PRIMARY KEY (`statID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `statistics`
--

LOCK TABLES `statistics` WRITE;
/*!40000 ALTER TABLE `statistics` DISABLE KEYS */;
/*!40000 ALTER TABLE `statistics` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tokens`
--

DROP TABLE IF EXISTS `tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tokens` (
  `tokenID` int NOT NULL AUTO_INCREMENT,
  `userID` int NOT NULL,
  `token` varchar(512) NOT NULL,
  `tokenType` enum('ACCESS','REFRESH','EMAIL_VERIFICATION','PASSWORD_RESET','TWO_FACTOR') DEFAULT 'ACCESS',
  `issuedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `expiresAt` timestamp NULL DEFAULT NULL,
  `revoked` tinyint(1) DEFAULT '0',
  `deviceInfo` varchar(255) DEFAULT NULL,
  `ipAddress` varchar(45) DEFAULT NULL,
  `userAgent` varchar(255) DEFAULT NULL,
  `lastUsedAt` timestamp NULL DEFAULT NULL,
  `device_info` varchar(255) DEFAULT NULL,
  `expires_at` datetime(6) DEFAULT NULL,
  `ip_address` varchar(255) DEFAULT NULL,
  `issued_at` datetime(6) DEFAULT NULL,
  `last_used_at` datetime(6) DEFAULT NULL,
  `token_type` enum('ACCESS','EMAIL_VERIFICATION','PASSWORD_RESET','REFRESH','TWO_FACTOR') NOT NULL,
  `user_agent` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`tokenID`),
  KEY `idx_tokens_user_device` (`userID`,`deviceInfo`),
  KEY `idx_tokens_token_type` (`tokenType`),
  KEY `idx_tokens_expires_at` (`expiresAt`),
  KEY `idx_tokens_cleanup` (`expiresAt`,`revoked`),
  CONSTRAINT `tokens_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tokens`
--

LOCK TABLES `tokens` WRITE;
/*!40000 ALTER TABLE `tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `topping_categories`
--

DROP TABLE IF EXISTS `topping_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `topping_categories` (
  `categoryID` int NOT NULL AUTO_INCREMENT,
  `categoryName` varchar(100) NOT NULL,
  `category_name` varchar(100) NOT NULL,
  PRIMARY KEY (`categoryID`),
  UNIQUE KEY `categoryName` (`categoryName`),
  UNIQUE KEY `UKp437bp9wsynxeem0emcxc73cf` (`category_name`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `topping_categories`
--

LOCK TABLES `topping_categories` WRITE;
/*!40000 ALTER TABLE `topping_categories` DISABLE KEYS */;
INSERT INTO `topping_categories` VALUES (1,'Sauce','Sauce'),(2,'Extra Meat','Extra Meat'),(3,'Vegetables','Vegetables'),(4,'Cheese','Cheese');
/*!40000 ALTER TABLE `topping_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_roles`
--

DROP TABLE IF EXISTS `user_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_roles` (
  `userRoleID` int NOT NULL AUTO_INCREMENT,
  `userID` int NOT NULL,
  `roleID` int NOT NULL,
  `assignedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `assignedBy` int DEFAULT NULL,
  `assigned_at` datetime(6) DEFAULT NULL,
  `assigned_by` int DEFAULT NULL,
  PRIMARY KEY (`userRoleID`),
  KEY `userID` (`userID`),
  KEY `roleID` (`roleID`),
  KEY `idx_user_roles_assigned_by` (`assignedBy`),
  KEY `idx_user_roles_assigned_at` (`assignedAt`),
  KEY `FKljgw07fam7v71ok817u4rvyro` (`assigned_by`),
  CONSTRAINT `fk_user_roles_assigned_by` FOREIGN KEY (`assignedBy`) REFERENCES `users` (`userID`) ON DELETE SET NULL,
  CONSTRAINT `FKljgw07fam7v71ok817u4rvyro` FOREIGN KEY (`assigned_by`) REFERENCES `users` (`userID`),
  CONSTRAINT `user_roles_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`),
  CONSTRAINT `user_roles_ibfk_2` FOREIGN KEY (`roleID`) REFERENCES `roles` (`roleID`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_roles`
--

LOCK TABLES `user_roles` WRITE;
/*!40000 ALTER TABLE `user_roles` DISABLE KEYS */;
INSERT INTO `user_roles` VALUES (1,1,1,'2025-07-01 02:05:27',NULL,NULL,NULL),(2,2,2,'2025-07-01 02:05:27',NULL,NULL,NULL),(3,3,2,'2025-07-01 02:05:27',NULL,NULL,NULL),(4,4,3,'2025-07-01 02:05:27',NULL,NULL,NULL),(5,5,3,'2025-07-01 02:05:27',NULL,NULL,NULL),(6,6,4,'2025-07-01 02:05:27',NULL,NULL,NULL),(7,7,4,'2025-07-01 02:05:27',NULL,NULL,NULL),(8,1,1,'2025-07-01 02:06:33',NULL,NULL,NULL),(9,2,2,'2025-07-01 02:06:33',NULL,NULL,NULL),(10,3,2,'2025-07-01 02:06:33',NULL,NULL,NULL),(11,4,3,'2025-07-01 02:06:33',NULL,NULL,NULL),(12,5,3,'2025-07-01 02:06:33',NULL,NULL,NULL),(13,6,4,'2025-07-01 02:06:33',NULL,NULL,NULL),(14,7,4,'2025-07-01 02:06:33',NULL,NULL,NULL);
/*!40000 ALTER TABLE `user_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_vouchers`
--

DROP TABLE IF EXISTS `user_vouchers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_vouchers` (
  `userVoucherID` int NOT NULL AUTO_INCREMENT,
  `userID` int DEFAULT NULL,
  `voucherID` int DEFAULT NULL,
  PRIMARY KEY (`userVoucherID`),
  KEY `userID` (`userID`),
  KEY `voucherID` (`voucherID`),
  CONSTRAINT `user_vouchers_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`),
  CONSTRAINT `user_vouchers_ibfk_2` FOREIGN KEY (`voucherID`) REFERENCES `vouchers` (`voucherID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_vouchers`
--

LOCK TABLES `user_vouchers` WRITE;
/*!40000 ALTER TABLE `user_vouchers` DISABLE KEYS */;
INSERT INTO `user_vouchers` VALUES (1,2,1),(2,2,3),(3,3,1),(4,3,2),(5,3,4);
/*!40000 ALTER TABLE `user_vouchers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `userID` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `provider` varchar(255) DEFAULT NULL,
  `providerId` varchar(100) DEFAULT NULL,
  `isActive` tinyint(1) DEFAULT '1',
  `avatarURL` varchar(255) DEFAULT NULL,
  `lastLogin` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `emailVerified` tinyint(1) DEFAULT '0',
  `emailVerifiedAt` timestamp NULL DEFAULT NULL,
  `loginAttempts` int DEFAULT '0',
  `lockedUntil` timestamp NULL DEFAULT NULL,
  `twoFactorEnabled` tinyint(1) DEFAULT '0',
  `twoFactorSecret` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `email_verified` bit(1) DEFAULT NULL,
  `email_verified_at` datetime(6) DEFAULT NULL,
  `is_active` bit(1) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `locked_until` datetime(6) DEFAULT NULL,
  `login_attempts` int DEFAULT NULL,
  `provider_id` varchar(255) DEFAULT NULL,
  `two_factor_enabled` bit(1) DEFAULT NULL,
  `two_factor_secret` varchar(255) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`userID`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `UKr43af9ap4edm43mmtq01oddj6` (`username`),
  UNIQUE KEY `UK6dotkott2kjsp8vw4d0m25fb7` (`email`),
  KEY `idx_users_email_verified` (`emailVerified`),
  KEY `idx_users_locked_until` (`lockedUntil`),
  KEY `idx_users_login_attempts` (`loginAttempts`),
  KEY `idx_users_provider_lookup` (`provider`,`providerId`),
  KEY `idx_users_email_active` (`email`,`isActive`),
  KEY `idx_users_username_active` (`username`,`isActive`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin','$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z2EQObs/Nhgs/y0bzwDM9squ','admin@shopeefood.com','0901234567','2025-07-01 02:05:27','local',NULL,1,NULL,NULL,'2025-07-01 02:05:27',1,NULL,0,NULL,0,NULL,NULL,_binary '',NULL,_binary '',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(2,'customer1','$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z2EQObs/Nhgs/y0bzwDM9squ','customer1@gmail.com','0901234568','2025-07-01 02:05:27','local',NULL,1,NULL,NULL,'2025-07-01 02:05:27',1,NULL,0,NULL,0,NULL,NULL,_binary '',NULL,_binary '',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(3,'customer2','$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z2EQObs/Nhgs/y0bzwDM9squ','customer2@gmail.com','0901234569','2025-07-01 02:05:27','local',NULL,1,NULL,NULL,'2025-07-01 02:05:27',1,NULL,0,NULL,0,NULL,NULL,_binary '',NULL,_binary '',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(4,'shopowner1','$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z2EQObs/Nhgs/y0bzwDM9squ','shop1@business.com','0901234570','2025-07-01 02:05:27','local',NULL,1,NULL,NULL,'2025-07-01 02:05:27',1,NULL,0,NULL,0,NULL,NULL,_binary '',NULL,_binary '',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(5,'shopowner2','$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z2EQObs/Nhgs/y0bzwDM9squ','shop2@business.com','0901234571','2025-07-01 02:05:27','local',NULL,1,NULL,NULL,'2025-07-01 02:05:27',1,NULL,0,NULL,0,NULL,NULL,_binary '',NULL,_binary '',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(6,'shipper1','$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z2EQObs/Nhgs/y0bzwDM9squ','shipper1@delivery.com','0901234572','2025-07-01 02:05:27','local',NULL,1,NULL,NULL,'2025-07-01 02:05:27',1,NULL,0,NULL,0,NULL,NULL,_binary '',NULL,_binary '',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(7,'shipper2','$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z2EQObs/Nhgs/y0bzwDM9squ','shipper2@delivery.com','0901234573','2025-07-01 02:05:27','local',NULL,1,NULL,NULL,'2025-07-01 02:05:27',1,NULL,0,NULL,0,NULL,NULL,_binary '',NULL,_binary '',NULL,NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vouchers`
--

DROP TABLE IF EXISTS `vouchers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vouchers` (
  `voucherID` int NOT NULL AUTO_INCREMENT,
  `code` varchar(50) NOT NULL,
  `discount` decimal(38,2) NOT NULL,
  `expiryDate` date NOT NULL,
  `voucherType` enum('System','Shop') NOT NULL,
  `shopID` int DEFAULT NULL,
  `expiry_date` date NOT NULL,
  `voucher_type` enum('Shop','System') NOT NULL,
  PRIMARY KEY (`voucherID`),
  UNIQUE KEY `code` (`code`),
  UNIQUE KEY `UK30ftp2biebbvpik8e49wlmady` (`code`),
  KEY `shopID` (`shopID`),
  CONSTRAINT `vouchers_ibfk_1` FOREIGN KEY (`shopID`) REFERENCES `shops` (`shopID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vouchers`
--

LOCK TABLES `vouchers` WRITE;
/*!40000 ALTER TABLE `vouchers` DISABLE KEYS */;
INSERT INTO `vouchers` VALUES (1,'WELCOME10',10000.00,'2025-12-31','System',NULL,'2025-12-31','System'),(2,'NEWUSER20',20000.00,'2025-12-31','System',NULL,'2025-12-31','System'),(3,'PHO24SALE',15000.00,'2025-08-31','Shop',1,'2025-08-31','Shop'),(4,'BURGER50',50000.00,'2025-09-30','Shop',2,'2025-09-30','Shop');
/*!40000 ALTER TABLE `vouchers` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-07-07  9:50:21
