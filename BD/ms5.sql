-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mer. 15 jan. 2025 à 07:47
-- Version du serveur : 10.4.28-MariaDB
-- Version de PHP : 8.2.4

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
(23, 'Modernisation Administrative : Lancement d’un Programme de Digitalisation', 'Le Directeur Général a annoncé la mise en place d’un programme visant à digitaliser les processus administratifs pour améliorer l\'efficacité et la transparence des services publics.', '1734401200311-1.jpg', NULL, '2024-12-17 05:06:40'),
(24, 'Renforcement des Compétences : Formation Continue pour les Agents Publics', 'Une initiative a été lancée pour offrir des formations continues aux fonctionnaires, afin de renforcer leurs compétences et leur adaptabilité aux nouvelles technologies.', '1734401256238-3.jpg', NULL, '2024-12-17 05:07:17'),
(25, 'Partenariat Stratégique : Collaboration Internationale pour la Fonction Publique', 'Un accord a été signé avec une organisation internationale pour favoriser les échanges d’expertise en matière de gestion des ressources humaines publiques.', '1734401284597-4.jpg', NULL, '2024-12-17 05:08:04'),
(26, 'Performance des Administrations : Présentation d’un Rapport d’Évaluation', 'Le Directeur Général a présenté un rapport sur l’évaluation des performances des services publics, mettant en lumière les réussites et les axes d’amélioration.', '1734401333891-7.jpg', NULL, '2024-12-17 05:08:37'),
(27, 'Égalité Professionnelle : Promotion de l’Équité dans la Fonction Publique', 'Une campagne a été lancée pour promouvoir l’égalité des chances, notamment en matière de recrutement et de progression de carrière.', '1734401365545-8.jpg', NULL, '2024-12-17 05:09:25'),
(28, 'Réforme des Retraites : Vers un Système Plus Juste et Durable', 'Le Directeur Général a détaillé les grandes lignes d’une réforme visant à assurer la pérennité et l’équité du système de retraite dans la fonction publique.', '1734419849064-12.jpg', NULL, '2024-12-17 05:09:54'),
(29, 'Un accord a été signé avec une organisation internationale pour favoriser les échanges d’expertise en matière de gestion des ressources humaines publiques.', 'Un accord a été signé avec une organisation internationale pour favoriser les échanges d’expertise en matière de gestion des ressources humaines publiques. Un accord a été signé avec une organisation internationale pour favoriser les échanges d’expertise en matière de gestion des ressources humaines publiques.', '1734506233878-8.jpg', NULL, '2024-12-18 09:58:26'),
(30, 'Un accord a été signé avec une organisation internationale pour favoriser les échanges d’expertise en matière de gestion des ressources humaines publiques.', 'Un accord a été signé avec une organisation internationale pour favoriser les échanges d’expertise en matière de gestion des ressources humaines publiques.Un accord a été signé avec une organisation internationale pour favoriser les échanges d’expertise en matière de gestion des ressources humaines publiques.Un accord a été signé avec une organisation internationale pour favoriser les échanges d’expertise en matière de gestion des ressources humaines publiques.', '1734506263425-7.jpg', NULL, '2024-12-18 09:58:44'),
(31, 'Un accord a été signé avec une organisation internationale pour favoriser les échanges d’expertise en matière de gestion des ressources humaines publiques.', 'Un accord a été signé avec une organisation internationale pour favoriser les échanges d’expertise en matière de gestion des ressources humaines publiques.Un accord a été signé avec une organisation internationale pour favoriser les échanges d’expertise en matière de gestion des ressources humaines publiques.Un accord a été signé avec une organisation internationale pour favoriser les échanges d’expertise en matière de gestion des ressources humaines publiques.', '1734506285849-12.jpg', NULL, '2024-12-18 09:58:51');

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
(6, 'first a la une', 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non autem sint minima repudiandae accusamus possimus repellat a necessitatibus numquam doloremque. Accusantium, a.', '1734518484337-1.jpg', '2024-12-18 12:00:00'),
(7, 'second a la une ', 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non autem sint minima repudiandae accusamus possimus repellat a necessitatibus numquam doloremque. Accusantium, a. Debitis, incidunt asperiores impedit veritatis ipsam vitae dolores deleniti a provident sed recusandae officia laborum saepe nostrum nemo odit? Soluta impedit suscipit, dolores a odio repellendus? Deserunt, porro!', NULL, '2024-12-18 12:00:15'),
(8, 'Troisieme annonce', 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non autem sint minima repudiandae accusamus possimus repellat a necessitatibus numquam doloremque. Accusantium, a. Debitis, incidunt asperiores impedit veritatis ipsam vitae dolores deleniti a provident sed recusandae officia laborum saepe nostrum nemo odit? Soluta impedit suscipit, dolores a odio repellendus? Deserunt, porro!', '1734518291850-8.jpg', '2024-12-18 13:36:58');

-- --------------------------------------------------------

--
-- Structure de la table `contacts`
--

CREATE TABLE `contacts` (
  `id` int(11) NOT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `subject` varchar(100) NOT NULL,
  `message` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `contacts`
--

INSERT INTO `contacts` (`id`, `first_name`, `last_name`, `email`, `subject`, `message`, `created_at`) VALUES
(1, 'feno nasandratra', 'santatriniaina', 'test@gmail.com', 'fitarainana', 'mitaraina La Présidence s’est engagée à créer une administration de proximité, à l’écoute de la population et de ses besoins, et à améliorer la qualité de vie des citoyens et de faciliter le travail des entreprises.\r\n\r\nMonsieur FANOHIZA Claude\r\nGénéral de la Présidence de la République de Madagascar', '2024-12-18 12:27:08'),
(8, 'ggg', 'hhhh', 'Admin@gmail.com', 'ggghhhh', 'hhhhh', '2024-12-19 11:22:26'),
(9, NULL, NULL, NULL, 'jjj', 'jjj', '2024-12-19 11:32:37'),
(10, NULL, NULL, 'tokyherizo004@gmail.com', 'test', 'test', '2024-12-19 11:34:11'),
(11, NULL, NULL, 'tokyherizo004@gmail.com', 'test', 'test 2', '2024-12-19 11:41:32'),
(12, NULL, NULL, 'tokyherizo004@gmail.com', ' Activer l\'authentification en deux étapes.', ' Activer l\'authentification en deux étapes.', '2024-12-19 11:47:46'),
(13, NULL, NULL, NULL, 'test', 'hhh', '2024-12-19 11:56:40'),
(14, NULL, NULL, 'Admin@gmail.com', 'ggghhhh', 'hhh', '2024-12-19 11:57:08'),
(15, NULL, NULL, NULL, 'hhh', 'kkkk', '2024-12-19 12:09:40'),
(16, NULL, NULL, NULL, 'fitarainana ', '\nNous sommes SANTATRINIAINA Feno Nasandratra et RANDRIANIRINA Toky Herizo, étudiants en Informatique de gestion Génie Logiciel et Intelligence Artificielle. Dans le cadre de notre formation, nous avons l’opportunité de réaliser un stage en binôme, ce qui nous permettrait de mettre en pratique nos compétences tout en apportant notre dynamisme à votre entreprise.', '2024-12-19 12:27:05'),
(17, NULL, NULL, NULL, 'miaraina izahay', 'const handleSubmit = async (e) => {\n    e.preventDefault();\n\n    // Validation de base\n    if (!formData.subject || !formData.message) {\n      setError(true);\n      setStatusMessage(\'L\\\'objet et le message sont requis.\');\n      return;\n    }\n\n    if (formData.email && formData.email !== formData.confirmEmail) {\n      setError(true);\n      setStatusMessage(\'Les emails ne correspondent pas.\');\n      return;\n    }\n\n    try {\n      const response = await axios.post(\'http://localhost:5001/api/contacts\', formData);\n\n      if (response.status === 201) {\n        setError(false);\n        setStatusMessage(\'Votre message a été envoyé avec succès.\');\n        setFormData({\n          firstName: \'\',\n          lastName: \'\',\n          email: \'\',\n          confirmEmail: \'\',\n          subject: \'\',\n          message: \'\',\n        });\n\n        // Recharger les messages après l\'envoi\n        window.dispatchEvent(new Event(\'messageAdded\'));  // Déclenchement de l\'événement global\n      }\n    } catch (error) {\n      setError(true);\n      setStatusMessage(\'Une erreur est survenue lors de l’envoi du message.\');\n      console.error(\'Erreur:\', error);\n    }\n  };\n', '2024-12-21 07:20:02'),
(18, 'first', 'Admin', 'test@gmail.com', 'resrr', 'aa', '2024-12-21 07:22:43'),
(19, NULL, NULL, NULL, 'iiiii', 'iiiii', '2024-12-21 08:04:08');

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
(30, 2, NULL, ' Direction des Affaires  Financières et de la Gestion du Patrimoine  ', 'tsy hay'),
(33, 2, NULL, 'Direction des  Ressources Humaines du Ministère(DRHM)', '017'),
(35, 2, NULL, 'Direction de la  Planification Stratégique, du Suivi et  Evaluation (DPSSE)', '013'),
(36, 27, NULL, 'Direction du Cabinet ', '517 '),
(37, 27, NULL, 'Direction de la communication  ', '513 '),
(38, 27, NULL, ' Personne responsable du marché  public', '516');

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
(2, 'Secretaire Generale(SG)', '1'),
(27, 'Ministre', '500');

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
(53, 21, 'Secrétariat ', '005'),
(57, 33, 'Service de l’Administration du  Personnel Central', '016'),
(58, 35, 'Service du Suivi-Evaluation du Secteur  public et du Reporting', '009'),
(59, 35, 'Service du Suivi-Evaluation du Travail,  de l’Emploi et du Reporting', '011'),
(60, 20, 'Service des Archives et des Fichiers  Electroniques', '010'),
(61, 21, 'Service de la Comptabilité de la  Direction de la Réforme de la Fonction  Publique ', '010'),
(62, 35, 'Service d’Appui  à la Planification  Stratégique', '012'),
(63, 33, 'Service de l’Administration du  Personnel Régional ', '014'),
(64, 33, 'Service de la Formation continue du  Personnel du Ministère', '015'),
(65, 38, 'Service comptabilité  ', '515');

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
(43, NULL, NULL, NULL, 49, 'Retraite pour limite d\'age', 'Demande manuscrite de l\'interessé avec avis favorable du supérieur hiérarchique,Relevé de service de l\'intéressé par le Ministrere employeur en trois (03) exemplaire ,Dernier Arreté d\'avencement , Acte de naissance , Attestation de non interruption de service,Photocopie du Bon de caisse ou Avis de crédit', '3 mois'),
(44, NULL, NULL, NULL, 50, 'Travaux d’impression et de photocopie du Ministère ', '', ''),
(45, NULL, NULL, NULL, 51, 'Suivi des dossiers de Retraite', 'Référence du dossier de retraite ', ''),
(46, NULL, NULL, NULL, 52, 'Etude et réalisation des projets de Réforme  concernant  tous les Ministères et Institutions', '', ''),
(48, NULL, NULL, 21, NULL, 'Coordination des opérations en matière de Réforme de  la Fonction Publique', '', ''),
(49, NULL, NULL, NULL, 49, 'Retraite  anticipée', ' Demande manuscrite de l’intéressé avec avis favorable du supérieur hiérarchique  , Relevé de service de l’intéressé établi par le ministère employeur en trois (03) exemplaires  , Copie de l’acte de naissance  , Dernier arrêté d’avancement  , Attestation de non interruption de service  , Photocopie du bon de caisse ou avis de crédit  , Attestation de non engagement à la banque (En cas de virement du salaire à la banque)  , NB : condition : au moins 15 ans des services effectifs ', '3mois'),
(50, NULL, NULL, NULL, 49, 'Mise à la retraite d’office pour raison de santé ', ' PV de la réunion du conseil de santé établi par le ministère de la santé  ,Relevé de service  , Projet d’arrêté', '3mois'),
(51, NULL, NULL, NULL, 49, 'Honorariat de grade', 'Demande manuscrite de l’intéressé  , Ampliation de l’arrêté de mise à la retraite', '3mois'),
(52, NULL, NULL, NULL, 49, 'Démission d’un fonctionnaire', ' Demande manuscrite de l’intéressé  , Etat des sommes éventuellement dues à l’administration  , Photocopie du dernier bon de caisse  ,Dernier arrêté d’avancement  ,Relevé de service', '3mois'),
(56, NULL, NULL, NULL, 57, 'Renouvellement Contrat  ', ' Demande manuscrite de l’intéressé adressé  au Ministre  , Dernière situation (avenant ou contrat)  , Fiche  57/58                      , 2 photos d’identité  , Photocopie Diplôme certifiée et équivalence  , BIN (si 1er contrat)  , Bon de Caisse ou Avis de Crédit  , Projet de contrat (03)   , Certificat Administratif (01)  , Attestation de Prise de Service (01)  , Attestation de non Interruption de Service (01)  , Bordereau d’envoi (pour Visa SONACO) ', ''),
(57, NULL, NULL, NULL, 61, 'Préparation, vérification de toutes les opérations  comptables liées à l’exécution du budget   et  Tenue des livres comptables ', 'Facture, bon de livraison, livre de l’ordre de route ', ''),
(58, NULL, NULL, NULL, 62, 'Mise en œuvre de la Planification et de la  Programmation', '', ''),
(59, NULL, NULL, 35, NULL, 'Coordination et planification stratégique des actions  prioritaires du Ministère', '', ''),
(60, NULL, NULL, NULL, 63, 'Traitement de dossiers des agents publics du Ministère  en charge de la Fonction Publique dans les régions ', 'Nom de la direction régionale  , Numéro Matricule', ''),
(61, NULL, NULL, NULL, 57, 'Virement Bancaire(Mandatement)', 'Demande manuscrite   , Relevé d’Identité Bancaire (RIB 03 copies) + photocopie CIN   , Acte formaté (03)  , Photocopie bon de caisse (03)  , BE pour mandatement ', ''),
(62, NULL, NULL, NULL, 57, 'Allocation familiale ', 'Demande manuscrite  avec numéro de téléphone   , Photocopie acte de mariage (03)  , Acte de naissance (03)  , Attestation de non-paiement (CNAPS 03)  , Déclaration de charge de famille (03)  , Certificat de scolarité (03)  , Certificat de vie (03)  , Avis de crédit (03)   , Certificat administratif   , BE pour mandatement', ''),
(63, NULL, NULL, NULL, 57, 'Avenant', 'Demande manuscrite de l’intéressé adressée au Ministre avec avis favorable  , Dernière situation (avenant et contrat)  , Fiche (57,58) si 1er avenant  , 2 photos d’identité  , Photocopie Diplôme certifiée et équivalence  , BIN (Bulletin Individuel de Note)  , Bon de Caisse ou Avis de Crédit  , Projet d’avenant (03)   , Certificat Administratif (01)  , Attestation de Prise de Service (01)  , Attestation de non Interruption de Service (01)  , Bordereau d’envoi (pour Visa SONACO ', ''),
(64, NULL, NULL, NULL, 57, 'Intégration ', 'Photocopie CIN certifiée  , Bon de Caisse ou Avis de Crédit  , Projet d’arrêté (03)   , Certificat Administratif (01)  , Attestation de Prise de Service (01)  , Attestation de non Interruption de Service (01)  , Bordereau d’envoi (pour Visa SONACO) ', ''),
(65, NULL, NULL, NULL, 57, 'Avenant Reclassement ', 'Demande manuscrite + numéro de téléphone   , Photocopie acte de mariage (03)  , Acte de naissance (03)  , Attestation de non-paiement (CNAPS 03)  , Déclaration de charge de famille (03)  , Certificat de scolarité (03)  , Certificat de vie (03)  , Avis de crédit (03)   , Certificat administratif   , BE pour mandatement ', ''),
(66, NULL, NULL, NULL, 57, 'Retraite  ', 'Demande manuscrite de l’intéressé   , Dernière situation   , Acte de naissance (01) ou photocopie CIN   , Avis de crédit (01)  , Projet d’arrêté (03)  , Relevé de service   , Attestation de non-interruption de service   , BE pour visa effectif ', ''),
(67, NULL, NULL, 33, NULL, 'Coordination des opérations en matière de gestion de  carrière du personnel du Ministère en charge de la  Fonction Publique   et  Formation continue du personnel ', '', ''),
(69, NULL, NULL, NULL, 65, 'Gestion du budget ', 'Facture   , Bon de commande   , Procès-verbal de réception   , convention   , NIF et  RIB et STAT  , Registre de commerce   , Procès-verbal d’évaluation   , Rapport de validation   , Avis d’attribution   , Ordre de service   , Décision d’attribution ', '');

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
(43, 'Admin', 'first', 'Admin', '$2b$10$JUhw6OsF5mGWvZW9dUTCte8IvUrImWft8HjAAFRP2auruG45UV3xG', 'Admin', '1721746116040.jpg', 1, '2024-12-20 15:56:28'),
(44, 'Communication', 'first', 'Communication', '$2b$10$DcuEiWXfUd0Y0y3eSH7WPOQrYfM/hCDzKlc.jc4wxMUOypZOs2BcO', 'Communication', '1718349718008.jpg', 0, '2024-12-20 15:57:19'),
(45, 'Service', 'first', 'Service', '$2b$10$yIyuE4KrrH1jB5.ex81y6eh7h/vTa2d1OMMNT/b9Z.nPucx99MWrC', 'Stan', '1722937694393.jpg', 0, '2024-12-20 15:58:10');

-- --------------------------------------------------------

--
-- Structure de la table `visitors`
--

CREATE TABLE `visitors` (
  `id` int(11) NOT NULL,
  `ip_address` varchar(45) NOT NULL,
  `visit_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `visitors`
--

INSERT INTO `visitors` (`id`, `ip_address`, `visit_date`) VALUES
(1, '::ffff:127.0.0.1', '2025-01-14 08:20:15'),
(2, '::ffff:127.0.0.1', '2025-01-14 08:20:15'),
(3, '::1', '2025-01-14 08:20:42'),
(4, '122', '2025-01-10 08:42:26'),
(5, '455', '2025-02-02 08:44:20'),
(6, '4444', '2025-03-13 09:43:21'),
(7, '222', '2025-06-18 08:43:21'),
(8, '4444', '2025-03-13 09:43:21'),
(9, '222', '2025-06-18 08:43:21');

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
-- Index pour la table `contacts`
--
ALTER TABLE `contacts`
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
-- Index pour la table `visitors`
--
ALTER TABLE `visitors`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `actu`
--
ALTER TABLE `actu`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT pour la table `contacts`
--
ALTER TABLE `contacts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT pour la table `direction`
--
ALTER TABLE `direction`
  MODIFY `id_d` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT pour la table `directiongenerale`
--
ALTER TABLE `directiongenerale`
  MODIFY `id_dg` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT pour la table `secretairegeneral`
--
ALTER TABLE `secretairegeneral`
  MODIFY `id_sg` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT pour la table `service`
--
ALTER TABLE `service`
  MODIFY `id_s` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;

--
-- AUTO_INCREMENT pour la table `serviceoffert`
--
ALTER TABLE `serviceoffert`
  MODIFY `id_service` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=70;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `users1`
--
ALTER TABLE `users1`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT pour la table `visitors`
--
ALTER TABLE `visitors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

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
