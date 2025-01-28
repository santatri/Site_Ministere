const db = require("../db");
const path = require("path");
const multer = require("multer");

// Configuration de multer pour le téléchargement des images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

// Insérer ou mettre à jour un DG
exports.insertOrUpdateD = [
  upload.fields([
    { name: "image", maxCount: 1 }, // Champ pour l'image principale
    { name: "logo", maxCount: 1 }, // Champ pour le logo
  ]),
  (req, res) => {
    const {
      firstName,
      lastName,
      dName,
      post,
      description_1,
      list_1,
      description_2 = null,
      list_2 = null,
      description_3 = null,
      list_3 = null,
    } = req.body;

    // Récupérer les URLs des fichiers téléchargés
    const imageUrl = req.files["image"] ? `/uploads/${req.files["image"][0].filename}` : null;
    const logoUrl = req.files["logo"] ? `/uploads/${req.files["logo"][0].filename}` : null;

    const query = `
      INSERT INTO d_info (
        first_name, last_name, d_name, post, image_url, logo_url, 
        description_1, list_1, 
        description_2, list_2, 
        description_3, list_3
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        first_name = VALUES(first_name),
        last_name = VALUES(last_name),
        d_name = VALUES(d_name),
        post = VALUES(post),
        image_url = VALUES(image_url),
        logo_url = VALUES(logo_url),
        description_1 = VALUES(description_1),
        list_1 = VALUES(list_1),
        description_2 = VALUES(description_2),
        list_2 = VALUES(list_2),
        description_3 = VALUES(description_3),
        list_3 = VALUES(list_3)
    `;

    const values = [
      firstName,
      lastName,
      dName,
      post,
      imageUrl,
      logoUrl,
      description_1,
      list_1,
      description_2,
      list_2,
      description_3,
      list_3,
    ];

    db.query(query, values, (err) => {
      if (err) {
        console.error("Erreur lors de l'insertion ou de la mise à jour du DG:", err);
        return res.status(500).send("Erreur interne du serveur");
      }
      res.status(200).send({ message: "Informations du DG mises à jour avec succès" });
    });
  },
];

// Lire les informations du DG
exports.getDInfo = (req, res) => {
  const query = "SELECT * FROM d_info";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Erreur lors de la récupération des informations du DG:", err);
      return res.status(500).send("Erreur interne du serveur");
    }

    // Transformer les listes en tableaux
    const formattedResults = results.map((d) => {
      return {
        ...d,
        list_1: d.list_1 ? d.list_1.split(",") : [],
        list_2: d.list_2 ? d.list_2.split(",") : [],
        list_3: d.list_3 ? d.list_3.split(",") : [],
      };
    });

    res.status(200).json(formattedResults);
  });
};

// Supprimer un DG
exports.deleteD = (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM d_info WHERE id = ?";
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error("Erreur lors de la suppression du DG:", err);
      return res.status(500).send("Erreur interne du serveur");
    }
    if (results.affectedRows === 0) {
      return res.status(404).send("DG non trouvé");
    }
    res.status(200).send({ message: "DG supprimé avec succès" });
  });
};

// Mettre à jour un DG
exports.updateD = [
  upload.fields([
    { name: "image", maxCount: 1 }, // Champ pour l'image principale
    { name: "logo", maxCount: 1 }, // Champ pour le logo
  ]),
  (req, res) => {
    const { id } = req.params;
    const {
      firstName,
      lastName,
      dName,
      post,
      description_1,
      list_1,
      description_2,
      list_2,
      description_3,
      list_3,
    } = req.body;

    // Récupérer les URLs des fichiers téléchargés
    const imageUrl = req.files["image"] ? `/uploads/${req.files["image"][0].filename}` : null;
    const logoUrl = req.files["logo"] ? `/uploads/${req.files["logo"][0].filename}` : null;

    const query = `
      UPDATE d_info
      SET
        first_name = ?,
        last_name = ?,
        d_name = ?,
        post = ?,
        image_url = COALESCE(?, image_url),
        logo_url = COALESCE(?, logo_url),
        description_1 = ?,
        list_1 = ?,
        description_2 = ?,
        list_2 = ?,
        description_3 = ?,
        list_3 = ?
      WHERE id = ?
    `;

    const values = [
      firstName,
      lastName,
      dName,
      post,
      imageUrl,
      logoUrl,
      description_1,
      list_1,
      description_2,
      list_2,
      description_3,
      list_3,
      id,
    ];

    db.query(query, values, (err) => {
      if (err) {
        console.error("Erreur lors de la mise à jour :", err);
        return res.status(500).send("Erreur interne du serveur");
      }
      res.status(200).send({ message: "DG mis à jour avec succès" });
    });
  },
];

// Fonctions pour récupérer les informations spécifiques (DEPED, DRHE, DFPAE, DRFP)
exports.getDEPED = (req, res) => {
  const searchTerm = "DEPED";
  const query = `SELECT * FROM d_info WHERE d_name LIKE ?`;
  db.query(query, [`%${searchTerm}%`], (err, results) => {
    if (err) {
      console.error("Erreur lors de la récupération des informations du DG:", err);
      return res.status(500).send("Erreur interne du serveur");
    }

    const formattedResults = results.map((d) => ({
      ...d,
      list_1: d.list_1 ? d.list_1.split(",") : [],
      list_2: d.list_2 ? d.list_2.split(",") : [],
      list_3: d.list_3 ? d.list_3.split(",") : [],
    }));

    res.status(200).json(formattedResults);
  });
};

exports.getDRHE = (req, res) => {
  const searchTerm = "DRHE";
  const query = `SELECT * FROM d_info WHERE d_name LIKE ?`;
  db.query(query, [`%${searchTerm}%`], (err, results) => {
    if (err) {
      console.error("Erreur lors de la récupération des informations du DG:", err);
      return res.status(500).send("Erreur interne du serveur");
    }

    const formattedResults = results.map((d) => ({
      ...d,
      list_1: d.list_1 ? d.list_1.split(",") : [],
      list_2: d.list_2 ? d.list_2.split(",") : [],
      list_3: d.list_3 ? d.list_3.split(",") : [],
    }));

    res.status(200).json(formattedResults);
  });
};

exports.getDFPAE = (req, res) => {
  const searchTerm = "DFPAE";
  const query = `SELECT * FROM d_info WHERE d_name LIKE ?`;
  db.query(query, [`%${searchTerm}%`], (err, results) => {
    if (err) {
      console.error("Erreur lors de la récupération des informations du DG:", err);
      return res.status(500).send("Erreur interne du serveur");
    }

    const formattedResults = results.map((d) => ({
      ...d,
      list_1: d.list_1 ? d.list_1.split(",") : [],
      list_2: d.list_2 ? d.list_2.split(",") : [],
      list_3: d.list_3 ? d.list_3.split(",") : [],
    }));

    res.status(200).json(formattedResults);
  });
};

exports.getDRFP = (req, res) => {
  const searchTerm = "DRFP";
  const query = `SELECT * FROM d_info WHERE d_name LIKE ?`;
  db.query(query, [`%${searchTerm}%`], (err, results) => {
    if (err) {
      console.error("Erreur lors de la récupération des informations du DG:", err);
      return res.status(500).send("Erreur interne du serveur");
    }

    const formattedResults = results.map((d) => ({
      ...d,
      list_1: d.list_1 ? d.list_1.split(",") : [],
      list_2: d.list_2 ? d.list_2.split(",") : [],
      list_3: d.list_3 ? d.list_3.split(",") : [],
    }));

    res.status(200).json(formattedResults);
  });
};