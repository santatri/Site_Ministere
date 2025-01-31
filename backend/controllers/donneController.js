const db = require('../db');

// Récupérer tous les services offerts
exports.getAllServices = (req, res) => {
  const query = 'SELECT id_service, nom_service FROM serviceOffert';
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send({ message: 'Erreur lors de la récupération des services', error: err });
      return;
    }
    res.status(200).json(results);
  });
};

// servive pour direction
// Récupérer les services offerts par les directions
// Récupérer les services offerts uniquement par une Direction
// Récupérer les services offerts par une Direction
exports.getServicesByDirection = (req, res) => {
  const query = `
    SELECT 
      so.id_service, 
      so.nom_service, 
      d.nom_d AS nom_direction, 
      d.porte_d AS porte_direction
    FROM 
      ServiceOffert so
    LEFT JOIN Direction d ON so.id_d = d.id_d
    WHERE 
      so.id_d IS NOT NULL; -- Filtre pour les services liés à une Direction uniquement
  `;

  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).send({ 
        message: 'Erreur lors de la récupération des services par Direction.', 
        error: err 
      });
    }

    res.status(200).json(results);
  });
};



// Récupérer les détails d'un service spécifique
// exports.getServiceDetails = (req, res) => {
//   const serviceId = req.params.id;
//   const query = 'SELECT * FROM serviceOffert WHERE id_service = ?';
//   db.query(query, [serviceId], (err, results) => {
//     if (err) {
//       res.status(500).send({ message: 'Erreur lors de la récupération des détails', error: err });
//       return;
//     }
//     if (results.length === 0) {
//       res.status(404).send({ message: 'Service non trouvé' });
//       return;
//     }
//     res.status(200).json(results[0]);
//   });
// };


// Récupérer les détails d'un service spécifique avec la hiérarchie
// exports.getServiceDetails = (req, res) => {
//   const serviceId = req.params.id;

//   const query = `
//       SELECT 
//           so.id_service, 
//           so.nom_service, 
//           so.dossier_prepare, 
//           so.delai,

//           -- Champs pour Service
//           s.nom_s AS nom_service_lie, 

//           -- Champs pour Direction
//           d.nom_d AS nom_direction_lie,

//           -- Champs pour DirectionGenerale
//           dg.nom_dg AS nom_direction_generale, 

//           -- Champs pour SecretaireGeneral
//           sg.nom_sg AS nom_secretaire_general

//       FROM 
//           ServiceOffert so

//       -- Joindre Service indépendamment
//       LEFT JOIN Service s ON so.id_s = s.id_s

//       -- Joindre Direction indépendamment
//       LEFT JOIN Direction d ON so.id_d = d.id_d OR s.id_d = d.id_d

//       -- Joindre DirectionGenerale indépendamment
//       LEFT JOIN DirectionGenerale dg 
//           ON so.id_dg = dg.id_dg OR d.id_dg = dg.id_dg

//       -- Joindre SecretaireGeneral indépendamment
//       LEFT JOIN SecretaireGeneral sg 
//           ON so.id_sg = sg.id_sg 
//           OR d.id_sg = sg.id_sg 
//           OR dg.id_sg = sg.id_sg

//       WHERE so.id_service = ?;
//   `;

//   db.query(query, [serviceId], (err, results) => {
//       if (err) {
//           return res.status(500).json({ 
//               message: 'Erreur lors de la récupération des détails du service.', 
//               error: err 
//           });
//       }

//       if (results.length === 0) {
//           return res.status(404).json({ message: 'Service non trouvé' });
//       }

//       // Formatage hiérarchique dynamique
//       const service = results[0];
//       const hierarchyParts = [];

//       if (service.nom_service_lie) hierarchyParts.push(service.nom_service_lie);
//       if (service.nom_direction_lie) hierarchyParts.push(service.nom_direction_lie);
//       if (service.nom_direction_generale) hierarchyParts.push(service.nom_direction_generale);
//       if (service.nom_secretaire_general) hierarchyParts.push(service.nom_secretaire_general);

//       const hierarchy = "/ " + hierarchyParts.join(" / ");

//       // Ajouter la hiérarchie aux résultats
//       const formattedService = { ...service, hierarchy };

//       res.status(200).json(formattedService);
//   });
// };

// Récupérer les détails d'un service spécifique avec la hiérarchie et la porte
exports.getServiceDetails = (req, res) => {
  const serviceId = req.params.id;

  const query = `
      SELECT 
          so.id_service, 
          so.nom_service, 
          so.dossier_prepare, 
          so.delai,

          -- Champs pour Service
          s.nom_s AS nom_service_lie, 
          s.porte_s AS porte_service, 

          -- Champs pour Direction
          d.nom_d AS nom_direction_lie,
          d.porte_d AS porte_direction, 

          -- Champs pour DirectionGenerale
          dg.nom_dg AS nom_direction_generale, 
          dg.porte_dg AS porte_direction_generale, 

          -- Champs pour SecretaireGeneral
          sg.nom_sg AS nom_secretaire_general,
          sg.porte_sg AS porte_secretaire_general

      FROM 
          ServiceOffert so

      -- Joindre Service indépendamment
      LEFT JOIN Service s ON so.id_s = s.id_s

      -- Joindre Direction indépendamment
      LEFT JOIN Direction d ON so.id_d = d.id_d OR s.id_d = d.id_d

      -- Joindre DirectionGenerale indépendamment
      LEFT JOIN DirectionGenerale dg 
          ON so.id_dg = dg.id_dg OR d.id_dg = dg.id_dg OR s.id_dg = dg.id_dg

      -- Joindre SecretaireGeneral indépendamment
      LEFT JOIN SecretaireGeneral sg 
          ON so.id_sg = sg.id_sg 
          OR d.id_sg = sg.id_sg 
          OR dg.id_sg = sg.id_sg
          OR s.id_sg = sg.id_sg

      WHERE so.id_service = ?;
  `;

  db.query(query, [serviceId], (err, results) => {
      if (err) {
          return res.status(500).json({ 
              message: 'Erreur lors de la récupération des détails du service.', 
              error: err 
          });
      }

      if (results.length === 0) {
          return res.status(404).json({ message: 'Service non trouvé' });
      }

      // Formatage hiérarchique dynamique
      const service = results[0];
      const hierarchyParts = [];

      // Construire la hiérarchie et récupérer la porte du premier niveau
      let porte = null;

      if (service.nom_service_lie) {
        hierarchyParts.push(service.nom_service_lie);
        porte = service.porte_service; // Porte du service
      }
      if (service.nom_direction_lie) {
        hierarchyParts.push(service.nom_direction_lie);
        porte = porte || service.porte_direction; // Porte de la direction (si non déjà définie)
      }
      if (service.nom_direction_generale) {
        hierarchyParts.push(service.nom_direction_generale);
        porte = porte || service.porte_direction_generale; // Porte de la direction générale (si non déjà définie)
      }
      if (service.nom_secretaire_general) {
        hierarchyParts.push(service.nom_secretaire_general);
        porte = porte || service.porte_secretaire_general; // Porte du secrétaire général (si non déjà définie)
      }

      const hierarchy = "/ " + hierarchyParts.join(" / ");

      // Ajouter la hiérarchie et la porte aux résultats
      const formattedService = { 
        ...service, 
        hierarchy,
        porte_hierarchique: porte || 'Porte non définie'
      };

      res.status(200).json(formattedService);
  });
};


