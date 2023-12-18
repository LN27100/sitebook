-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:3306
-- Généré le : mar. 12 déc. 2023 à 13:48
-- Version du serveur : 8.0.30
-- Version de PHP : 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `sitebook`
--

-- --------------------------------------------------------

--
-- Structure de la table `client_`
--

CREATE TABLE `client_` (
  `USR_ID_` int NOT NULL,
  `USER_FIRSTNAME` varchar(50) DEFAULT NULL,
  `USER_LASTNAME` varchar(50) DEFAULT NULL,
  `USER_MAIL` varchar(50) DEFAULT NULL,
  `USER_PASSWORD` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `client_`
--

INSERT INTO `client_` (`USR_ID_`, `USER_FIRSTNAME`, `USER_LASTNAME`, `USER_MAIL`, `USER_PASSWORD`) VALUES
(11, 'John', 'Doe', 'john.doe@gmail.com', 'Dhojoi2#'),
(12, 'Jane', 'Smith', 'jane.smith@outlook.fr', '154Frfdzr.'),
(13, 'Bob', 'Johnson', 'bob.johnson@gmail.com', 'vfqEfv@1'),
(14, 'Alice', 'Williams', 'alice.williams@hotmail.com', 'Bgvcnkj,olp'),
(15, 'Charlie', 'Brown', 'charlie.brown@outlook.fr', '1,jnk@D)'),
(16, 'Eva', 'Martinez', 'eva.martinez@outlook.fr', 'FGdfgr7#'),
(17, 'David', 'Lee', 'david.lee@yahoo.com', 'vfD766.'),
(18, 'Sophie', 'Chen', 'sophie.chen@gmail.com', 'fezD6_iu99'),
(19, 'Michael', 'Nguyen', 'michael.nguyen@laposte.net', 'Ln27100#'),
(20, 'Olivia', 'Garcia', 'olivia.garcia@gmail.com', 'Rabia1987@');

-- --------------------------------------------------------

--
-- Structure de la table `product`
--

CREATE TABLE `product` (
  `PRODUCT_ID_` int NOT NULL,
  `PRODUCT_DESCRIPTION` varchar(100) DEFAULT NULL,
  `PRODUCT_PICTURE` varchar(50) DEFAULT NULL,
  `PRODUCT_STOCK` int DEFAULT NULL,
  `PRODUCT_PRICE` decimal(9,2) DEFAULT NULL,
  `PRODUCT_REF` varchar(50) DEFAULT NULL,
  `TYPE_ID` int NOT NULL,
  `SPL_ID` int NOT NULL,
  `product_name` varchar(50) DEFAULT NULL,
  `¨PRODUCT_AUTOR` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `product`
--

INSERT INTO `product` (`PRODUCT_ID_`, `PRODUCT_DESCRIPTION`, `PRODUCT_PICTURE`, `PRODUCT_STOCK`, `PRODUCT_PRICE`, `PRODUCT_REF`, `TYPE_ID`, `SPL_ID`, `product_name`, `¨PRODUCT_AUTOR`) VALUES
(1, '', 'REF001picture', 30, 8.90, 'REF001', 1, 1, 'L\'inconnue de la Seine', 'Guillaume Musso'),
(2, '', 'REF002picture', 21, 8.90, 'REF002', 1, 1, 'Skidamarink', 'Guillaume Musso'),
(3, '', 'REF003picture', 5, 12.90, 'REF003', 1, 1, 'Marche ou Crève', 'Stephen King'),
(4, '', 'REF004picture', 52, 7.90, 'REF004', 1, 2, 'Le blé en herbe', 'Colette'),
(5, '', 'REF005picture', 2, 12.90, 'REF005', 1, 3, '1991', 'Franck Thilliez'),
(6, '', 'REF006picture', 23, 8.90, 'REF006', 1, 1, 'Cujo', 'Stephen King'),
(7, '', 'REF007picture', 86, 11.90, 'REF007', 1, 1, 'C\'est arrivé la nuit', 'MARC Levy'),
(8, '', 'REF008picture', 13, 8.90, 'REF008', 1, 1, 'L\'été Jonathan', 'marie Dufeutreil'),
(9, '', 'REF009picture', 30, 8.90, 'REF009', 1, 1, 'Jamais sans ma fille', 'Betty Mahmoody'),
(10, '', 'REF010picture', 31, 8.90, 'REF010', 1, 2, 'Pour rien au monde', 'Ken Follet'),
(11, '', 'REF011picture', 10, 8.90, 'REF011', 1, 2, 'Criminel le mal au féminin', 'Pierre Bellemare'),
(12, '', 'REF012picture', 2, 8.90, 'REF012', 1, 1, 'Histoire choc', 'Pierre Bellemare'),
(13, '', 'REF013picture', 8, 8.90, 'REF013', 1, 3, 'Brulée vive', 'Souad'),
(14, '', 'REF014picture', 30, 8.90, 'REF014', 1, 3, '127 heures ', 'Aron Ralston'),
(15, '', 'REF015picture', 20, 8.90, 'REF015', 2, 3, 'Dragon Ball tome 1', 'Toriyama Akira'),
(16, '', 'REF016picture', 20, 8.90, 'REF016', 2, 3, 'Dragon Ball tome 2', 'Toriyama Akira'),
(17, '', 'REF017picture', 20, 8.90, 'REF017', 2, 2, 'Dragon Ball tome 3', 'Toriyama Akira'),
(18, '', 'REF018picture', 1, 8.90, 'REF018', 2, 2, 'City Hunter tome 1 ', 'Tsukasa Hojo'),
(19, '', 'REF019picture', 1, 8.90, 'REF019', 2, 1, 'Cat\'s eye', 'Tsukasa Hojo'),
(20, '', 'REF020picture', 10, 8.90, 'REF020', 3, 2, 'La bible officielle de cookeo', 'Séverine Augé'),
(21, '', 'REF021picture', 30, 8.90, 'REF021', 3, 3, 'La nouvelle chrononutrition', 'Alain Delabosse'),
(22, '', 'REF022picture', 8, 8.90, 'REF022', 1, 3, 'Harry Potter à l\'école des sourciers', 'J.k Rowling'),
(23, '', 'REF023picture', 3, 8.90, 'REF023', 1, 1, 'Harry Potter et la chambre des secrets ', 'J.K Rowling'),
(24, '', 'REF024picture', 3, 8.90, 'REF024', 1, 2, 'Harry Potter et le prisonnier d\'Azcaban ', 'J.K Rowling'),
(25, '', 'REF025picture', 3, 8.90, 'REF025', 1, 1, 'Harry Potter et la coupe de feu ', 'J.K Rowling'),
(26, '', 'REF026picture', 23, 8.90, 'REF026', 3, 1, 'Le grand livre des DIY', 'Emilie Guelpa'),
(27, '', 'REF027picture', 30, 8.90, 'REF027', 1, 1, 'La guerre invisible', 'Leila Minano'),
(28, '', 'REF028picture', 2, 8.90, 'REF028', 1, 3, 'Mauvaise troupe', 'Leila Minano'),
(29, '', 'REF029picture', 12, 8.90, 'REF029', 1, 2, 'L\'armée au féminin', 'Jean Marc Tanguy'),
(30, '', 'REF030picture', 28, 15.90, 'REF030', 3, 2, 'La bible des huiles essentielles', 'Danièle Festy');

-- --------------------------------------------------------

--
-- Structure de la table `review`
--

CREATE TABLE `review` (
  `REVIEW_ID` int NOT NULL,
  `REVIEW_NOTE` int DEFAULT NULL,
  `REVIEW_DESCRIPTION` tinytext,
  `PRODUCT_ID_` int NOT NULL,
  `USR_ID_` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `review`
--

INSERT INTO `review` (`REVIEW_ID`, `REVIEW_NOTE`, `REVIEW_DESCRIPTION`, `PRODUCT_ID_`, `USR_ID_`) VALUES
(61, 5, 'Service excellent, fortement recommandé.', 1, 11),
(62, 4, 'Bonne expérience globale. Pourrait s\'améliorer dans certains domaines.', 2, 12),
(63, 3, 'Service moyen. Place à l\'amélioration.', 3, 13),
(64, 5, 'Fantastique ! Reviendra certainement.', 4, 14),
(65, 2, 'Pas satisfait du service. Doit s\'améliorer.', 4, 12),
(66, 4, 'Excellent rapport qualité-prix.', 5, 12),
(67, 3, 'Expérience correcte, mais pas exceptionnelle.', 2, 18),
(68, 5, 'Personnel et installations incroyables.', 5, 11),
(69, 4, 'Très satisfait du service.', 30, 20),
(70, 2, 'Expérience décevante. Doit être grandement améliorée.', 1, 19),
(71, 4, 'Personnel amical et environnement propre.', 27, 19),
(72, 3, 'Correct, mais il y a de meilleures options disponibles.', 14, 16),
(73, 5, 'Service exceptionnel !', 2, 15),
(74, 4, 'Satisfait de l\'expérience globale.', 14, 11),
(75, 3, 'Service moyen, rien de spécial.', 29, 15),
(76, 5, 'Exceptionnel ! Recommanderais à d\'autres.', 17, 20),
(77, 4, 'Bon service, mais un peu cher.', 26, 11),
(78, 2, 'Expérience désagréable. Doit être considérablement améliorée.', 13, 13),
(79, 4, 'Content du service fourni.', 6, 20),
(80, 3, 'Pourrait être meilleur, mais pas terrible.', 22, 17);

-- --------------------------------------------------------

--
-- Structure de la table `story_order`
--

CREATE TABLE `story_order` (
  `STORY_ID` int NOT NULL,
  `ORDER_DATE` varchar(50) DEFAULT NULL,
  `ORDER_REF` varchar(50) DEFAULT NULL,
  `USR_ID_` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `story_order`
--

INSERT INTO `story_order` (`STORY_ID`, `ORDER_DATE`, `ORDER_REF`, `USR_ID_`) VALUES
(16, '2020-12-31', 'COM001', 11),
(17, '2013-09-01', 'COM004', 18),
(18, '2023-10-04', 'COM12', 14),
(19, '2023-09-01', 'COM17', 16),
(20, '2019-04-04', 'COM18', 17);

-- --------------------------------------------------------

--
-- Structure de la table `supplier`
--

CREATE TABLE `supplier` (
  `SPL_ID` int NOT NULL,
  `SPL_NAME` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `supplier`
--

INSERT INTO `supplier` (`SPL_ID`, `SPL_NAME`) VALUES
(1, 'BookRats'),
(2, 'BookStation'),
(3, 'Bookers');

-- --------------------------------------------------------

--
-- Structure de la table `to_possess`
--

CREATE TABLE `to_possess` (
  `PRODUCT_ID_` int NOT NULL,
  `STORY_ID` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `to_possess`
--

INSERT INTO `to_possess` (`PRODUCT_ID_`, `STORY_ID`) VALUES
(8, 16),
(2, 17),
(12, 18),
(22, 19),
(30, 20);

-- --------------------------------------------------------

--
-- Structure de la table `type`
--

CREATE TABLE `type` (
  `TYPE_ID` int NOT NULL,
  `TYPE_CATEGORIE` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `type`
--

INSERT INTO `type` (`TYPE_ID`, `TYPE_CATEGORIE`) VALUES
(1, 'Littérature'),
(2, 'Manga'),
(3, 'Activités manuelles');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `client_`
--
ALTER TABLE `client_`
  ADD PRIMARY KEY (`USR_ID_`);

--
-- Index pour la table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`PRODUCT_ID_`),
  ADD KEY `TYPE_ID` (`TYPE_ID`),
  ADD KEY `SPL_ID` (`SPL_ID`);

--
-- Index pour la table `review`
--
ALTER TABLE `review`
  ADD PRIMARY KEY (`REVIEW_ID`),
  ADD KEY `PRODUCT_ID_` (`PRODUCT_ID_`),
  ADD KEY `USR_ID_` (`USR_ID_`);

--
-- Index pour la table `story_order`
--
ALTER TABLE `story_order`
  ADD PRIMARY KEY (`STORY_ID`),
  ADD KEY `USR_ID_` (`USR_ID_`);

--
-- Index pour la table `supplier`
--
ALTER TABLE `supplier`
  ADD PRIMARY KEY (`SPL_ID`);

--
-- Index pour la table `to_possess`
--
ALTER TABLE `to_possess`
  ADD PRIMARY KEY (`PRODUCT_ID_`,`STORY_ID`),
  ADD KEY `STORY_ID` (`STORY_ID`);

--
-- Index pour la table `type`
--
ALTER TABLE `type`
  ADD PRIMARY KEY (`TYPE_ID`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `client_`
--
ALTER TABLE `client_`
  MODIFY `USR_ID_` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT pour la table `product`
--
ALTER TABLE `product`
  MODIFY `PRODUCT_ID_` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT pour la table `review`
--
ALTER TABLE `review`
  MODIFY `REVIEW_ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=81;

--
-- AUTO_INCREMENT pour la table `story_order`
--
ALTER TABLE `story_order`
  MODIFY `STORY_ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT pour la table `supplier`
--
ALTER TABLE `supplier`
  MODIFY `SPL_ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `type`
--
ALTER TABLE `type`
  MODIFY `TYPE_ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `product_ibfk_1` FOREIGN KEY (`TYPE_ID`) REFERENCES `type` (`TYPE_ID`),
  ADD CONSTRAINT `product_ibfk_2` FOREIGN KEY (`SPL_ID`) REFERENCES `supplier` (`SPL_ID`);

--
-- Contraintes pour la table `review`
--
ALTER TABLE `review`
  ADD CONSTRAINT `review_ibfk_1` FOREIGN KEY (`PRODUCT_ID_`) REFERENCES `product` (`PRODUCT_ID_`),
  ADD CONSTRAINT `review_ibfk_2` FOREIGN KEY (`USR_ID_`) REFERENCES `client_` (`USR_ID_`);

--
-- Contraintes pour la table `story_order`
--
ALTER TABLE `story_order`
  ADD CONSTRAINT `story_order_ibfk_1` FOREIGN KEY (`USR_ID_`) REFERENCES `client_` (`USR_ID_`);

--
-- Contraintes pour la table `to_possess`
--
ALTER TABLE `to_possess`
  ADD CONSTRAINT `to_possess_ibfk_1` FOREIGN KEY (`PRODUCT_ID_`) REFERENCES `product` (`PRODUCT_ID_`),
  ADD CONSTRAINT `to_possess_ibfk_2` FOREIGN KEY (`STORY_ID`) REFERENCES `story_order` (`STORY_ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
