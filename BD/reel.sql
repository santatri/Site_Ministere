-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mer. 05 fév. 2025 à 07:40
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
(31, 'Un accord a été signé avec une organisation internationale pour favoriser les échanges d’expertise en matière de gestion des ressources humaines publiques.', 'Un accord a été signé avec une organisation internationale pour favoriser les échanges d’expertise en matière de gestion des ressources humaines publiques.Un accord a été signé avec une organisation internationale pour favoriser les échanges d’expertise en matière de gestion des ressources humaines publiques.Un accord a été signé avec une organisation internationale pour favoriser les échanges d’expertise en matière de gestion des ressources humaines publiques.', '1734506285849-12.jpg', NULL, '2024-12-18 09:58:51'),
(32, 'Digitalisation equivalence', 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officia similique quo distinctio minima alias dignissimos ut repellendus, ad delectus nam amet molestiae nemo accusantium voluptatem obcaecati, laborum sit impedit. Deserunt, reprehenderit. Eos perspiciatis labore, omnis officiis ad obcaecati dignissimos soluta distinctio asperiores deleniti. Animi illo, commodi earum praesentium dicta rem!', '1738068167511-1.jpg', NULL, '2025-01-28 13:42:47'),
(33, 'Service', 'Service', '1738069180835-2.gif', NULL, '2025-01-28 13:59:40');

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
(6, 'first ', 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non autem sint minima repudiandae accusamus possimus repellat a necessitatibus numquam doloremque. Accusantium, a.', NULL, '2024-12-18 12:00:00'),
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
(19, NULL, NULL, NULL, 'iiiii', 'iiiii', '2024-12-21 08:04:08'),
(20, NULL, NULL, NULL, 'fitarainana ', 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officia similique quo distinctio minima alias dignissimos ut repellendus, ad delectus nam amet molestiae nemo accusantium voluptatem obcaecati, laborum sit impedit. Deserunt, reprehenderit. Eos perspiciatis labore, omnis officiis ad obcaecati dignissimos soluta distinctio asperiores deleniti. Animi illo, commodi earum praesentium dicta rem!', '2025-01-28 12:34:07');

-- --------------------------------------------------------

--
-- Structure de la table `dg_info`
--

CREATE TABLE `dg_info` (
  `id` int(11) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `dg_name` varchar(100) NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `description_1` text NOT NULL,
  `list_1` text NOT NULL,
  `description_2` text DEFAULT NULL,
  `list_2` text DEFAULT NULL,
  `description_3` text DEFAULT NULL,
  `list_3` text DEFAULT NULL,
  `post` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `dg_info`
--

INSERT INTO `dg_info` (`id`, `first_name`, `last_name`, `dg_name`, `image_url`, `description_1`, `list_1`, `description_2`, `list_2`, `description_3`, `list_3`, `post`) VALUES
(5, 'Heridja Patrick', ' RAMAROSON', 'Direction Générale de la Fonction Publique ', '/uploads/DG1.jpg', 'La DGFOP est un entité au sein du Ministère du Travail, de l\'Emploi et de la Fonction Publique.\r\n\r\nElle est chargée principalement de :', ' Faire connaitre et veiller au respect de la réglementation en matière de fonction publique de l\'Etat,Appliquer la politique générale de l\'Etat en matière de fonction publique', 'La DGFOP se comporte de 4 directions :', 'La Direction des Ressources Humaines de l\'Etat(DRHE)  ,   La Direction de l\'Evaluation et de la Promotion de l\'Ethique et de la Déontologie(DEPED)  ,   La Direction de la Formation et du Perfectionnement des Agents de l\'Etat(DFPAE)     ,La Direction de la Réforme de la Fonction Publique (DRFP)', '', '', 'Directeur Général de la Fonction Publique');

-- --------------------------------------------------------

--
-- Structure de la table `direction`
--

CREATE TABLE `direction` (
  `id_d` int(11) NOT NULL,
  `id_sg` int(11) DEFAULT NULL,
  `id_dg` int(11) DEFAULT NULL,
  `nom_d` varchar(255) DEFAULT NULL,
  `porte_d` varchar(50) DEFAULT NULL,
  `id_ms` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `direction`
--

INSERT INTO `direction` (`id_d`, `id_sg`, `id_dg`, `nom_d`, `porte_d`, `id_ms`) VALUES
(20, 2, NULL, 'Direction du Systeme d\'Information(DSI)', '508', NULL),
(21, NULL, 1, 'Direction de le Réforme de le Fonction Publique(DRFP)', '006', NULL),
(28, 2, NULL, 'Directon des Affaires Financieres et de la Gestion de Patrimoine(DAFGP)', '212', NULL),
(29, NULL, 1, 'Direction des Ressources Humaines de l\'Etat(DRHE)', '219 ', NULL),
(30, 2, NULL, ' Direction des Affaires  Financières et de la Gestion du Patrimoine  (DAFGP)', '212', NULL),
(33, 2, NULL, 'Direction des  Ressources Humaines du Ministère(DRHM)', '017', NULL),
(35, 2, NULL, 'Direction de la  Planification Stratégique, du Suivi et  Evaluation (DPSSE)', '013', NULL),
(37, NULL, NULL, 'Direction de la communication  ', '513 ', 1),
(38, NULL, NULL, ' Personne responsable du marché  public', '516', 1),
(40, 2, NULL, 'Direction des Etudes et des Affaires Juridiques (DEAJ)', '221', NULL),
(41, NULL, 1, 'Direction de l’Evaluation de la Promotion de l’Ethique et de la Déontologie (DEPED)', '103 ', NULL),
(42, NULL, 1, 'Direction de la Formation et du Perfectionnement des Agents de l’Etat (DFPAE)', '105', NULL),
(44, NULL, 3, 'Direction de la Migration Professionnelle (DMP)', '407', NULL),
(49, NULL, 3, 'Direction de la Sécurité Sociales des Travailleurs (DSST)', '311', NULL),
(50, NULL, 4, 'Direction de la Professionnalisation des petits métiers et de la promotion de l’auto- emploi (DPPMPAE)', '315', NULL),
(51, NULL, 3, 'Direction de la Promotion du Travail Décent (DPTD)', '406', NULL),
(52, NULL, 4, 'Direction de l’Appui à l’Insertion professionnelle des Jeunes et des Sans Emploi (DAIPJSE)', '411', NULL),
(53, NULL, 3, 'Direction du Travail et de la Promotion Des Droits Fondamentaux (DTPDF)', '420', NULL),
(55, 2, NULL, 'Directions Régionales du Travail, de l’Emploi et de la Fonction Publique (DRTEFOP)', 'xxx', NULL),
(57, NULL, 4, 'Direction de la Formation Continue et du\r\nRenforcement des Capacité (DFCRC)', 'xxx', NULL);

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
(1, 2, 'Direction Géneral de la Fonction Publique(DGFOP)', '113'),
(3, 2, 'Direction Génerale du Travail(DGT)', '301'),
(4, 2, 'Direction Géneral de la Promotion de l\'Emploi(DGPE)', '401 ');

-- --------------------------------------------------------

--
-- Structure de la table `d_info`
--

CREATE TABLE `d_info` (
  `id` int(11) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `d_name` varchar(255) NOT NULL,
  `post` varchar(255) NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `logo_url` varchar(255) DEFAULT NULL,
  `description_1` text NOT NULL,
  `list_1` text NOT NULL,
  `description_2` text DEFAULT NULL,
  `list_2` text DEFAULT NULL,
  `description_3` text DEFAULT NULL,
  `list_3` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `d_info`
--

INSERT INTO `d_info` (`id`, `first_name`, `last_name`, `d_name`, `post`, `image_url`, `logo_url`, `description_1`, `list_1`, `description_2`, `list_2`, `description_3`, `list_3`) VALUES
(3, 'Clara', 'ANDRIAMIHARIMANANA', 'Direction de l\'Evaluation et de la Promotion de l\'Ethique et de la Déontologie (DEPED)', 'Directeur de l\'Evaluation et de la Promotion de l\'Ethique et de la Déontologie', '/uploads/madame.jpg', '/uploads/service.jpg', 'La Direction de l\'Evaluation et de la Promotion de l\'Ethique et de la Déontologie (DEPED) joue un rôle crucial au sein du Ministère du Travail, de l\'Emploi et de la Fonction Publique. Elle se consacre à la promotion des valeurs éthiques et déontologiques dans la fonction publique.\r\n\r\nSa mission principale est de renforcer l\'intégrité, la transparence et la responsabilité dans l\'administration publique à travers des mécanismes d\'évaluation et des initiatives de sensibilisation.\r\n\r\nLes missions de la DEPED incluent :', 'Élaborer et mettre en œuvre des politiques d\'éthique et de déontologie., Former et sensibiliser les agents publics aux valeurs éthiques., Évaluer les pratiques administratives pour garantir le respect des normes déontologiques., Mettre en place des mécanismes de prévention et de lutte contre la corruption., Promouvoir une culture de responsabilité et de transparence dans la gestion publique.', 'En travaillant en synergie avec d\'autres directions, la DEPED aspire à instaurer une administration exemplaire qui inspire confiance et respect auprès des citoyens.', '', '', ''),
(4, 'Andrianavomanana Tsitohaina Stéphan', 'RAKOTONANAHARY', 'Direction des Ressources Humaines de l\'État (DRHE)', 'Directeur des Ressources Humaines de l\'État', '/uploads/madame.jpg', '/uploads/direc.jpg', 'La Direction des Ressources Humaines de l\'État (DRHE) est un organe stratégique du Ministère du Travail, de l\'Emploi et de la Fonction Publique. Elle est chargée de la gestion et du développement des ressources humaines au sein de l\'administration publique.\r\n\r\nSa mission principale est d\'assurer une gestion efficace, équitable et transparente des ressources humaines, tout en veillant au respect des principes d\'éthique et de déontologie.\r\n\r\nLes missions de la DRHE incluent :', 'Élaborer des politiques et des stratégies de gestion des ressources humaines., Superviser les recrutements et les nominations dans la fonction publique., Mettre en œuvre des plans de formation pour le développement des compétences des agents publics., Garantir la gestion équitable des carrières et des promotions., Assurer le suivi et l\'évaluation des performances des agents publics.', 'Grâce à ses actions, la DRHE contribue à renforcer l\'efficacité et la performance des institutions publiques, tout en créant un environnement de travail favorable pour les agents de l\'État.', '', '', ''),
(5, 'Ravakiniaina ', 'RAHARINJATO ', 'Direction de l\'Évaluation et de la Promotion de l\'Éthique et de la Déontologie (DFPAE)', 'Directeur de l\'Évaluation et de la Promotion de l\'Éthique et de la Déontologie', '/uploads/DFPAE.JPG', '/uploads/ser.jpg', 'La Direction de l\'Évaluation et de la Promotion de l\'Éthique et de la Déontologie (DFPAE) est un organe central au sein du Ministère du Travail, de l\'Emploi et de la Fonction Publique. Sa vocation première est de promouvoir une culture éthique et déontologique dans l\'administration publique afin d\'assurer une gouvernance transparente, intègre et orientée vers le service des citoyens.\r\n\r\nLa DFPAE se distingue par son rôle d\'évaluation continue des pratiques administratives et des réformes en matière d\'éthique. Elle s\'attache à identifier les défis liés à l\'intégrité, au professionnalisme et à la transparence dans la fonction publique, tout en proposant des solutions concrètes pour y remédier.\r\n\r\nParmi ses objectifs, la DFPAE vise à renforcer la sensibilisation des agents publics aux valeurs éthiques, à développer des mécanismes de suivi et d\'évaluation des pratiques déontologiques, et à instaurer des normes élevées en matière de conduite administrative. Elle œuvre également à l\'élaboration de politiques innovantes pour prévenir et lutter contre les comportements non conformes aux principes éthiques.\r\n\r\nGrâce à sa collaboration étroite avec les autres directions du ministère et ses partenaires internationaux, la DFPAE contribue à la modernisation de l\'administration publique en mettant en avant l\'importance de l\'éthique et de la déontologie comme piliers fondamentaux de la bonne gouvernance.', 'sss', '', '', '', ''),
(6, 'Christian', 'RABESON', 'Direction de la Réforme de la Fonction Publique (DRFP)', 'Directeur de la Réforme de la Fonction Publique', '/uploads/TalÃ©.jpg', '/uploads/53.jpg', 'La Direction de la Réforme de la Fonction Publique (DRFP) joue un rôle central dans la modernisation et l\'optimisation de la fonction publique. Sa mission principale est d\'assurer une gestion efficace, équitable et transparente des ressources humaines dans l\'administration publique.\r\n\r\nLes missions de la DRFP incluent :', ' Élaborer et mettre en œuvre des politiques et stratégies de réforme administrative., Promouvoir l\'efficacité et la performance dans la gestion des ressources humaines de l\'État., Réviser les cadres juridiques et réglementaires pour les adapter aux besoins actuels., Accompagner les administrations dans l\'implémentation des réformes structurelles., Sensibiliser et former les agents publics aux nouvelles réformes.', 'En collaborant avec d\'autres directions et partenaires, la DRFP s\'efforce de garantir une administration publique compétente, innovante et centrée sur les citoyens.', '', '', '');

-- --------------------------------------------------------

--
-- Structure de la table `ministre`
--

CREATE TABLE `ministre` (
  `id_ms` int(11) NOT NULL,
  `nom_ms` varchar(255) DEFAULT NULL,
  `porte_ms` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `ministre`
--

INSERT INTO `ministre` (`id_ms`, `nom_ms`, `porte_ms`) VALUES
(1, 'Ministre', '500');

-- --------------------------------------------------------

--
-- Structure de la table `secretairegeneral`
--

CREATE TABLE `secretairegeneral` (
  `id_sg` int(11) NOT NULL,
  `nom_sg` varchar(255) DEFAULT NULL,
  `porte_sg` varchar(50) DEFAULT NULL,
  `id_ms` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `secretairegeneral`
--

INSERT INTO `secretairegeneral` (`id_sg`, `nom_sg`, `porte_sg`, `id_ms`) VALUES
(2, 'Secretaire Generale(SG)', '320', 1),
(29, 'Direction du Cabinet ', '517 ', 1),
(30, 'Direction de la communication', '513', 1);

-- --------------------------------------------------------

--
-- Structure de la table `service`
--

CREATE TABLE `service` (
  `id_s` int(11) NOT NULL,
  `id_d` int(11) DEFAULT NULL,
  `nom_s` varchar(255) DEFAULT NULL,
  `porte_s` varchar(50) DEFAULT NULL,
  `id_dg` int(11) DEFAULT NULL,
  `id_sg` int(11) DEFAULT NULL,
  `id_ms` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `service`
--

INSERT INTO `service` (`id_s`, `id_d`, `nom_s`, `porte_s`, `id_dg`, `id_sg`, `id_ms`) VALUES
(1, 28, 'courier', '001', NULL, NULL, NULL),
(49, 29, 'Service de la gestion de fin de carriere/Retraite', '008', NULL, NULL, NULL),
(50, 20, 'Service des Archives et des Fichiers  Electroniques/Parc informatique', '002', NULL, NULL, NULL),
(51, 29, '  Service de la Retraite', '003', NULL, NULL, NULL),
(52, 21, 'Service d’études et d’appui  à la  Réforme', '004', NULL, NULL, NULL),
(53, 21, 'Secrétariat ', '005', NULL, NULL, NULL),
(57, 33, 'Service de l’Administration du  Personnel Central', '016', NULL, NULL, NULL),
(58, 35, 'Service du Suivi-Evaluation du Secteur  public et du Reporting', '009', NULL, NULL, NULL),
(59, 35, 'Service du Suivi-Evaluation du Travail,  de l’Emploi et du Reporting', '011', NULL, NULL, NULL),
(60, 20, 'Service des Archives et des Fichiers  Electroniques', '010', NULL, NULL, NULL),
(61, 21, 'Service de la Comptabilité de la  Direction de la Réforme de la Fonction  Publique ', '010', NULL, NULL, NULL),
(62, 35, 'Service d’Appui  à la Planification  Stratégique', '012', NULL, NULL, NULL),
(63, 33, 'Service de l’Administration du  Personnel Régional ', '014', NULL, NULL, NULL),
(64, 33, 'Service de la Formation continue du  Personnel du Ministère', '015', NULL, NULL, NULL),
(65, 38, 'Service comptabilité  ', '515', NULL, NULL, NULL),
(66, 35, 'Service du Suivi-Evaluation du Secteur public et du Reporting', '009', NULL, NULL, NULL),
(67, 29, 'Service des Accidents de Travail et des Maladies Professionnelles', '201', NULL, NULL, NULL),
(68, 41, 'Service de l’Evaluation de la Performance des Agents de l’Etat', '202', NULL, NULL, NULL),
(69, 29, 'Service du Personnel Encadré', '117', NULL, NULL, NULL),
(70, 29, 'Service de la Gestion administrative du Recrutement', '207', NULL, NULL, NULL),
(71, 28, 'Service de la Logistique et de la Gestion du Patrimoine', '210', NULL, NULL, NULL),
(72, 30, 'Service Financier', '213', NULL, NULL, NULL),
(73, 29, 'Service du Personnel non Encadré', '214', NULL, NULL, NULL),
(74, 28, 'Service de la Maintenance et de l’’entretien des infrastructures Ministère ', '218', NULL, NULL, NULL),
(75, 29, 'Service de circuit des dossiers à la Direction des Ressources Humaines de l’Etat', '220', NULL, NULL, NULL),
(76, 40, 'Service secrétariat', '222', NULL, NULL, NULL),
(77, 41, 'Service des Affaires disciplinaires', '104', NULL, NULL, NULL),
(78, 42, 'Service des Equivalences Administratives des titres', '107', NULL, NULL, NULL),
(79, 21, 'Service de la Modernisation de la Fonction Publique', '115', NULL, NULL, NULL),
(80, 21, 'Service de la Gestion Prévisionnelle des Effectifs de l’Emploi et des Compétences', '115', NULL, NULL, NULL),
(81, 29, 'Service de Recensement et de Redéploiement', '116', NULL, NULL, NULL),
(82, 40, 'Service des Organigrammes et de la Documentation ', '118', NULL, NULL, NULL),
(83, 40, 'Service d’Appui aux Etudes Juridiques', '119', NULL, NULL, NULL),
(84, 40, 'Service de la Législation et Contentieux', '120', NULL, NULL, NULL),
(85, 40, 'Service des Organigrammes et de la Documentation', '121', NULL, NULL, NULL),
(86, 42, 'Service d’Appui et Contrôle des Etablissements de Formation publique et privée', '122', NULL, NULL, NULL),
(87, 42, 'Service des Concours Administratifs', '123', NULL, NULL, NULL),
(88, 44, 'Service de la Main d’œuvre à l’étrange', '405', NULL, NULL, NULL),
(436, NULL, 'Service de la Comptabilité', '402', 4, NULL, NULL),
(449, 37, 'Service de la veille informationnelle', 'xxx', NULL, NULL, NULL),
(450, 37, 'Service de la Communication', 'xxxx', NULL, NULL, NULL),
(453, 37, 'test', '332', NULL, NULL, NULL);

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
  `delai` varchar(50) DEFAULT NULL,
  `id_ms` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `serviceoffert`
--

INSERT INTO `serviceoffert` (`id_service`, `id_sg`, `id_dg`, `id_d`, `id_s`, `nom_service`, `dossier_prepare`, `delai`, `id_ms`) VALUES
(20, NULL, NULL, NULL, 1, 'Réception et redistribution des dossiers', '', '1 jours ', NULL),
(43, NULL, NULL, NULL, 49, 'Retraite pour limite d\'age', 'Demande manuscrite de l\'interessé avec avis favorable du supérieur hiérarchique,Relevé de service de l\'intéressé par le Ministrere employeur en trois (03) exemplaire ,Dernier Arreté d\'avencement , Acte de naissance , Attestation de non interruption de service,Photocopie du Bon de caisse ou Avis de crédit', '3 mois', NULL),
(44, NULL, NULL, NULL, 50, 'Travaux d’impression et de photocopie du Ministère ', '', '', NULL),
(45, NULL, NULL, NULL, 51, 'Suivi des dossiers de Retraite', 'Référence du dossier de retraite ', '', NULL),
(46, NULL, NULL, NULL, 52, 'Etude et réalisation des projets de Réforme  concernant  tous les Ministères et Institutions', '', '', NULL),
(48, NULL, NULL, 21, NULL, 'Coordination des opérations en matière de Réforme de  la Fonction Publique', '', '', NULL),
(49, NULL, NULL, NULL, 49, 'Retraite  anticipée', ' Demande manuscrite de l’intéressé avec avis favorable du supérieur hiérarchique  , Relevé de service de l’intéressé établi par le ministère employeur en trois (03) exemplaires  , Copie de l’acte de naissance  , Dernier arrêté d’avancement  , Attestation de non interruption de service  , Photocopie du bon de caisse ou avis de crédit  , Attestation de non engagement à la banque (En cas de virement du salaire à la banque)  , NB : condition : au moins 15 ans des services effectifs ', '3mois', NULL),
(50, NULL, NULL, NULL, 49, 'Mise à la retraite d’office pour raison de santé ', ' PV de la réunion du conseil de santé établi par le ministère de la santé  ,Relevé de service  , Projet d’arrêté', '3mois', NULL),
(51, NULL, NULL, NULL, 49, 'Honorariat de grade', 'Demande manuscrite de l’intéressé  , Ampliation de l’arrêté de mise à la retraite', '3mois', NULL),
(52, NULL, NULL, NULL, 49, 'Démission d’un fonctionnaire', ' Demande manuscrite de l’intéressé  , Etat des sommes éventuellement dues à l’administration  , Photocopie du dernier bon de caisse  ,Dernier arrêté d’avancement  ,Relevé de service', '3mois', NULL),
(56, NULL, NULL, NULL, 57, 'Renouvellement Contrat  ', ' Demande manuscrite de l’intéressé adressé  au Ministre  , Dernière situation (avenant ou contrat)  , Fiche  57/58                      , 2 photos d’identité  , Photocopie Diplôme certifiée et équivalence  , BIN (si 1er contrat)  , Bon de Caisse ou Avis de Crédit  , Projet de contrat (03)   , Certificat Administratif (01)  , Attestation de Prise de Service (01)  , Attestation de non Interruption de Service (01)  , Bordereau d’envoi (pour Visa SONACO) ', '', NULL),
(57, NULL, NULL, NULL, 61, 'Préparation, vérification de toutes les opérations  comptables liées à l’exécution du budget   et  Tenue des livres comptables ', 'Facture, bon de livraison, livre de l’ordre de route ', '', NULL),
(58, NULL, NULL, NULL, 62, 'Mise en œuvre de la Planification et de la  Programmation', '', '', NULL),
(59, NULL, NULL, 35, NULL, 'Coordination et planification stratégique des actions  prioritaires du Ministère', '', '', NULL),
(60, NULL, NULL, NULL, 63, 'Traitement de dossiers des agents publics du Ministère  en charge de la Fonction Publique dans les régions ', 'Nom de la direction régionale  , Numéro Matricule', '', NULL),
(61, NULL, NULL, NULL, 57, 'Virement Bancaire(Mandatement)', 'Demande manuscrite   , Relevé d’Identité Bancaire (RIB 03 copies) + photocopie CIN   , Acte formaté (03)  , Photocopie bon de caisse (03)  , BE pour mandatement ', '', NULL),
(62, NULL, NULL, NULL, 57, 'Allocation familiale ', 'Demande manuscrite  avec numéro de téléphone   , Photocopie acte de mariage (03)  , Acte de naissance (03)  , Attestation de non-paiement (CNAPS 03)  , Déclaration de charge de famille (03)  , Certificat de scolarité (03)  , Certificat de vie (03)  , Avis de crédit (03)   , Certificat administratif   , BE pour mandatement', '', NULL),
(63, NULL, NULL, NULL, 57, 'Avenant', 'Demande manuscrite de l’intéressé adressée au Ministre avec avis favorable  , Dernière situation (avenant et contrat)  , Fiche (57,58) si 1er avenant  , 2 photos d’identité  , Photocopie Diplôme certifiée et équivalence  , BIN (Bulletin Individuel de Note)  , Bon de Caisse ou Avis de Crédit  , Projet d’avenant (03)   , Certificat Administratif (01)  , Attestation de Prise de Service (01)  , Attestation de non Interruption de Service (01)  , Bordereau d’envoi (pour Visa SONACO ', '', NULL),
(64, NULL, NULL, NULL, 57, 'Intégration ', 'Demande manuscrite de l’intéressé adressée au Ministre avec avis favorable\n, Photocopie Diplôme certifiée et équivalence\n, Acte de naissance (moins 1 an)\n, Les 3 contrats de travail (1er - 2ème - 3ème contrat)\n, Les 3 avenants (1er - 2ème - 3ème avenant)\n, Photocopie CIN certifiée\n, Bon de Caisse ou Avis de Crédit\n, Projet d’arrêté (03)\n, Certificat Administratif (01)\n, Attestation de Prise de Service (01)\n, Attestation de non Interruption de Service (01)\n, Bordereau d’envoi (pour Visa SONACO)', '', NULL),
(65, NULL, NULL, NULL, 57, 'Avenant Reclassement ', 'Demande manuscrite + numéro de téléphone   , Photocopie acte de mariage (03)  , Acte de naissance (03)  , Attestation de non-paiement (CNAPS 03)  , Déclaration de charge de famille (03)  , Certificat de scolarité (03)  , Certificat de vie (03)  , Avis de crédit (03)   , Certificat administratif   , BE pour mandatement ', '', NULL),
(66, NULL, NULL, NULL, 57, 'Retraite  ', 'Demande manuscrite de l’intéressé   , Dernière situation   , Acte de naissance (01) ou photocopie CIN   , Avis de crédit (01)  , Projet d’arrêté (03)  , Relevé de service   , Attestation de non-interruption de service   , BE pour visa effectif ', '', NULL),
(67, NULL, NULL, 33, NULL, 'Coordination des opérations en matière de gestion de  carrière du personnel du Ministère en charge de la  Fonction Publique   et  Formation continue du personnel ', '', '', NULL),
(69, NULL, NULL, NULL, 65, 'Gestion du budget ', 'Facture   , Bon de commande   , Procès-verbal de réception   , convention   , NIF et  RIB et STAT  , Registre de commerce   , Procès-verbal d’évaluation   , Rapport de validation   , Avis d’attribution   , Ordre de service   , Décision d’attribution ', '', NULL),
(75, NULL, NULL, 21, NULL, 'Travaux de secrétariat administratif et technique adaptés à la mission spécifique de la Direction de la Réforme de la Fonction Publique', '', '', NULL),
(76, NULL, NULL, NULL, 66, 'Suivi du secteur Public', '', '', NULL),
(77, NULL, NULL, NULL, 59, 'Suivi des activités du Ministère', '', '', NULL),
(78, NULL, NULL, NULL, 60, 'Traitement les relevés de service', '', '', NULL),
(79, NULL, NULL, NULL, 61, 'Préparation, vérification de toutes les opérations comptables liées à l’exécution du budget ', 'Facture, bon de livraison, livre de l’ordre de route', '', NULL),
(80, NULL, NULL, NULL, 61, 'Tenue des livres comptables', 'Facture, bon de livraison, livre de l’ordre de route', '', NULL),
(81, NULL, NULL, NULL, 62, 'Mise en œuvre de la Planification et de la Programmation', '', '', NULL),
(82, NULL, NULL, 35, NULL, 'Coordination et planification stratégique des actions prioritaires du Ministère', '', '', NULL),
(83, NULL, NULL, NULL, 63, 'Traitement de dossiers des agents publics du Ministère en charge de la Fonction Publique dans les régions', 'Nom de la direction régionale,\nNuméro Matricule', '', NULL),
(84, NULL, NULL, NULL, 68, 'Evaluation des compétences et des connaissances des agents de l’Etat', 'Numéro matricule', '', NULL),
(85, NULL, NULL, NULL, 69, 'Attribution de Bonification', 'Demande avec avis favorable du responsable des Ressources Humaines du Ministère\nemployeur\n, Photocopie certifiée dernière situation\n, Photocopie certifiée diplôme\n, Equivalence du diplôme\n, Attestation de non attribution de bonification\n, Photocopie avis de crédit\n, Etat Signalétique\n, Relevé de Service\n, Photocopie diplôme BACC', '72 heures', NULL),
(86, NULL, NULL, NULL, 69, 'Préparation d’ « Avancement »', 'Avancement d’Echelon : - photocopie certifiée de la dernière situation\n- photocopie avis de crédit\n, Avancement de classe : - photocopie certifiée de la dernière situation\n- BIN\n- PV ratifié par la Fonction Publique\n- photocopie avis de crédit\n, Reclassement Indiciaire : - photocopie certifiée de la dernière situation\n- photocopie avis de crédit\n, Majoration d’Indice :- photocopie certifiée de la dernière situation\n- photocopie avis de crédit', '72 heures', NULL),
(87, NULL, NULL, NULL, 69, 'Régularisation de Position règlementaire', '1 - Mise à disposition pour emploi :\n ,Demande avec avis favorable collégiale entre les deux départements concernés\n ,Photocopie certifiée de la dernière situation\n,Photocopie avis e crédit,\n2 - Fin de la mise à la disposition pour emploi : Photocopie certifiée de l’arrêté e la mise à\ndisposition pour emploi\n3 - Position de détachement : Situation des effectifs budgétaires\n4 - Fin de détachement : Photocopie de l’arrêté de détachement\n5 - Position Hors Cadre : \n, Demande au Ministre en charge de la FOP avec avis favorable du Ministère Employeur\n, Photocopie du document preuve d’adhésion\n6 - Réintégration après Hors- Cadre : Photocopie certifié de l’arrêté Hors-Cadre\n7 - Disponibilité sans Solde : Demande avec avis favorable du chef hiérarchique\n8 - Réintégration après disponibilité sans solde :\n, Demande avec avis favorable du chef hiérarchique\n, Situation des effectifs budgétaires\n, Photocopie du dernier avis de crédit', '', NULL),
(88, NULL, NULL, NULL, 70, 'Titularisation dans le corps des fonctionnaires', 'Demande avec avis du supérieur hiérarchique\n, Photocopie certifiée de l’Arrête de nomination ou d’Intégration\n, Bulletin Individuel de Notes\n, Attestation de non jouissance de congé\n, Attestation de prise de service\n, Souche du Bon de caisse ou avis de crédit', '72 heures', NULL),
(89, NULL, NULL, NULL, 70, 'Intégration des agents non encadré dans le corps des fonctionnaires ', 'Demande manuscrite avec avis favorable, adressée au Min FOP\n, Photocopie certifiée de toute la décision d’engagement\n, Attestation de non interruption de service\n, Bulletin 57-58\n, Attestation de position militaire\n, Photocopie certifiée du Diplôme\n, Arrêté d’Equivalence\n, Photocopie certifié de la CIN\n, Copie de l’Acte de naissance\n, Attestation de qualification\n, Organigramme cosigné par le Maire et l’organe délibérant pour les CTD\n, Extrait de l’effectif budgétaire (Budget autonome)\n, Lettre d’engagement du Maire (CTD)\n, ECD : Casier judiciaire (bulletin N° 3)\n Disponibilité de poste budgétaire (Budget général)\n, ELD : Aménagement de poste budgétaire\n Lettre d’aménagement du poste budgétaire (Budget général) \n, EFA : Photocopie certifiée des premiers et derniers contrats de travail\n Photocopie certifiée du dernier avenant\n Photocopie certifiée de l’avenant de reclassement\n Certificat administratif\n Souche du Bon de caisse ou avis de crédit', '72 heures', NULL),
(90, NULL, NULL, NULL, 70, 'Nomination', 'Dernière situation,  Avis de crédit,  Attestation non jouissance de congé,  Attestation pris de service,  Photocopie certifiée du Diplôme,  Arrêté d’Equivalence,  Avis favorable (chef Hiérarchie),  Bulletin 57-58,  Casier judiciaire, \n Arrêtée d’ouverture ', '72 heures', NULL),
(92, NULL, NULL, NULL, 70, 'Intégration1', 'Casier judiciaire,  Bulletin 57-58,  Disponibilité de poste budgétaire , Contrats / Avenants , Photocopie certifiée du Diplôme , Arrêté d’Equivalence, Attestation de prise de service,  Attestation de non interruption de service,  Avis de crédit,  Demande (adressé au Ministre)', '72 heures', NULL),
(93, NULL, NULL, NULL, 70, 'Titularisation', 'Liste d’Aménagement,  Dernière situation,  Avis de Crédit,  Attestation de non jouissance de congé,  Attestation de pris de service,  Photocopie certifiée du Diplôme,  Arrêté d’Equivalence,  Avis favorable (chef Hiérarchie)', '72 heures', NULL),
(94, NULL, NULL, NULL, 69, 'Révision et régularisation de situation administrative des agents de l’Etat et  Tenue de la réunion de la commission Tripartite', 'Numéros matricule', '72 heures', NULL),
(95, NULL, NULL, NULL, 71, 'Entretien des Véhicules Administratives et  Délivrance d’autorisation de sortie ', '', '', NULL),
(96, NULL, NULL, NULL, 71, 'Gestion du patrimoine du Ministère : matériels techniques et mobiliers de bureau, matériels roulants et tous les immeubles appartenant au Ministère', 'Bon de commande (matériels de bureau / produits d’entretien) , Bon de livraison,  Bon de sortie,  Facture, \n PV de réception provisoire (immeuble),  PV de réception technique (immeuble),  Attestation de conformité (immeubles),  \nFiche de détenteur ', '', NULL),
(97, NULL, NULL, NULL, 71, 'Gestion, vérification et supervision des matériels roulants', 'PY de réception,  Autorisation de conduite d’un véhicule administratif\n,\n Ordre de sortie de véhicule administratif,  Livret service automobile,  Livret parcours effectué,  Livret garage et station-service,  Bon de commande : pièces, huiles, lubrifiants', '', NULL),
(98, NULL, NULL, NULL, 71, 'Comptabilisation ‘’matière ‘’ relative à l’ensemble du Ministère au niveau Central et régional', 'PV de recensement,  Fiche d’inventaire des mobiliers et des matériels informatiques,  Fiche détenteur,  Ordre d’entrée,  Ordre de sortie', '', NULL),
(99, NULL, NULL, NULL, 72, 'Travaux de secrétariat administratif et technique adaptés à la mission spécifique de la Direction des Affaires Administratives et de la Gestion du Patrimoine de l’Etat', '', '', NULL),
(100, NULL, NULL, 28, NULL, 'Coordination du fonctionnement du service administratif et financier du Ministère', '', '', NULL),
(101, NULL, NULL, NULL, 72, 'Comptabilité du Cabinet et de la direction Affaires Financières et de la Gestion du Patrimoine', '', '', NULL),
(102, NULL, NULL, NULL, 73, 'Dérogation de Matricule', ' Actes (-décret - Arrêté - contrat - Décision-…) , Acte formaté pour l’agent recruté par le Budget Général , Photocopie certifiée de la CIN , Fiche rose et verte (signés et datées)', '', NULL),
(103, NULL, NULL, NULL, 73, 'Autorisation de sortie des agents contractuels', 'Attestation ou agrément délivré par le CONABEX\n, Attestation d’obtention de bourse à l’étranger\n, Demande de l’intéressé avec indication du pays de destination et avis du Ministère employeur\n, Décision de congé non pris\n, Attestation de non jouissance de congé s’il y a lieu', '', NULL),
(104, NULL, NULL, NULL, 73, 'CODIS contractuel', 'Demande de traduction devant CODIS signée par le Ministère concerné\n, Dossier des faits reprochés à l’intéressé (demande d’explication, compte-rendu)\n, Dernière situation de l’agent (dernier contrat de travail)\n, Dossier administratif de l’agent traduit\n, Rapport d’instruction sur les faits reprochés', '', NULL),
(105, NULL, NULL, NULL, 73, 'Autorisation de sortie pour convenance personnelle', 'Demande adressée au Ministre en charge de la Fonction Publique  avec avis favorable\ndu supérieur hiérarchique (au mois directeur)\n, Décision de congé\n, Attestation de non jouissance de congé', '', NULL),
(106, NULL, NULL, NULL, 70, 'Nomination des Agents dans le corps des fonctionnaires', ' Demande manuscrite\n, Photocopie certifiée du diplôme\n, Equivalence Administrative de Diplôme\n, Photocopie CIN légalisée\n,Photocopie certifiée de la dernière situation (arrête, contrat,…)\n, Certification administrative\n, Dernier avis de crédit\n, Attestation de non interruption de service\n, Effectif statutaire (statut particulier)\n, Lettre d’authentification du diplôme (école)\n, Photocopie certifiée de la dernière situation\n, Nomination après concours direct :( - Copie d’acte de naissance - Bulletin n°3 - Bulletin 57-58 - Attestation de chômage - Position militaire (masculin) - Certificat de Résidence)\n\n, Nomination sur titre : ( - Lettre d’authentification du diplôme - Photocopie certifiée du dernier contrat )\n,Nomination par suite d’un reclassement : ( - Liste des admis (école) - Relevé de notes (école) - Fiche d’adéquation formation –emploi (organisme employeur) - Lettre d’aménagement de poste budgétaire )\n,Versement dans le corps des fonctionnaires : effectif statutaire du corps (statut particulier)\n, Révision de la situation administrative : Photocopie de tous les arrêtés (nomination -intégration - Titularisation - Avancement…), Relevé de service \n\n', '72 heures', NULL),
(107, NULL, NULL, NULL, 72, 'Traitement des dossiers administratifs et comptables  et Distribution des Bulletins de Consultation (BC)', '', '', NULL),
(108, NULL, NULL, NULL, 72, 'Préparation et suivi du budget , Nomination des acteurs budgétaires centraux et excentriques , Remboursement des frais médicaux', '', '', NULL),
(109, NULL, NULL, NULL, 74, 'Maintenance et l’entretien', '', '', NULL),
(110, NULL, NULL, 29, NULL, 'Gestion des ressources humaines des Agents de l’Etat : parcours professionnel, remisse a la disposition, Redéploiement', '', '', NULL),
(111, NULL, NULL, NULL, 75, 'Enregistrement des courriers , Préparation du Bordereau d’Envoi des dossiers nécessitant le Visa Financier –Contrôle Financer et enregistrement au Secrétaire Général du Gouvernement , Enregistrement des parapheurs pour signature du Ministre en charge de ', '', '', NULL),
(112, NULL, NULL, 40, NULL, 'Coordination de s opération à matière d’étude juridique et d’harmonisation de texte d’ordre législatif et réglementaire relatif au travail, à l’Emploi et à la Fonction Publique', '', '', NULL),
(113, NULL, NULL, NULL, 76, 'Travaux de secrétariat administratif et technique adaptés à la mission spécifique de la Direction des Etudes et des Affaires Juridiques', '', '', NULL),
(114, NULL, NULL, 41, NULL, 'Réception des dossiers CODIS et des Ministères qui se plaignent des employés', 'Demande de traduction du Ministère plaignant signée par le Ministre\n, Lettre expliquant les fautes graves de l’employé', '1 heure', NULL),
(115, NULL, NULL, 41, NULL, 'Gestion comptabilité des matières et Tenue de livres comptables', 'Décision SPECL\n, Demande de chargement\n, PV de réception\n, Facture Proforma\n, Facture définitive\n, Bon de commande', '3 jours', NULL),
(116, NULL, NULL, 41, NULL, 'Coordination des activités liées à l’Evaluation de la Promotion de l’Ethique et de la Déontologie', '', '', NULL),
(117, NULL, NULL, NULL, 77, 'CODIS des fonctionnaires', '', '', NULL),
(118, NULL, NULL, 42, NULL, 'Coordination des activités liées à la Formation et du Perfectionnement des Agents de l’Etat', '', '', NULL),
(119, NULL, NULL, 42, NULL, 'Travaux de secrétariat administratif et technique adaptés à la mission spécifique de la Direction de la Formation et du Perfectionnement des Agents de l’Etat', '', '', NULL),
(120, NULL, NULL, NULL, 78, 'Traitement des équivalences administratives : digitalisation et délivrance', 'Photocopie certifiée du diplôme original\n, Diplôme original\n, Photocopie de la Carte d’Identité Nationale\n, Formulaire de demande à remplir sur place\n', '2 jours ouvrables', NULL),
(121, NULL, 1, NULL, NULL, 'Mise en œuvre de la politique du gouvernement dans le secteur de la fonction publique, en collaboration avec les directions sous son autorité', '', '', NULL),
(122, NULL, 1, NULL, NULL, 'Travaux de secrétariat administratif et technique adaptés à la mission spécifique de la Direction Générale de la Fonction publique', '', '', NULL),
(123, NULL, NULL, NULL, 79, 'Rénovation au niveau du Ministère en charge de la Fonction Publique', '', '', NULL),
(124, NULL, NULL, NULL, 80, 'Etude d’effectifs et de compétences des agents de l’Etat : élaboration de fiche de poste : prévision d’emploi dans l’Administration Publique', '', '', NULL),
(125, NULL, NULL, NULL, 81, 'Recensement physique des agents payés par l’Etat  et  Valorisation et redéploiement des agents publics remis à la disposition du Ministère en charge de la Fonction Publique', '', '', NULL),
(126, NULL, NULL, NULL, 69, 'Nomination des agents du Ministère de l’Education Nationale', 'Demande adressée à Madame le Ministre , Photocopie certifiée du Diplôme , Equivalence administrative , Dernière situation , Attestation de non-interruption de service , Attestation de prise de service , Liste des admis , Authentification du Diplôme , Adéquation ou formation d’emploi , Avis de crédit\n', '2 jours ouvrables', NULL),
(127, NULL, NULL, NULL, 82, 'Centre de documentation', 'Pièce d’identité', '', NULL),
(128, NULL, NULL, NULL, 83, 'Etude et conception des textes pour donner vie à un projet', '', '', NULL),
(129, NULL, NULL, NULL, 84, 'Elaboration de projet, décret et arrêté et  Traitement des affaires litigieuses', '', '', NULL),
(130, NULL, NULL, NULL, 85, 'Rectification des organigrammes du Ministère et  Remise de tous documents relatifs au Ministère en charge de la Fonction Publique', '', '', NULL),
(131, NULL, NULL, NULL, 86, 'Soutien et supervision des Etablissements Privés et Publics', 'Statut de l’établissement', '', NULL),
(132, NULL, NULL, NULL, 87, 'Responsable des concours administratifs et  Certification des équivalences', 'Equivalence de diplôme originale\n,\nPhotocopie des équivalences', 'Dans l’immédiat', NULL),
(133, NULL, NULL, NULL, 88, 'Etude et traitement des demandes de visa de contrat de travail à l’étranger', 'Une demande adressée au Directeur de la Migration Professionnelle du Ministère en charge du\nTravail ;\n, Une photocopie légalisée de la Carte d’Identité Nationale du travailleur\n, Un certificat de résidence du travailleur délivré pas plus de trois (03) mois avant la date de la\ndemande de visa\n, Une photocopie des deux (02) premières pages du passeport du travailleur (présentation de\nl’original) ;\n,Un casier judiciaire (Bulletin n°3) du travailleur ;\n,Un certificat de moralité ;\n, Une lettre de consentement des parents - du conjoint ou à défaut - d’un parent le plus proche du\ntravailleur autorisant son départ\n- Une photocopie des deux (02) premières pages du livret de famille du travailleur marié - Les contrats et une photocopie de la Carte d’Identité Nationale du membre de la famille du\ntravailleur;\n,Quatre exemplaires du contrat de travail visés par le Consulat ou l’Ambassade de Madagascar dans\nle pays de destination en traduction française et/ou malgache dûment signés par l’employeur - le\ntravailleur concerné et -le cas échéant - le premier responsable de l’agence de placement\n, Un diplôme certifié du travailleur ;\n, Attestation de réservation du billet d’avion (aller-simple)\n, Un certificat médical et le résultat d’analyse (tuberculose -VIH SID -, Hépatite et sérologie - entre\nautre - Syphilis) délivré par l’Institut pasteur ou organisme compétent.\n, Une attestatio - par le médecin traitant, inscrit à l’ordre des médecins - qu’il suit les traitements\nadéquats - au cas où le travailleur est atteint d’une ou de plusieurs de ces maladies.\n', '15 jours ouvrables au maximum', NULL),
(137, NULL, 4, NULL, NULL, 'Promotion d’un emploi décent et durable', '', '', NULL),
(138, NULL, 4, NULL, NULL, 'Travaux de secrétariat administratif et technique adaptés à la mission spécifique de la Direction de la Promotion d’ l’Emploi', '', '', NULL),
(139, NULL, NULL, NULL, 436, 'Préparation, vérification de toutes les opérations comptables liées à l’exécution du budget  et  Tenue des livres comptables', ' Facture ,\n bon de livraison,\n ordre de route\n', '', NULL),
(148, NULL, NULL, NULL, NULL, 'okkk', '', '', 1);

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
(45, 'Service', 'first', 'Service', '$2b$10$yIyuE4KrrH1jB5.ex81y6eh7h/vTa2d1OMMNT/b9Z.nPucx99MWrC', 'Stan', '1722937694393.jpg', 1, '2024-12-20 15:58:10');

-- --------------------------------------------------------

--
-- Structure de la table `visitor`
--

CREATE TABLE `visitor` (
  `id` int(11) NOT NULL,
  `ip_address` varchar(45) NOT NULL,
  `visit_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `visitor`
--

INSERT INTO `visitor` (`id`, `ip_address`, `visit_date`) VALUES
(30, '127.0.0.1', '2025-01-31 07:25:36'),
(31, '127.0.0.1', '2025-01-31 07:31:07'),
(32, '127.0.0.1', '2025-01-31 07:34:16'),
(33, '127.0.0.1', '2025-01-31 07:40:38'),
(34, '127.0.0.1', '2025-01-31 07:40:38'),
(35, '127.0.0.1', '2025-01-23 07:41:12'),
(36, '127.0.0.1', '2025-01-14 07:41:12'),
(37, '127.0.0.1', '2025-01-31 07:41:57'),
(38, '127.0.0.1', '2025-01-31 07:58:18'),
(39, '127.0.0.1', '2025-01-31 08:12:06'),
(40, '127.0.0.1', '2025-01-31 08:15:16'),
(41, '127.0.0.1', '2025-01-31 08:28:21'),
(42, '127.0.0.1', '2025-01-31 08:41:06'),
(43, '127.0.0.1', '2025-01-31 08:42:17'),
(44, '127.0.0.1', '2025-01-31 08:43:31'),
(45, '127.0.0.1', '2025-01-31 08:44:41'),
(46, '127.0.0.1', '2025-01-31 08:47:46'),
(47, '127.0.0.1', '2025-01-31 08:49:42'),
(48, '127.0.0.1', '2025-01-31 08:52:36'),
(49, '127.0.0.1', '2025-01-31 08:54:35'),
(50, '127.0.0.1', '2025-01-31 08:55:37'),
(51, '127.0.0.1', '2025-01-31 09:11:07'),
(52, '127.0.0.1', '2025-01-31 09:18:22'),
(53, '127.0.0.1', '2025-01-31 09:39:05'),
(54, '127.0.0.1', '2025-01-31 11:12:45'),
(55, '127.0.0.1', '2025-02-01 15:23:48'),
(56, '127.0.0.1', '2025-02-02 07:43:11'),
(57, '127.0.0.1', '2025-02-02 07:43:11'),
(58, '127.0.0.1', '2025-02-02 07:55:25'),
(59, '127.0.0.1', '2025-02-03 06:55:51'),
(60, '127.0.0.1', '2025-02-03 07:08:20'),
(61, '127.0.0.1', '2025-02-03 07:24:00'),
(62, '127.0.0.1', '2025-02-03 09:42:22'),
(63, '127.0.0.1', '2025-02-03 14:59:49'),
(64, '127.0.0.1', '2025-02-03 14:59:49'),
(65, '127.0.0.1', '2025-02-04 06:28:27'),
(66, '127.0.0.1', '2025-02-04 11:18:50');

-- --------------------------------------------------------

--
-- Structure de la table `visitors`
--

CREATE TABLE `visitors` (
  `id` int(11) NOT NULL,
  `ip_address` varchar(45) NOT NULL,
  `visit_date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `visitors`
--

INSERT INTO `visitors` (`id`, `ip_address`, `visit_date`) VALUES
(68, '::ffff:127.0.0.1', '2025-01-22 04:18:53'),
(69, '::1', '2025-01-22 04:19:02'),
(74, '::ffff:127.0.0.1 	', '2025-01-20 12:28:42'),
(75, '::1', '2025-01-20 12:28:42'),
(76, '::ffff:127.0.0.1 	', '2025-01-16 12:29:59'),
(77, '::1', '2025-01-14 12:29:59'),
(78, '::ffff:127.0.0.1', '2024-01-31 12:46:55'),
(79, '::ffff:127.0.0.1', '2025-01-23 07:25:02'),
(80, '::1', '2025-01-23 08:22:54'),
(81, '::ffff:127.0.0.1', '2025-01-24 07:37:29'),
(82, '::ffff:127.0.0.1', '2025-01-24 07:37:29'),
(83, '::1', '2025-01-24 14:48:50'),
(84, '::1', '2025-01-24 14:48:50'),
(85, '::ffff:127.0.0.1', '2025-01-25 08:26:26'),
(86, '::ffff:127.0.0.1', '2025-01-25 08:26:26'),
(87, '::ffff:127.0.0.1', '2025-01-26 16:17:58'),
(88, '::ffff:127.0.0.1', '2025-01-26 16:17:58'),
(89, '::1', '2025-01-27 09:21:59'),
(90, '::ffff:127.0.0.1', '2025-01-28 11:44:34'),
(91, '::ffff:127.0.0.1', '2025-01-28 11:44:34'),
(92, '::ffff:127.0.0.1', '2025-01-30 08:07:14'),
(93, '::ffff:127.0.0.1', '2025-01-30 14:36:32'),
(94, '::ffff:127.0.0.1', '2025-01-30 14:36:32'),
(95, '::ffff:127.0.0.1', '2025-01-30 14:38:10'),
(96, '::ffff:127.0.0.1', '2025-01-30 14:38:10'),
(97, '::ffff:127.0.0.1', '2025-01-30 14:38:19'),
(98, '::ffff:127.0.0.1', '2025-01-30 14:38:19'),
(99, '::1', '2025-01-30 14:38:50'),
(100, '::1', '2025-01-30 14:38:50'),
(101, '::1', '2025-01-30 14:39:11'),
(102, '::1', '2025-01-30 14:39:11'),
(103, '::ffff:127.0.0.1', '2025-01-30 14:39:30'),
(104, '::ffff:127.0.0.1', '2025-01-30 14:39:30'),
(105, '::ffff:127.0.0.1', '2025-01-30 14:39:59'),
(106, '::ffff:127.0.0.1', '2025-01-30 14:39:59');

-- --------------------------------------------------------

--
-- Structure de la table `visit_count`
--

CREATE TABLE `visit_count` (
  `id` int(11) NOT NULL,
  `total_visitors` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
-- Index pour la table `dg_info`
--
ALTER TABLE `dg_info`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `direction`
--
ALTER TABLE `direction`
  ADD PRIMARY KEY (`id_d`),
  ADD KEY `id_sg` (`id_sg`),
  ADD KEY `id_dg` (`id_dg`),
  ADD KEY `fk_direction_ministre` (`id_ms`);

--
-- Index pour la table `directiongenerale`
--
ALTER TABLE `directiongenerale`
  ADD PRIMARY KEY (`id_dg`),
  ADD KEY `id_sg` (`id_sg`);

--
-- Index pour la table `d_info`
--
ALTER TABLE `d_info`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `d_name` (`d_name`);

--
-- Index pour la table `ministre`
--
ALTER TABLE `ministre`
  ADD PRIMARY KEY (`id_ms`);

--
-- Index pour la table `secretairegeneral`
--
ALTER TABLE `secretairegeneral`
  ADD PRIMARY KEY (`id_sg`),
  ADD KEY `fk_ministre` (`id_ms`);

--
-- Index pour la table `service`
--
ALTER TABLE `service`
  ADD PRIMARY KEY (`id_s`),
  ADD KEY `id_d` (`id_d`),
  ADD KEY `fk_service_direction_generale` (`id_dg`),
  ADD KEY `fk_service_secretaire_general` (`id_sg`),
  ADD KEY `fk_service_ministre` (`id_ms`);

--
-- Index pour la table `serviceoffert`
--
ALTER TABLE `serviceoffert`
  ADD PRIMARY KEY (`id_service`),
  ADD KEY `id_sg` (`id_sg`),
  ADD KEY `id_dg` (`id_dg`),
  ADD KEY `id_d` (`id_d`),
  ADD KEY `id_s` (`id_s`),
  ADD KEY `fk_serviceoffert_ministre` (`id_ms`);

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
-- Index pour la table `visitor`
--
ALTER TABLE `visitor`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `visitors`
--
ALTER TABLE `visitors`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `visit_count`
--
ALTER TABLE `visit_count`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `actu`
--
ALTER TABLE `actu`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT pour la table `contacts`
--
ALTER TABLE `contacts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT pour la table `dg_info`
--
ALTER TABLE `dg_info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `direction`
--
ALTER TABLE `direction`
  MODIFY `id_d` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT pour la table `directiongenerale`
--
ALTER TABLE `directiongenerale`
  MODIFY `id_dg` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT pour la table `d_info`
--
ALTER TABLE `d_info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `ministre`
--
ALTER TABLE `ministre`
  MODIFY `id_ms` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `secretairegeneral`
--
ALTER TABLE `secretairegeneral`
  MODIFY `id_sg` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT pour la table `service`
--
ALTER TABLE `service`
  MODIFY `id_s` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=454;

--
-- AUTO_INCREMENT pour la table `serviceoffert`
--
ALTER TABLE `serviceoffert`
  MODIFY `id_service` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=149;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `users1`
--
ALTER TABLE `users1`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT pour la table `visitor`
--
ALTER TABLE `visitor`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;

--
-- AUTO_INCREMENT pour la table `visitors`
--
ALTER TABLE `visitors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=107;

--
-- AUTO_INCREMENT pour la table `visit_count`
--
ALTER TABLE `visit_count`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `direction`
--
ALTER TABLE `direction`
  ADD CONSTRAINT `direction_ibfk_1` FOREIGN KEY (`id_sg`) REFERENCES `secretairegeneral` (`id_sg`),
  ADD CONSTRAINT `direction_ibfk_2` FOREIGN KEY (`id_dg`) REFERENCES `directiongenerale` (`id_dg`),
  ADD CONSTRAINT `fk_direction_ministre` FOREIGN KEY (`id_ms`) REFERENCES `ministre` (`id_ms`);

--
-- Contraintes pour la table `directiongenerale`
--
ALTER TABLE `directiongenerale`
  ADD CONSTRAINT `directiongenerale_ibfk_1` FOREIGN KEY (`id_sg`) REFERENCES `secretairegeneral` (`id_sg`);

--
-- Contraintes pour la table `secretairegeneral`
--
ALTER TABLE `secretairegeneral`
  ADD CONSTRAINT `fk_ministre` FOREIGN KEY (`id_ms`) REFERENCES `ministre` (`id_ms`);

--
-- Contraintes pour la table `service`
--
ALTER TABLE `service`
  ADD CONSTRAINT `fk_service_direction_generale` FOREIGN KEY (`id_dg`) REFERENCES `directiongenerale` (`id_dg`),
  ADD CONSTRAINT `fk_service_ministre` FOREIGN KEY (`id_ms`) REFERENCES `ministre` (`id_ms`),
  ADD CONSTRAINT `fk_service_secretaire_general` FOREIGN KEY (`id_sg`) REFERENCES `secretairegeneral` (`id_sg`),
  ADD CONSTRAINT `service_ibfk_1` FOREIGN KEY (`id_d`) REFERENCES `direction` (`id_d`);

--
-- Contraintes pour la table `serviceoffert`
--
ALTER TABLE `serviceoffert`
  ADD CONSTRAINT `fk_serviceoffert_ministre` FOREIGN KEY (`id_ms`) REFERENCES `ministre` (`id_ms`),
  ADD CONSTRAINT `serviceoffert_ibfk_1` FOREIGN KEY (`id_sg`) REFERENCES `secretairegeneral` (`id_sg`),
  ADD CONSTRAINT `serviceoffert_ibfk_2` FOREIGN KEY (`id_dg`) REFERENCES `directiongenerale` (`id_dg`),
  ADD CONSTRAINT `serviceoffert_ibfk_3` FOREIGN KEY (`id_d`) REFERENCES `direction` (`id_d`),
  ADD CONSTRAINT `serviceoffert_ibfk_4` FOREIGN KEY (`id_s`) REFERENCES `service` (`id_s`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
