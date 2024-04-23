-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : dim. 14 avr. 2024 à 16:54
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `web_s2`
--

-- --------------------------------------------------------

--
-- Structure de la table `categorie`
--

CREATE TABLE `categorie` (
  `id_categorie` int(10) NOT NULL,
  `label` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `categorie`
--

INSERT INTO `categorie` (`id_categorie`, `label`, `url`) VALUES
(1, 'Électronique', 'https://res.cloudinary.com/dxijg3lmb/image/upload/v1712950213/VotreDossier/xcjoob15eoz8o1zlvat9.webp'),
(10, 'Vêtement', 'https://res.cloudinary.com/dxijg3lmb/image/upload/v1712950204/VotreDossier/etgtrkmtbxklltf85vdk.jpg'),
(12, 'Livre', 'https://res.cloudinary.com/dxijg3lmb/image/upload/v1712950323/VotreDossier/a846p9pm59a7iom3ads1.jpg'),
(13, 'Meuble', 'https://res.cloudinary.com/dxijg3lmb/image/upload/v1712950537/VotreDossier/o1inzturw4wzj9nqqavm.jpg'),
(14, 'Nourriture', 'https://res.cloudinary.com/dxijg3lmb/image/upload/v1712950551/VotreDossier/ncodzsptacig2kv95mpu.jpg');

-- --------------------------------------------------------

--
-- Structure de la table `produit`
--

CREATE TABLE `produit` (
  `id_produit` int(10) NOT NULL,
  `label` varchar(255) NOT NULL,
  `prix` float(24,2) NOT NULL,
  `stock` int(10) NOT NULL,
  `id_categorie` int(10) NOT NULL,
  `date_creation` date NOT NULL,
  `date_modification` date DEFAULT NULL,
  `url` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `produit`
--

INSERT INTO `produit` (`id_produit`, `label`, `prix`, `stock`, `id_categorie`, `date_creation`, `date_modification`, `url`) VALUES
(1, 'Téléphone', 12.00, 50, 1, '2024-04-12', NULL, 'https://res.cloudinary.com/dxijg3lmb/image/upload/v1712955489/VotreDossier/qwwdc2zpsdgzysmm9nom.jpg'),
(2, 'Tablette ', 499.99, 30, 1, '2024-04-12', '2024-04-14', 'https://res.cloudinary.com/dxijg3lmb/image/upload/v1712955495/VotreDossier/weep2yxofrtagh4lpdcu.jpg'),
(3, 'Ordinateur Portable ', 1200.99, 40, 1, '2024-04-12', NULL, 'https://res.cloudinary.com/dxijg3lmb/image/upload/v1712955265/VotreDossier/yxlc87fugvpdbrwbfcw3.webp'),
(4, 'Écouteurs ', 150.00, 75, 1, '2024-04-12', NULL, 'https://res.cloudinary.com/dxijg3lmb/image/upload/v1712955515/VotreDossier/emjl9jecguv6ofo23edc.jpg'),
(106, 'Testencore', 6.22, 65, 1, '2024-04-12', '2024-04-14', 'https://res.cloudinary.com/dxijg3lmb/image/upload/v1713106376/VotreDossier/jy7bw6rhknyhhyibtcat.webp'),
(109, 'T-shirt en coton', 19.99, 150, 10, '2024-04-14', NULL, 'https://res.cloudinary.com/dxijg3lmb/image/upload/v1713102443/VotreDossier/velnnjtywk9joew0ovnk.jpg'),
(110, 'Jeans Slim Fit', 49.99, 100, 10, '2024-04-14', NULL, 'https://res.cloudinary.com/dxijg3lmb/image/upload/v1713102592/VotreDossier/qzs8yfsohqnk2yhy3bik.jpg'),
(111, 'Casquette baseball', 15.99, 75, 10, '2024-04-14', NULL, 'https://res.cloudinary.com/dxijg3lmb/image/upload/v1713103031/VotreDossier/nrmcvta3tpcyb4yzc8ud.jpg'),
(112, 'Pull en laine', 34.99, 50, 10, '2024-04-14', NULL, 'https://res.cloudinary.com/dxijg3lmb/image/upload/v1713102928/VotreDossier/cxedglerqihojb8m0ezs.jpg'),
(113, 'Chaussettes en bambou', 5.99, 200, 10, '2024-04-14', NULL, 'https://res.cloudinary.com/dxijg3lmb/image/upload/v1713102938/VotreDossier/j9nefyieep7vjnjfoaak.webp'),
(114, 'The Great Gatsby', 15.99, 100, 12, '2024-04-14', NULL, 'https://res.cloudinary.com/dxijg3lmb/image/upload/v1713104426/VotreDossier/asbqft5uo9tpicjzksjb.jpg'),
(115, '1984 by George Orwell', 18.40, 150, 12, '2024-04-14', NULL, 'https://res.cloudinary.com/dxijg3lmb/image/upload/v1713104395/VotreDossier/awbnmmbjkit8e3rruf2n.webp'),
(116, 'To Kill a Mockingbird', 12.99, 80, 12, '2024-04-14', NULL, 'https://res.cloudinary.com/dxijg3lmb/image/upload/v1713104220/VotreDossier/twefu3rfflsrqkqfkypj.jpg'),
(117, 'The Catcher in the Rye', 14.50, 90, 12, '2024-04-14', NULL, 'https://res.cloudinary.com/dxijg3lmb/image/upload/v1713104234/VotreDossier/arvanxcaa0jxsglnt1cn.jpg'),
(118, 'Pride and Prejudice', 9.99, 120, 12, '2024-04-14', NULL, 'https://res.cloudinary.com/dxijg3lmb/image/upload/v1713104267/VotreDossier/jgv3t4tjuqkjrs15zt2i.jpg'),
(119, 'Chaise en bois', 59.99, 100, 13, '2024-04-14', NULL, 'https://res.cloudinary.com/dxijg3lmb/image/upload/v1713104671/VotreDossier/e8oh2679g0xyynh1dnwu.jpg'),
(120, 'Table de café', 129.99, 50, 13, '2024-04-14', NULL, 'https://res.cloudinary.com/dxijg3lmb/image/upload/v1713104678/VotreDossier/hjwqrpw4pr1oisekx7bb.webp'),
(121, 'Bureau en verre', 199.99, 30, 13, '2024-04-14', NULL, 'https://res.cloudinary.com/dxijg3lmb/image/upload/v1713104684/VotreDossier/znytuxsfubfpr4pbhacc.webp'),
(122, 'Étagère murale', 89.99, 80, 13, '2024-04-14', NULL, 'https://res.cloudinary.com/dxijg3lmb/image/upload/v1713104691/VotreDossier/iqkzighan5bsamnokhuy.jpg'),
(123, 'Canapé d\'angle', 499.99, 20, 13, '2024-04-14', NULL, 'https://res.cloudinary.com/dxijg3lmb/image/upload/v1713104819/VotreDossier/ldcahjs894wpzgj0pdqf.jpg'),
(124, 'Pain complet', 1.50, 120, 14, '2024-04-14', NULL, 'https://res.cloudinary.com/dxijg3lmb/image/upload/v1713105023/VotreDossier/jra4y5s4ge75wghixe6n.png'),
(125, 'Fromage de chèvre', 3.75, 80, 14, '2024-04-14', NULL, 'https://res.cloudinary.com/dxijg3lmb/image/upload/v1713105032/VotreDossier/ci5ly2ww9kqofbi91s1m.webp'),
(126, 'Poulet rôti', 7.99, 50, 14, '2024-04-14', NULL, 'https://res.cloudinary.com/dxijg3lmb/image/upload/v1713105425/VotreDossier/rujjitnb5ghlqxph0yj3.webp'),
(127, 'Chocolat noir 70%', 2.50, 150, 14, '2024-04-14', NULL, 'https://res.cloudinary.com/dxijg3lmb/image/upload/v1713105121/VotreDossier/xk5vx9qndaqy5uav5mlx.png'),
(128, 'Jus d\'orange pressé', 2.00, 200, 14, '2024-04-14', NULL, 'https://res.cloudinary.com/dxijg3lmb/image/upload/v1713105059/VotreDossier/ncsbjbubb4tbycbvgzii.jpg'),
(129, 'Lapin Chocolat', 5.99, 100, 14, '2024-04-14', NULL, 'https://res.cloudinary.com/dxijg3lmb/image/upload/v1713105175/VotreDossier/lfevl4ze7bp545ongds8.webp'),
(132, 'Test', 2.99, 55, 1, '2024-04-14', NULL, 'https://res.cloudinary.com/dxijg3lmb/image/upload/v1713106242/VotreDossier/oigzxa27cl7rjvoy1ms4.webp');

--
-- Déclencheurs `produit`
--
DELIMITER $$
CREATE TRIGGER `update_produit_date_modification` BEFORE UPDATE ON `produit` FOR EACH ROW BEGIN
    SET NEW.date_modification = CURDATE();
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Structure de la table `produit_panier`
--

CREATE TABLE `produit_panier` (
  `id_utilisateur` int(10) NOT NULL,
  `id_produit` int(10) NOT NULL,
  `quantite` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `token_invalide`
--

CREATE TABLE `token_invalide` (
  `id_token` int(10) NOT NULL,
  `valeur` text NOT NULL,
  `date_validite` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `utilisateur`
--

CREATE TABLE `utilisateur` (
  `id_utilisateur` int(10) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `prenom` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `mdp` varchar(255) NOT NULL,
  `role` enum('admin','client') NOT NULL DEFAULT 'client'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `utilisateur`
--

INSERT INTO `utilisateur` (`id_utilisateur`, `nom`, `prenom`, `email`, `mdp`, `role`) VALUES
(2, 'Eveille', 'Marie', 'marieclient@gmail.com', '$2b$10$ZF/gnF/5VQnOg0dX7Ful3O.a2450e03w244LTwNQNkcw3UBP4..Mi', 'client'),
(3, 'Eveille', 'Marie', 'marie@gmail.com', '$2b$10$Z02Ov5uC55ROvs/OOmUWB.lvsbNRb6EFLKO9RkWpng0o.mEEdY4dy', 'admin'),
(7, 'Eveilleee', 'Marie', 'marieeve@gmail.com', '$2b$10$bei18tCXqEWmRXrwjAdfpeIrqR2YpoZ9mQWDBQ3lS4YmzS11WDIQS', 'client');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `categorie`
--
ALTER TABLE `categorie`
  ADD PRIMARY KEY (`id_categorie`),
  ADD UNIQUE KEY `label` (`label`);

--
-- Index pour la table `produit`
--
ALTER TABLE `produit`
  ADD PRIMARY KEY (`id_produit`),
  ADD UNIQUE KEY `label` (`label`),
  ADD KEY `fk_categorie` (`id_categorie`);

--
-- Index pour la table `produit_panier`
--
ALTER TABLE `produit_panier`
  ADD PRIMARY KEY (`id_utilisateur`,`id_produit`),
  ADD KEY `fk_produit_panier` (`id_produit`);

--
-- Index pour la table `token_invalide`
--
ALTER TABLE `token_invalide`
  ADD PRIMARY KEY (`id_token`),
  ADD UNIQUE KEY `valeur` (`valeur`) USING HASH;

--
-- Index pour la table `utilisateur`
--
ALTER TABLE `utilisateur`
  ADD PRIMARY KEY (`id_utilisateur`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `categorie`
--
ALTER TABLE `categorie`
  MODIFY `id_categorie` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT pour la table `produit`
--
ALTER TABLE `produit`
  MODIFY `id_produit` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=133;

--
-- AUTO_INCREMENT pour la table `token_invalide`
--
ALTER TABLE `token_invalide`
  MODIFY `id_token` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `utilisateur`
--
ALTER TABLE `utilisateur`
  MODIFY `id_utilisateur` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `produit`
--
ALTER TABLE `produit`
  ADD CONSTRAINT `fk_categorie` FOREIGN KEY (`id_categorie`) REFERENCES `categorie` (`id_categorie`);

--
-- Contraintes pour la table `produit_panier`
--
ALTER TABLE `produit_panier`
  ADD CONSTRAINT `fk_produit_panier` FOREIGN KEY (`id_produit`) REFERENCES `produit` (`id_produit`),
  ADD CONSTRAINT `fk_utilisateur_panier` FOREIGN KEY (`id_utilisateur`) REFERENCES `utilisateur` (`id_utilisateur`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
