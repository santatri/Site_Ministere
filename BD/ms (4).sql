-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : lun. 16 déc. 2024 à 12:17
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
-- Base de données : `ms`
--

-- --------------------------------------------------------

--
-- Structure de la table `actu`
--

CREATE TABLE `actu` (
  `id` int(11) NOT NULL,
  `titre` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `media_image` varchar(255) DEFAULT NULL,
  `media_video` varchar(255) DEFAULT NULL,
  `date_insertion` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `actu`
--

INSERT INTO `actu` (`id`, `titre`, `description`, `media_image`, `media_video`, `date_insertion`) VALUES
(1, 'test', 'test', NULL, NULL, '2024-11-25 09:56:00'),
(14, 'test', 'validation de modification', '1733308101288-IMG-20240919-WA0001.jpg', NULL, '2024-11-25 11:48:34'),
(15, 'dddddddd', 'loream50\r\n', '1732610324764-ð­GcamHero_20230825_171944_â IPHONE 14 PRO MAX BY GCAM HERO (AUTO) LMC8.4 R13-1.jpg', NULL, '2024-11-26 09:38:45'),
(16, '5 eme  ', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur asperiores ab optio ducimus, tempore modi aliquam non reiciendis rerum dolorum tenetur molestias quia. Minima cupiditate adipisci culpa doloribus alias tenetur nemo nam ratione? Neque tempore distinctio eius aperiam iure rem, esse dolor, alias beatae accusantium natus assumenda dolores non corrupti. Iure, magnam! Rem qui aliquid dicta nulla dolor temporibus inventore quasi ratione, commodi debitis repellendus! Eligendi aperiam expedita dolorum enim autem alias, ea delectus soluta vero nulla mollitia repellendus officia magnam suscipit rerum eveniet at nihil explicabo sit sed, fuga quisquam facilis quibusdam. Possimus esse nam aliquam! Voluptatem, praesentium veritatis.', NULL, NULL, '2024-11-27 09:16:40'),
(17, '6 eme pub', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur asperiores ab optio ducimus, tempore modi aliquam non reiciendis rerum dolorum tenetur molestias quia. Minima cupiditate adipisci culpa doloribus alias tenetur nemo nam ratione? Neque tempore distinctio eius aperiam iure rem, esse dolor, alias beatae accusantium natus assumenda dolores non corrupti. Iure, magnam! Rem qui aliquid dicta nulla dolor temporibus inventore quasi ratione, commodi debitis repellendus! Eligendi aperiam expedita dolorum enim autem alias, ea delectus soluta vero nulla mollitia repellendus officia magnam suscipit rerum eveniet at nihil explicabo sit sed, fuga quisquam facilis quibusdam. Possimus esse nam aliquam! Voluptatem, praesentium veritatis.', '1732695500124-1728630514142.jpg', NULL, '2024-11-27 09:18:20'),
(18, '7 eme pub', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur asperiores ab optio ducimus, tempore modi aliquam non reiciendis rerum dolorum tenetur molestias quia. Minima cupiditate adipisci culpa doloribus alias tenetur nemo nam ratione? Neque tempore distinctio eius aperiam iure rem, esse dolor, alias beatae accusantium natus assumenda dolores non corrupti. Iure, magnam! Rem qui aliquid dicta nulla dolor temporibus inventore quasi ratione, commodi debitis repellendus! Eligendi aperiam expedita dolorum enim autem alias, ea delectus soluta vero nulla mollitia repellendus officia magnam suscipit rerum eveniet at nihil explicabo sit sed, fuga quisquam facilis quibusdam. Possimus esse nam aliquam! Voluptatem, praesentium veritatis.', '1732695522744-1728630504800.jpg', NULL, '2024-11-27 09:18:42'),
(19, ' 9 eme pub', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur asperiores ab optio ducimus, tempore modi aliquam non reiciendis rerum dolorum tenetur molestias quia. Minima cupiditate adipisci culpa doloribus alias tenetur nemo nam ratione? Neque tempore distinctio eius aperiam iure rem, esse dolor, alias beatae accusantium natus assumenda dolores non corrupti. Iure, magnam! Rem qui aliquid dicta nulla dolor temporibus inventore quasi ratione, commodi debitis repellendus! Eligendi aperiam expedita dolorum enim autem alias, ea delectus soluta vero nulla mollitia repellendus officia magnam suscipit rerum eveniet at nihil explicabo sit sed, fuga quisquam facilis quibusdam. Possimus esse nam aliquam! Voluptatem, praesentium veritatis.', NULL, NULL, '2024-11-27 09:19:09'),
(20, '10', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur asperiores ab optio ducimus, tempore modi aliquam non reiciendis rerum dolorum tenetur molestias quia. Minima cupiditate adipisci culpa doloribus alias tenetur nemo nam ratione? Neque tempore distinctio eius aperiam iure rem, esse dolor, alias beatae accusantium natus assumenda dolores non corrupti. Iure, magnam! Rem qui aliquid dicta nulla dolor temporibus inventore quasi ratione, commodi debitis repellendus! Eligendi aperiam expedita dolorum enim autem alias, ea delectus soluta vero nulla mollitia repellendus officia magnam suscipit rerum eveniet at nihil explicabo sit sed, fuga quisquam facilis quibusdam. Possimus esse nam aliquam! Voluptatem, praesentium veritatis.', NULL, NULL, '2024-11-27 09:20:24');

-- --------------------------------------------------------

--
-- Structure de la table `actualité`
--

CREATE TABLE `actualité` (
  `id` int(11) NOT NULL,
  `titre` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `date_insertion` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `admins`
--

CREATE TABLE `admins` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `admins`
--

INSERT INTO `admins` (`id`, `name`, `email`, `password`, `created_at`) VALUES
(1, 'Admin', 'Admin@gmail.com', 'Admin', '2024-11-18 11:26:43');

-- --------------------------------------------------------

--
-- Structure de la table `a_la_une`
--

CREATE TABLE `a_la_une` (
  `id` int(11) NOT NULL,
  `titre` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `date_insertion` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `a_la_une`
--

INSERT INTO `a_la_une` (`id`, `titre`, `description`, `image`, `date_insertion`) VALUES
(3, 'say', 'sary', NULL, '2024-12-05 09:08:43'),
(5, 'test', 'ttt', NULL, '2024-12-16 09:59:06');

-- --------------------------------------------------------

--
-- Structure de la table `direction`
--

CREATE TABLE `direction` (
  `id_d` int(11) NOT NULL,
  `id_sg` int(11) DEFAULT NULL,
  `id_dg` int(11) DEFAULT NULL,
  `nom_d` varchar(255) DEFAULT NULL,
  `porte_d` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `direction`
--

INSERT INTO `direction` (`id_d`, `id_sg`, `id_dg`, `nom_d`, `porte_d`) VALUES
(20, 2, NULL, 'Direction du Systeme d\'Information(DSI)', '010'),
(21, NULL, 1, 'Direction de le Réforme de le Fonction Publique(DRFP)', '006'),
(28, 2, NULL, 'Directon des Affaires Financieres et de la Gestion de Patrimoine(DAFGP)', '050'),
(29, NULL, 1, 'Direction des Ressources Humaines de l\'Etat(DRHE)', '012'),
(30, 2, NULL, ' Direction des Affaires  Financières et de la Gestion du Patrimoine  ', 'tsy hay');

-- --------------------------------------------------------

--
-- Structure de la table `directiongenerale`
--

CREATE TABLE `directiongenerale` (
  `id_dg` int(11) NOT NULL,
  `id_sg` int(11) DEFAULT NULL,
  `nom_dg` varchar(255) DEFAULT NULL,
  `porte_dg` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `directiongenerale`
--

INSERT INTO `directiongenerale` (`id_dg`, `id_sg`, `nom_dg`, `porte_dg`) VALUES
(1, 2, 'Direction Géneral de la Fonction Publique(DGFOP)', '004'),
(3, 2, 'Direction Génerale du Travail(DGT)', '007'),
(4, 2, 'Direction Géneral de la Promotion de l\'Emploi(DGPE)', '010');

-- --------------------------------------------------------

--
-- Structure de la table `secretairegeneral`
--

CREATE TABLE `secretairegeneral` (
  `id_sg` int(11) NOT NULL,
  `nom_sg` varchar(255) DEFAULT NULL,
  `porte_sg` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `secretairegeneral`
--

INSERT INTO `secretairegeneral` (`id_sg`, `nom_sg`, `porte_sg`) VALUES
(2, 'Secretaire Generale(SG)', '1');

-- --------------------------------------------------------

--
-- Structure de la table `service`
--

CREATE TABLE `service` (
  `id_s` int(11) NOT NULL,
  `id_d` int(11) DEFAULT NULL,
  `nom_s` varchar(255) DEFAULT NULL,
  `porte_s` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `service`
--

INSERT INTO `service` (`id_s`, `id_d`, `nom_s`, `porte_s`) VALUES
(1, 28, 'courier', '001'),
(49, 29, 'Service de la gestion de fin de carriere/Retraite', '008'),
(50, 20, 'Service des Archives et des Fichiers  Electroniques/Parc informatique', '002'),
(51, 29, '  Service de la Retraite', '003'),
(52, 21, 'Service d’études et d’appui  à la  Réforme', '004'),
(53, 21, 'Secrétariat ', '005');

-- --------------------------------------------------------

--
-- Structure de la table `serviceoffert`
--

CREATE TABLE `serviceoffert` (
  `id_service` int(11) NOT NULL,
  `id_sg` int(11) DEFAULT NULL,
  `id_dg` int(11) DEFAULT NULL,
  `id_d` int(11) DEFAULT NULL,
  `id_s` int(11) DEFAULT NULL,
  `nom_service` varchar(255) DEFAULT NULL,
  `dossier_prepare` text DEFAULT NULL,
  `delai` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `serviceoffert`
--

INSERT INTO `serviceoffert` (`id_service`, `id_sg`, `id_dg`, `id_d`, `id_s`, `nom_service`, `dossier_prepare`, `delai`) VALUES
(20, NULL, NULL, NULL, 1, 'Reception et redistribution des dossiers', '', '1 jours '),
(40, NULL, NULL, 21, NULL, 'yt', 'lal, ying, fh', '7'),
(41, NULL, 3, NULL, NULL, 'ok', '', ''),
(42, 2, NULL, NULL, NULL, 'dj', '', ''),
(43, NULL, NULL, NULL, 49, 'Retraite pour limite d\'age', 'Demande manuscrite de l\'interessé avec avis favorable du supérieur hiérarchique,Relevé de service de l\'intéressé par le Ministrere employeur en trois (03) exemplaire ,Dernier Arreté d\'avencement , Acte de naissance , Attestation de non interruption de service,Photocopie du Bon de caisse ou Avis de crédit', '3 mois'),
(44, NULL, NULL, NULL, 50, 'Travaux d’impression et de photocopie du Ministère ', '', ''),
(45, NULL, NULL, NULL, 51, 'Suivi des dossiers de Retraite', 'Référence du dossier de retraite ', ''),
(46, NULL, NULL, NULL, 52, 'Etude et réalisation des projets de Réforme  concernant  tous les Ministères et Institutions', '', ''),
(47, NULL, NULL, NULL, 53, 'Travaux de secrétariat administratif et technique   adaptés à la mission spécifique de la Direction de la  Réforme de la Fonction Publique ', '', ''),
(48, NULL, NULL, 21, NULL, 'Coordination des opérations en matière de Réforme de  la Fonction Publique', '', ''),
(49, NULL, NULL, NULL, 49, 'Retraite  anticipée', ' Demande manuscrite de l’intéressé avec avis favorable du supérieur hiérarchique  , Relevé de service de l’intéressé établi par le ministère employeur en trois (03) exemplaires  , Copie de l’acte de naissance  , Dernier arrêté d’avancement  , Attestation de non interruption de service  , Photocopie du bon de caisse ou avis de crédit  , Attestation de non engagement à la banque (En cas de virement du salaire à la banque)  , NB : condition : au moins 15 ans des services effectifs ', '3mois'),
(50, NULL, NULL, NULL, 49, 'Mise à la retraite d’office pour raison de santé ', ' PV de la réunion du conseil de santé établi par le ministère de la santé  ,Relevé de service  , Projet d’arrêté', '3mois'),
(51, NULL, NULL, NULL, 49, 'Honorariat de grade', 'Demande manuscrite de l’intéressé  , Ampliation de l’arrêté de mise à la retraite', '3mois'),
(52, NULL, NULL, NULL, 49, 'Démission d’un fonctionnaire', ' Demande manuscrite de l’intéressé  , Etat des sommes éventuellement dues à l’administration  , Photocopie du dernier bon de caisse  ,Dernier arrêté d’avancement  ,Relevé de service', '3mois'),
(53, NULL, NULL, NULL, 1, 'test', '', '');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `status` varchar(20) DEFAULT 'pending',
  `role` varchar(20) DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `is_verified` tinyint(1) DEFAULT 0,
  `is_role_assigned` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `status`, `role`, `created_at`, `updated_at`, `is_verified`, `is_role_assigned`) VALUES
(1, 'santatriniaina', 'santatriniainafeno01@gmail.com', '$2b$10$JxtFYzh1nBsC9D8cPBkb8u6bs2TOjkP0NarVRasUnntY2Rik92DCa', 'pending', 'Stand', '2024-11-19 08:40:25', '2024-11-19 08:40:25', 0, 0),
(2, 'ratatat', 'Admin@gmail.com', '$2b$10$jh3n0sTNP0vkreVcfXDNEuSsgCm5JhsBg.qqhNEcrNGp3dq2gctD.', 'pending', 'Stand', '2024-11-19 11:45:28', '2024-11-19 11:45:28', 0, 0),
(3, 'aaa', 'Admn@gmail.com', '$2b$10$EjGeWTtySQaC0Df8fl9GYuu2HuHw7LCKj40AVXTiFeCQUW2rOy2dC', 'pending', 'Stand', '2024-11-19 12:29:41', '2024-11-19 12:29:41', 0, 0),
(4, 'zzzz', 'a@gmail.com', '$2b$10$42G2cFr3f7SWpkOVCiuZhuq6Owa90I2dnfdQl5Sqi9H/u8/AMqVIa', 'pending', 'Stand', '2024-11-19 13:54:31', '2024-11-19 13:54:31', 0, 0),
(5, 'santatriniaina', 'santaniainafeno01@gmail.com', '$2b$10$NmTJd/yyCrzx2UZKUTeGSee2S1iKQ78z1fQIf3r.t/WcIj7mE7aQe', 'pending', 'Stand', '2024-11-19 14:27:24', '2024-11-19 14:27:24', 0, 0);

-- --------------------------------------------------------

--
-- Structure de la table `users1`
--

CREATE TABLE `users1` (
  `id` int(11) NOT NULL,
  `nom` varchar(50) NOT NULL,
  `prenom` varchar(50) NOT NULL,
  `matricule` varchar(20) NOT NULL,
  `mdp` varchar(255) NOT NULL,
  `role` enum('Admin','Communication','Stan') DEFAULT 'Communication',
  `image` varchar(255) DEFAULT NULL,
  `validated` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `users1`
--

INSERT INTO `users1` (`id`, `nom`, `prenom`, `matricule`, `mdp`, `role`, `image`, `validated`, `created_at`) VALUES
(1, 'Admin', 'Super', 'ADM001', '749f09bade8aca755660eeb17792da880218d4fbdc4e25fbec279d7fe9f65d70', 'Admin', NULL, 1, '2024-11-20 07:26:16'),
(5, 'toky', 'herizo', 'toky', '$2b$10$j85wXu78XYopJgQISgH2/OeEGWIQrJjNLqnzrX/2F.6Aojq9O/lzy', 'Admin', '', 1, '2024-11-20 13:00:22'),
(32, 'st', 'sr', '2002', '$2b$10$oZN7S4vkbfEVCVWgY1cUdefo5nEi6C7cOmMUOKGqzAGwYGIuPiSp.', 'Communication', '', 1, '2024-12-08 14:32:47'),
(33, 'santatriniaina', 'feno nasandratra', '8219', '$2b$10$6Ruw9NC3GxV/o/E5e.L5JewCIMDrkXGFscxLgvKBI0BfwJgYqb5rS', 'Stan', '', 1, '2024-12-08 14:34:07'),
(34, 'w', 'w', 'w', '$2b$10$rb1EK/Dg3amIK0tT46ALT.urUZEIhfifgfS.1jbvUzl4r9CkpisA2', 'Communication', '', 0, '2024-12-11 12:43:37'),
(35, 'Responsable ', 'Comunication', 'Actualité', '$2b$10$/kTHq8SEOvpHx6LZ8h5SXeTgx/SD9g0BIsDRCNlTq7LLzelAIJDoG', 'Communication', '', 1, '2024-12-15 13:10:30'),
(36, 'ovy', 'ovy', 'ovy', '$2b$10$1xIgtUbdsnqdYPJzhcecn.GIpcBia5Oy52GK/Amv.TiOZksi1nRNO', 'Communication', '', 0, '2024-12-16 08:57:44'),
(37, 'd', 'gg', 'g', '$2b$10$HQ8BKo3qF9VOAndksk7xT.hRe4drQ7w45GxScxpPH3.YylZIVlarW', 'Communication', '', 0, '2024-12-16 11:08:54');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `actu`
--
ALTER TABLE `actu`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `actualité`
--
ALTER TABLE `actualité`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Index pour la table `a_la_une`
--
ALTER TABLE `a_la_une`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `direction`
--
ALTER TABLE `direction`
  ADD PRIMARY KEY (`id_d`),
  ADD KEY `id_sg` (`id_sg`),
  ADD KEY `id_dg` (`id_dg`);

--
-- Index pour la table `directiongenerale`
--
ALTER TABLE `directiongenerale`
  ADD PRIMARY KEY (`id_dg`),
  ADD KEY `id_sg` (`id_sg`);

--
-- Index pour la table `secretairegeneral`
--
ALTER TABLE `secretairegeneral`
  ADD PRIMARY KEY (`id_sg`);

--
-- Index pour la table `service`
--
ALTER TABLE `service`
  ADD PRIMARY KEY (`id_s`),
  ADD KEY `id_d` (`id_d`);

--
-- Index pour la table `serviceoffert`
--
ALTER TABLE `serviceoffert`
  ADD PRIMARY KEY (`id_service`),
  ADD KEY `id_sg` (`id_sg`),
  ADD KEY `id_dg` (`id_dg`),
  ADD KEY `id_d` (`id_d`),
  ADD KEY `id_s` (`id_s`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Index pour la table `users1`
--
ALTER TABLE `users1`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `matricule` (`matricule`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `actu`
--
ALTER TABLE `actu`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT pour la table `actualité`
--
ALTER TABLE `actualité`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `a_la_une`
--
ALTER TABLE `a_la_une`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `direction`
--
ALTER TABLE `direction`
  MODIFY `id_d` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT pour la table `directiongenerale`
--
ALTER TABLE `directiongenerale`
  MODIFY `id_dg` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `secretairegeneral`
--
ALTER TABLE `secretairegeneral`
  MODIFY `id_sg` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `service`
--
ALTER TABLE `service`
  MODIFY `id_s` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT pour la table `serviceoffert`
--
ALTER TABLE `serviceoffert`
  MODIFY `id_service` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `users1`
--
ALTER TABLE `users1`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `direction`
--
ALTER TABLE `direction`
  ADD CONSTRAINT `direction_ibfk_1` FOREIGN KEY (`id_sg`) REFERENCES `secretairegeneral` (`id_sg`),
  ADD CONSTRAINT `direction_ibfk_2` FOREIGN KEY (`id_dg`) REFERENCES `directiongenerale` (`id_dg`);

--
-- Contraintes pour la table `directiongenerale`
--
ALTER TABLE `directiongenerale`
  ADD CONSTRAINT `directiongenerale_ibfk_1` FOREIGN KEY (`id_sg`) REFERENCES `secretairegeneral` (`id_sg`);

--
-- Contraintes pour la table `service`
--
ALTER TABLE `service`
  ADD CONSTRAINT `service_ibfk_1` FOREIGN KEY (`id_d`) REFERENCES `direction` (`id_d`);

--
-- Contraintes pour la table `serviceoffert`
--
ALTER TABLE `serviceoffert`
  ADD CONSTRAINT `serviceoffert_ibfk_1` FOREIGN KEY (`id_sg`) REFERENCES `secretairegeneral` (`id_sg`),
  ADD CONSTRAINT `serviceoffert_ibfk_2` FOREIGN KEY (`id_dg`) REFERENCES `directiongenerale` (`id_dg`),
  ADD CONSTRAINT `serviceoffert_ibfk_3` FOREIGN KEY (`id_d`) REFERENCES `direction` (`id_d`),
  ADD CONSTRAINT `serviceoffert_ibfk_4` FOREIGN KEY (`id_s`) REFERENCES `service` (`id_s`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
