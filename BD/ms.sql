-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : jeu. 21 nov. 2024 à 14:26
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
-- Structure de la table `direction`
--

CREATE TABLE `direction` (
  `id_direction` int(10) NOT NULL,
  `nom_direction` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `direction`
--

INSERT INTO `direction` (`id_direction`, `nom_direction`) VALUES
(10, 'dsi'),
(11, 'dgfop'),
(12, 'test');

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
(2, 'santatriniaina', 'feno', '1234', '$2b$10$TgJ9kHBtysipU3.je70wWeZbBwnxO6MnJFVJCV/.vuAPAjiiGY/Cu', 'Communication', '1728658133229.jpg', 1, '2024-11-20 08:03:18'),
(3, 'toky', 'toky', '123f', '$2b$10$cL/yIWp7mvtRuC3nPyo/HO42eeuNjzApAzpOGgTlIRsZzuRPdaNdm', 'Stan', '????GcamHero_20230824_172731_⌛ IPHONE 14 PRO MAX BY GCAM HERO (AUTO) LMC8.4 R13.jpg', 1, '2024-11-20 08:10:53'),
(4, 'santatriniaina', 'feno nasandratra', '8219', '$2b$10$/xic7Rn8J8XjDb8o1UxXvetuXrigCt5E07YvcpR/8tQcm8MmAt0QK', 'Admin', '', 1, '2024-11-20 12:49:58'),
(5, 'toky', 'toky', 'toky', '$2b$10$j85wXu78XYopJgQISgH2/OeEGWIQrJjNLqnzrX/2F.6Aojq9O/lzy', 'Admin', '', 1, '2024-11-20 13:00:22'),
(6, 'test', 'test', 'test', '$2b$10$8TKIdOGAS56Q56ZYXZIYh..44BBFzZyuF1g9zinEj17Jf8D4LhNWG', 'Communication', '', 1, '2024-11-20 13:24:57'),
(7, '1', '1', '1', '$2b$10$qKxjI9t.4Jhym/DMDzM7FenigNMbIgJ6DOrXDeu5mlOqCZfdCVZ32', 'Admin', '', 0, '2024-11-20 15:37:27'),
(8, '2', '2', '2', '$2b$10$Et5kbdUqMEsiAlWz5txAmeB9BxVVbkquyoP0DhAYfQlZpDPV.hFoe', 'Communication', '', 0, '2024-11-20 15:38:12'),
(9, 'valitation', 'valitation', 'valitation', '$2b$10$XUJfzjGr7ykMvly9M8vV7.F6m4RTmYYa8hyhiEOtecbB9qFOtKvFe', 'Communication', '', 0, '2024-11-21 03:19:32'),
(10, 'ddddd', 'dddd', 'dd', '$2b$10$.QqsyadXcYIH0u7FSGH/Eee7RnEH/5rtUefUPCmh5dAVmPWHO9mXW', 'Communication', '', 0, '2024-11-21 11:11:09'),
(11, 'vody', 'vody', 'vody', '$2b$10$hh2fzNPoX7FyIoLebIg0u.hruGH0/pfYxYiqdkDRn7k5cE9bdUB6a', 'Stan', '', 0, '2024-11-21 11:54:33');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Index pour la table `direction`
--
ALTER TABLE `direction`
  ADD PRIMARY KEY (`id_direction`);

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
-- AUTO_INCREMENT pour la table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `direction`
--
ALTER TABLE `direction`
  MODIFY `id_direction` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `users1`
--
ALTER TABLE `users1`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
