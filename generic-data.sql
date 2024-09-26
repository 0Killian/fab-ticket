INSERT INTO `category` (`name`, `description`) VALUES 
('Ordinateurs', 'Matériel informatique comprenant les ordinateurs portables et de bureau.'),
('Imprimantes', 'Dispositifs d’impression 2D et 3D pour divers usages.'),
('Électronique', 'Équipements pour les projets électroniques et de prototypage.'),
('Alimentations', 'Dispositifs d’alimentation électrique pour divers projets.'),
('Accessoires', 'Accessoires divers pour les ordinateurs et équipements électroniques.');

INSERT INTO `condition` (`name`, `description`) VALUES 
('Neuf', 'Produit neuf, jamais utilisé.'),
('Bon état', 'Produit en bon état de fonctionnement avec quelques signes d’usure.'),
('État moyen', 'Produit fonctionnel mais avec des imperfections notables.'),
('Mauvais état', 'Produit avec des problèmes majeurs, à réparer.');

INSERT INTO `material` (`inventoryid`, `description`, `categoryid`, `photo`, `available`, `buydate`, `conditionid`) VALUES 
('INV001', 'Ordinateur portable Dell', 1, 'dell-laptop.jpg', TRUE, '2023-09-25', 1),
('INV002', 'Imprimante 3D Creality', 2, 'creality-3d-printer.jpg', TRUE, '2022-05-10', 1),
('INV003', 'Oscilloscope Rigol', 3, 'rigol-oscilloscope.jpg', TRUE, '2021-12-15', 1),
('INV004', 'Station de soudure Weller', 3, 'weller-soldering-station.jpg', TRUE, '2022-07-08', 1),
('INV005', 'Alimentation variable Korad', 4, 'korad-power-supply.jpg', TRUE, '2023-03-19', 1),
('INV006', 'Multimètre Fluke', 3, 'fluke-multimeter.jpg', TRUE, '2021-10-01', 1),
('INV007', 'Routeur Wi-Fi Asus', 1, 'asus-wifi-router.jpg', TRUE, '2023-06-12', 1),
('INV008', 'Carte mère Asus ROG', 1, 'asus-motherboard.jpg', TRUE, '2022-11-21', 1),
('INV009', 'Batterie externe Anker', 5, 'anker-powerbank.jpg', TRUE, '2023-04-07', 1),
('INV010', 'Moniteur Dell 24"', 1, 'dell-monitor.jpg', TRUE, '2022-08-30', 1);

INSERT INTO `ticket` (`status`, `title`, `description`, `creation_date`, `author`) VALUES 
(0, 'Problème avec l\'ordinateur portable', 'L’ordinateur portable ne s’allume plus.', '2024-09-26', 'kbellouard'),
(0, 'Demande de prêt d’imprimante 3D', 'Besoin d’une imprimante 3D pour un projet.', '2024-09-25', 'amary'),
(0, 'Problème de connexion au réseau', 'Connexion réseau instable avec le routeur.', '2024-09-24', 'kbellouard'),
(0, 'Demande d\'emprunt d\'oscilloscope', 'Besoin d’un oscilloscope pour des tests.', '2024-09-24', 'amary'),
(0, 'Problème de charge de la batterie', 'La batterie ne tient plus la charge.', '2024-09-23', 'kbellouard'),
(0, 'Demande de prêt de station de soudure', 'Besoin d’une station de soudure pour un projet.', '2024-09-23', 'amary'),
(0, 'Problème de carte mère', 'La carte mère du PC ne fonctionne plus.', '2024-09-22', 'kbellouard'),
(0, 'Demande de prêt d\'alimentation variable', 'Besoin d’une alimentation variable pour un circuit.', '2024-09-22', 'amary'),
(0, 'Problème de surchauffe', 'L’ordinateur surchauffe rapidement.', '2024-09-21', 'kbellouard'),
(0, 'Demande de prêt de multimètre', 'Besoin d’un multimètre pour mesurer des tensions.', '2024-09-21', 'amary');

INSERT INTO `borrow` (`startdate`, `enddate`, `author`, `materialid`, `commentary`) VALUES
('2024-09-20 09:00:00', '2024-09-25 17:00:00', 'kbellouard', 22, 'Emprunt pour un projet de développement.'),
('2024-09-19 14:00:00', '2024-09-24 18:00:00', 'amary', 28, 'Imprimante 3D nécessaire pour un prototype.'),
('2024-09-21 10:00:00', '2024-09-23 15:00:00', 'kbellouard', 29, 'Analyse de signaux avec l’oscilloscope.'),
('2024-09-22 13:30:00', '2024-09-27 18:00:00', 'amary', 31, 'Besoin de la station de soudure pour électronique.'),
('2024-09-23 08:00:00', '2024-09-24 12:00:00', 'kbellouard', 23, 'Tester un circuit avec l’alimentation variable.'),
('2024-09-20 09:00:00', '2024-09-22 17:00:00', 'amary', 24, 'Mesurer des tensions avec le multimètre.'),
('2024-09-24 14:00:00', '2024-09-26 16:00:00', 'kbellouard', 25, 'Tester la connexion du routeur Wi-Fi.'),
('2024-09-19 11:00:00', '2024-09-23 14:00:00', 'amary', 26, 'Tester la carte mère dans une nouvelle config.'),
('2024-09-21 15:00:00', '2024-09-24 11:00:00', 'kbellouard', 27, 'Alimentation de projets en déplacement.'),
('2024-09-18 09:00:00', '2024-09-20 12:00:00', 'amary', 30, 'Emprunt du moniteur pour design graphique.');
