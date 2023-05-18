-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: k8a808.p.ssafy.io    Database: hero_db
-- ------------------------------------------------------
-- Server version	8.0.33-0ubuntu0.20.04.2

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
-- Table structure for table `USER`
--

DROP TABLE IF EXISTS `USER`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `USER` (
  `USER_ID` int unsigned NOT NULL,
  `UID` varchar(255) DEFAULT NULL,
  `EMAIL` varchar(30) DEFAULT NULL,
  `NICKNAME` varchar(30) DEFAULT NULL,
  `PROFILE_URL` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`USER_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `USER`
--

LOCK TABLES `USER` WRITE;
/*!40000 ALTER TABLE `USER` DISABLE KEYS */;
INSERT INTO `USER` VALUES (1,'AMVKDSSDC','dd@maver.com','HERO','https://lh3.googleusercontent.com/a/AGNmyxaNQyYaev9h6GGZLauFoiZ237I1znN7w2F6Vc2J=s96-c'),(2,'ABCDEFGHI','dh@naver.com','DH','https://lh3.googleusercontent.com/a/AGNmyxaNQyYaev9h6GGZLauFoiZ237I1znN7w2F6Vc2J=s96-c'),(3,'110128356082307349645','variety82p@gmail.com','김창현','https://lh3.googleusercontent.com/a/AGNmyxYKFXEN9y3N2dSUbbPQSNGSWYlt6M_M9d9Tm_8D=s96-c'),(4,'112102747096051576450','duddnd170@ajou.ac.kr','김영웅','https://lh3.googleusercontent.com/a/AGNmyxYLNMVr2VEiZToB7Xsj5s17Mjtz5HC3Va69ivez=s96-c'),(5,'ABCDEFGHI','dh2@naver.com','임두현','https://lh3.googleusercontent.com/a/AGNmyxaNQyYaev9h6GGZLauFoiZ237I1znN7w2F6Vc2J=s96-c'),(6,'ABCDEFGHI','tt@naver.com','임윤아','https://lh3.googleusercontent.com/a/AGNmyxaNQyYaev9h6GGZLauFoiZ237I1znN7w2F6Vc2J=s96-c'),(7,'101661781955801232389','garong0721@gmail.com','김태연','https://lh3.googleusercontent.com/a/AGNmyxbo-T2viaCSXuS8xK29TtSUtXY65utLrMJUKqos=s96-c'),(8,'105164378883481570540','sinsh7001@gmail.com','신선호','https://lh3.googleusercontent.com/a/AGNmyxaNQyYaev9h6GGZLauFoiZ237I1znN7w2F6Vc2J=s96-c'),(44,'101510491296458944510','dhlim715@gmail.com','임두현','https://lh3.googleusercontent.com/a/AGNmyxaddRnTDKMX2YmNrM9G6hst7wPNPmyJN6FHMm-3=s96-c'),(45,'0123','dhlim715@gmail.com','일두현','https://lh3.googleusercontent.com/a/AGNmyxaddRnTDKMX2YmNrM9G6hst7wPNPmyJN6FHMm-3=s96-c'),(46,'0123','dlim715@gmail.com','이두현','https://lh3.googleusercontent.com/a/AGNmyxaddRnTDKMX2YmNrM9G6hst7wPNPmyJN6FHMm-3=s96-c'),(47,'0123','dhim715@gmail.com','LE SSERAFIM (르세라핌)','https://lh3.googleusercontent.com/a/AGNmyxaddRnTDKMX2YmNrM9G6hst7wPNPmyJN6FHMm-3=s96-c'),(48,'0123','im715@gmail.com','IVE (아이브)','https://lh3.googleusercontent.com/a/AGNmyxaddRnTDKMX2YmNrM9G6hst7wPNPmyJN6FHMm-3=s96-c'),(441,'116745950840166882069','onesonghere@gmail.com','song one','https://lh3.googleusercontent.com/a/AGNmyxZCamsKWJtbRkRW7OSbDpIblufXnHDAqXlPo1iv=s96-c'),(452,'109544354831093619209','onesonghere1@gmail.com','SongHere Two','https://lh3.googleusercontent.com/a/AGNmyxaML3ixakUcwy4uQvmeJQhcrL34UgYrsdojJDUH=s96-c'),(472,'100794824805272122144','yesdoo24@gmail.com','임두현','https://lh3.googleusercontent.com/a/AGNmyxbOqaVWPsIisNZOmqrvyMSt-ANaVSZDWfV4GgNC6Q=s96-c'),(495,'114245001120275251306','onesonghere2@gmail.com','SongHere Three','https://lh3.googleusercontent.com/a/AGNmyxZOFbRRO-ZiRNx8cQX-fGRYuF7_iKaSCHQcRdVb=s96-c');
/*!40000 ALTER TABLE `USER` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-18 19:28:53
