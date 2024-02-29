CREATE TABLE `utilisateur` (
  `id_utilisateur` int(10) NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) NOT NULL,
  `prenom` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `mdp` varchar(255) NOT NULL,
  PRIMARY KEY (`id_utilisateur`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `token_invalide` (
  `id_token` int(10) NOT NULL AUTO_INCREMENT,
  `valeur` text NOT NULL,
  `date_validite` date NOT NULL,
  PRIMARY KEY (`id_token`),
  UNIQUE KEY `valeur` (`valeur`) USING HASH
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


CREATE TABLE categorie (
    id_categorie INT(10) NOT NULL AUTO_INCREMENT,
    label VARCHAR(255) NOT NULL UNIQUE,
    PRIMARY KEY (id_categorie)
);

CREATE TABLE produit (
    id_produit INT(10) NOT NULL AUTO_INCREMENT,
    label VARCHAR(255) NOT NULL UNIQUE,
    prix FLOAT(24, 2) NOT NULL,
    stock INT(10) NOT NULL,
    id_categorie INT(10) NOT NULL,
    date_creation DATE NOT NULL,
    date_modification DATE DEFAULT NULL,
    PRIMARY KEY (id_produit),
    CONSTRAINT fk_categorie FOREIGN KEY (id_categorie) REFERENCES categorie (id_categorie)
);


CREATE TABLE produit_panier (
    id_utilisateur INT(10) NOT NULL,
    id_produit INT(10) NOT NULL,
    quantite INT(10) NOT NULL,
    CONSTRAINT fk_produit_panier FOREIGN KEY (id_produit) REFERENCES produit(id_produit),
    CONSTRAINT fk_utilisateur_panier FOREIGN KEY (id_utilisateur) REFERENCES utilisateur(id_utilisateur),
    PRIMARY KEY (id_utilisateur, id_produit)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
