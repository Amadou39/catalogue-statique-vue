CREATE TABLE IF NOT EXISTS `produits` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nom` VARCHAR(100) NOT NULL,
  `prix` DECIMAL(10,2) NOT NULL,
  `categorie` VARCHAR(50),
  `description` TEXT,
  `image` VARCHAR(255),
  `taille` INT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;

-- 3. Insertion des données
-- Note : "Bonnet" et "bonnet" seraient considérés comme différents ici
INSERT INTO `produits` (`nom`, `prix`, `categorie`, `description`, `image`, `taille`) VALUES
('T-shirt Ample', 25.00, 'Vêtements', 'Coton bio épais, coupe large', 'tshirt-vintage.jpg',60),
('Bonnet', 13.00, 'Accessoires', 'Laine chaude.', 'Bonnet.jpg',70),
('Casquette', 20.00, 'Accessoires', 'Toile légère.', 'casquette-min.jpg',80),
('Jean Large', 30.00, 'Vêtements', 'Denim résistant.', 'jean-brut.jpg',40);