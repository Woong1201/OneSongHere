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
-- Table structure for table `BOARD`
--

DROP TABLE IF EXISTS `BOARD`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `BOARD` (
  `BOARD_ID` int unsigned NOT NULL,
  `BOARD_CONTENT` text,
  `BOARD_DATE` datetime(6) DEFAULT NULL,
  `BOARD_TITLE` varchar(30) DEFAULT NULL,
  `HEADER` varchar(10) DEFAULT NULL,
  `USER_ID` int unsigned DEFAULT NULL,
  PRIMARY KEY (`BOARD_ID`),
  KEY `FKpfppqshsp3uxsn658pcvps4ck` (`USER_ID`),
  CONSTRAINT `FKpfppqshsp3uxsn658pcvps4ck` FOREIGN KEY (`USER_ID`) REFERENCES `USER` (`USER_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `BOARD`
--

LOCK TABLES `BOARD` WRITE;
/*!40000 ALTER TABLE `BOARD` DISABLE KEYS */;
INSERT INTO `BOARD` VALUES (1,'제가 만든 마작 노래인데 평가 좀요','2023-05-09 15:15:15.000000','평가 해주실분?','홍보',1),(2,'최신 트렌드의 감성을 담은 팝입니다. 어떤가요?','2023-05-10 15:15:15.000000','SM출신 작곡가 평가 좀','잡담',2),(3,'혼자 독학은 좀 어려워서 학원 다니려 하는데 학원은 비추인가요?','2023-05-10 19:10:00.006829','작곡 학원에 다니는건 좀 그런가요?','질문',8),(4,'복날송 리메이크 정말 끝내주네요...','2023-05-11 11:58:26.963185','우와... 복날송 멋지네요.','잡담',8),(5,'군대 전역했더니 요즘 유행하는 노래가 뭔지 모르겠넹네요 ;;','2023-05-11 12:19:10.369235','요즘 유행하는 노래 장르가 뭔가요?','잡담',2),(6,'https://www.youtube.com/watch?v=yyEEoBJ_9hE','2023-05-11 20:12:42.556639','딴딴딴 딴딴딴 딴딴딴','홍보',8),(7,'달빛천사 OST 리메이크 하실분 구해요','2023-05-11 20:00:33.391666','달빛천사 노래 리메이크 하실분 구해요','구인',5),(8,'이제 막 피아노를 배워서 잘은 못합니다. 즐기며 하실 분 구해요. \nhttps://www.youtube.com/watch?v=SjYecEQFL0U','2023-05-11 20:04:42.625010','캐논 같이 편곡해보실 분 계신가요?','구인',8),(9,'현재 좋은 작곡을 하시는 아티스트분들을 모집 중입니다. 연락주세요','2023-05-11 20:11:45.123018','Hero엔터테인먼트에서 작곡가분을 모집합니다.','홍보',1),(10,'뉴진스의 하입보이요.\nhttps://www.youtube.com/watch?v=11cta61wi0g','2023-05-12 09:09:47.073682','홍대 어떻게 가는지 아시나요?','잡담',8),(11,'현재 22살 대학생이고 작곡가를 꿈 꾸고 있습니다. 어떻게 해야할지 막막한데 상담해주실 분 계신가요?','2023-05-12 17:25:32.661107','작곡가 지망생인데 상담해주실 분 구해요','잡담',6),(12,'아이묭의 사랑을 전하고 싶다든가 입니다.\n많은 관심 부탁드립니다.\n아이묭 사랑해\nhttps://www.youtube.com/watch?v=B7ypdHnjlDI','2023-05-12 20:53:32.958685','제가 요즘에 가장 좋아하는 음악입니다.','홍보',7),(13,'힙합 좀 잘아시는 분 오시면 좋겠습니다','2023-05-14 22:41:11.433792','믹스테잎에 들어갈 비트 만드실 분 구해요','구인',3),(14,'천방지축 어리둥절 빙글빙글 돌아가는 두현의 하루\n우리의 두현이는 정말 못말려~','2023-05-14 23:53:49.617416','하나 둘 셋 야','잡담',44),(15,'작품 탭에 가면 제가 흰수염고래 노래 만든게 있습니다 ㅎㅎ 한 번씩 들어주시면 감사하겠습니다! ','2023-05-15 23:53:58.065479','작품에 흰수염고래 노래 좋아요 좀 눌러주세요','홍보',4),(16,'저와 닮은 젓가락을 보고 악상이 떠올라 저질러 버렸습니다.\n세상을 놀라게 할 음악을 작곡해버린걸지도?','2023-05-16 23:54:03.333144','젓가락을 보고 떠오른 음악','홍보',8);
/*!40000 ALTER TABLE `BOARD` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-18 19:28:52
