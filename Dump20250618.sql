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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
  `description` varchar(255) DEFAULT NULL,
  `ipAddress` varchar(45) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `created_at` datetime(6) DEFAULT NULL,
  `ip_address` varchar(255) DEFAULT NULL,
  `target_type` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`logID`),
  KEY `userID` (`userID`),
  CONSTRAINT `auditlogs_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `roleID` int NOT NULL AUTO_INCREMENT,
  `roleName` varchar(50) NOT NULL,
  `role_name` varchar(50) NOT NULL,
  PRIMARY KEY (`roleID`),
  UNIQUE KEY `roleName` (`roleName`),
  UNIQUE KEY `UKovpqau8r3lgfnmak7xyel2bt0` (`role_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
-- Table structure for table `tokens`
--

DROP TABLE IF EXISTS `tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tokens` (
  `tokenID` int NOT NULL AUTO_INCREMENT,
  `userID` int NOT NULL,
  `token` varchar(512) NOT NULL,
  `tokenType` enum('ACCESS','REFRESH') DEFAULT 'ACCESS',
  `issuedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `expiresAt` timestamp NULL DEFAULT NULL,
  `revoked` tinyint(1) DEFAULT '0',
  `deviceInfo` varchar(255) DEFAULT NULL,
  `ipAddress` varchar(45) DEFAULT NULL,
  `userAgent` varchar(255) DEFAULT NULL,
  `device_info` varchar(255) DEFAULT NULL,
  `expires_at` datetime(6) DEFAULT NULL,
  `ip_address` varchar(255) DEFAULT NULL,
  `issued_at` datetime(6) DEFAULT NULL,
  `token_type` enum('ACCESS','REFRESH') NOT NULL,
  `user_agent` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`tokenID`),
  KEY `userID` (`userID`),
  CONSTRAINT `tokens_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
  PRIMARY KEY (`userRoleID`),
  KEY `userID` (`userID`),
  KEY `roleID` (`roleID`),
  CONSTRAINT `user_roles_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`),
  CONSTRAINT `user_roles_ibfk_2` FOREIGN KEY (`roleID`) REFERENCES `roles` (`roleID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
  `created_at` datetime(6) DEFAULT NULL,
  `is_active` bit(1) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `provider_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`userID`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `UKr43af9ap4edm43mmtq01oddj6` (`username`),
  UNIQUE KEY `UK6dotkott2kjsp8vw4d0m25fb7` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-18 10:06:45
