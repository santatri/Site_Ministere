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
  }
});

const upload = multer({ storage });
// Insérer ou mettre à jour un DG
exports.insertOrUpdateDG =  [ upload.single('image'),(req, res) => {
  const { 
    firstName, 
    lastName, 
    dgName, 
    post, 
    description_1, 
    list_1, 
    description_2 = null, 
    list_2 = null, 
    description_3 = null, 
    list_3 = null 
  } = req.body;

  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

  const query = `
    INSERT INTO dg_info (
      first_name, last_name, dg_name, post, image_url, 
      description_1, list_1, 
      description_2, list_2, 
      description_3, list_3
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
      first_name = VALUES(first_name),
      last_name = VALUES(last_name),
      dg_name = VALUES(dg_name),
      post = VALUES(post),
      image_url = VALUES(image_url),
      description_1 = VALUES(description_1),
      list_1 = VALUES(list_1),
      description_2 = VALUES(description_2),
      list_2 = VALUES(list_2),
      description_3 = VALUES(description_3),
      list_3 = VALUES(list_3)
  `;

  const values = [
    firstName, lastName, dgName, post, imageUrl, 
    description_1, list_1, 
    description_2, list_2, 
    description_3, list_3
  ];

  db.query(query, values, (err) => {
    if (err) {
      console.error("Erreur lors de l'insertion ou de la mise à jour du DG:", err);
      return res.status(500).send("Erreur interne du serveur");
    }
    res.status(200).send({ message: "Informations du DG mises à jour avec succès" });
  });
},] ;

// Lire les informations du DG
exports.getDGInfo = (req, res) => {
    const query = "SELECT * FROM dg_info";
    db.query(query, (err, results) => {
      if (err) {
        console.error("Erreur lors de la récupération des informations du DG:", err);
        return res.status(500).send("Erreur interne du serveur");
      }
  
      // Transformer les listes en tableaux
      const formattedResults = results.map(dg => {
        return {
          ...dg,
          list_1: dg.list_1 ? dg.list_1.split(",") : [], 
          list_2: dg.list_2 ? dg.list_2.split(",") : [], 
          list_3: dg.list_3 ? dg.list_3.split(",") : [], 
        };
      });
  
      res.status(200).json(formattedResults);
    });
};

// Supprimer un DG
exports.deleteDG = (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM dg_info WHERE id = ?";
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
exports.updateDG = [upload.single("image"), (req, res) => {
  const { id } = req.params;
  const {
    firstName,
    lastName,
    dgName,
    post,
    description_1,
    list_1,
    description_2,
    list_2,
    description_3,
    list_3,
  } = req.body;

  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

  const query = `
    UPDATE dg_info
    SET
      first_name = ?,
      last_name = ?,
      dg_name = ?,
      post = ?,
      image_url = COALESCE(?, image_url),
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
    dgName,
    post,
    imageUrl,
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
}];
