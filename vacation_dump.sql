-- MySQL dump 10.13  Distrib 8.2.0, for Linux (x86_64)
--
-- Host: localhost    Database: vacation
-- ------------------------------------------------------
-- Server version	8.2.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `followers`
--

DROP TABLE IF EXISTS `followers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `followers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int DEFAULT NULL,
  `vacationId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_d052aca09cecd2e9b8b94e3c671` (`userId`),
  KEY `FK_c1b51f72aca0002c70aeeaa9895` (`vacationId`),
  CONSTRAINT `FK_c1b51f72aca0002c70aeeaa9895` FOREIGN KEY (`vacationId`) REFERENCES `vacation` (`id`),
  CONSTRAINT `FK_d052aca09cecd2e9b8b94e3c671` FOREIGN KEY (`userId`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `followers`
--

LOCK TABLES `followers` WRITE;
/*!40000 ALTER TABLE `followers` DISABLE KEYS */;
/*!40000 ALTER TABLE `followers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('USER','ADMIN') NOT NULL DEFAULT 'USER',
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'john.doe@gmail.com','John','Doe','$2b$12$CJ6bdWetbUASr0Ugu5D7vOT2WNW8KluzlZJp1bOLbAHgHBXyeZz42','USER'),(3,'admin@gmail.com','admin','admin','$2b$12$MkdOLBabKg2lXXdWlFTZde6H9qZTt7ymPVJyVmnkRzD9AI1FLIUIi','ADMIN');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vacation`
--

DROP TABLE IF EXISTS `vacation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vacation` (
  `id` int NOT NULL AUTO_INCREMENT,
  `destination` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `price` decimal(10,0) NOT NULL,
  `picture` text NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vacation`
--

LOCK TABLES `vacation` WRITE;
/*!40000 ALTER TABLE `vacation` DISABLE KEYS */;
INSERT INTO `vacation` VALUES (3,'The Great Barrier Reef, Australia','Dive into a kaleidoscope of color:\r\n Explore the Great Barrier Reef!',155,'6ccd73e5-a63d-4859-b517-9019584d7b59barrier-reef.jpg','2024-06-17','2024-06-20'),(4,'The Pyramids of Giza, Egypt','Witness the wonders of the ancient world:\r\n Stand tall beside the Pyramids of Giza!',226,'29f34c59-d7d4-44eb-b681-9eb760aab19dgiza1.jpg','2024-06-18','2024-06-22'),(5,'Machu Picchu, Peru','Hike to a hidden city in the clouds: Discover the magic of Machu Picchu!',1112,'d0267d03-02d4-48ac-bc2f-25fea13ec622Machu_Picchu,_Peru.jpg','2024-06-20','2024-07-07'),(6,'The Northern Lights, Iceland','Dance beneath a celestial ballet: Be mesmerized by the Northern Lights in Iceland!',321,'e8a94145-cdb2-45fa-9c40-4058ff1fd60daurora1.jpg','2024-06-12','2024-06-13'),(7,'The Taj Mahal, India','A monument to love that transcends time:\r\n Fall in love with the Taj Mahal!',449,'8463fca4-a453-4c92-b04f-2f54f946673cTaj_Mahal_1.jpeg','2024-06-24','2024-07-07'),(8,'The Grand Canyon, USA','Stand on the edge of eternity: Explore the vastness of the Grand Canyon!',221,'6d0f678f-11b6-4f26-8764-84093c3ae29cCanyon_River_Tree_1.jpeg','2024-06-11','2024-06-15'),(9,'The Colosseum, Rome','Step into the heart of Roman history: Enter the gladiatorial arena of the Colosseum!',221,'612e9cf7-a6bb-4076-827d-1258d76a7a9dColosseo_2020.jpg','2024-06-13','2024-06-20'),(10,'The Great Wall of China','Walk where emperors once tread:\r\n Journey along the Great Wall of China!',332,'8c1bb530-4d26-4269-ad4a-cdb8bfb953c1GreatWall_2004_Summer_1A.jpg','2024-06-18','2024-07-05'),(11,'The Serengeti National Park, Tanzania','Witness the greatest wildlife migration on Earth: Go on safari in the Serengeti!',435,'f0d46112-b2af-4a16-93cb-9c7bb2042693serengeti1.jpg','2024-07-04','2024-07-07'),(12,'Petra, Jordan','Unveil the rose-red city of mystery: Explore the ancient ruins of Petra!',112,'6d72064c-7bbd-49e6-8466-68e38daa0813Treasury_petra_crop.jpeg','2024-06-11','2024-06-12'),(13,'The Eiffel Tower, Paris','Reach for the sky in the City of Lights:\r\n Ascend the Eiffel Tower!',225,'a18af8c9-df86-4a90-a075-ef8d4889fa59800px-Tour_Eiffel_Wikimedia_Commons_(cropped).jpg','2024-06-14','2024-06-16'),(14,'Ha Long Bay, Vietnam','Cruise amidst towering limestone pillars: Discover the beauty of Ha Long Bay!',436,'cb276c94-6db2-4f2b-95f0-23e8c10d31cehalong-bay-vietnam-from-above-gettyimages.jpg','2024-06-27','2024-07-04'),(15,' The Great Barrier Island, New Zealand','Find paradise on a secluded island:\r\n Escape to Great Barrier Island!',1123,'3af5ddd8-a3ec-4dcb-927e-596086415facbarrier-reef.jpg','2024-06-12','2024-06-13'),(16,'The Inca Trail, Peru','Trek through breathtaking landscapes:\r\n Follow the footsteps of the Inca!',214,'3ff20307-5154-49e0-b152-ac0467137681inca-trail-1.jpg','2024-06-20','2024-06-22'),(17,'The Scottish Highlands, Scotland','Explore a land of rugged beauty: Hike through the majestic Scottish Highlands!\r\n\r\n',224,'ee10712b-d6fe-469a-9d0d-dd31ac98884escotish-highlands-1.jpg','2024-06-11','2024-06-21');
/*!40000 ALTER TABLE `vacation` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-13 17:01:03
