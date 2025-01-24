const express = require("express");
const dController = require("../controllers/dController");

const router = express.Router();



// Routes
router.post("/d", dController.insertOrUpdateD);
router.get("/d", dController.getDInfo);
router.get("/d/DEPED", dController.getDEPED);
router.get("/d/DRHE", dController.getDRHE);
router.get("/d/DFPAE", dController.getDFPAE);
router.get("/d/DRFP", dController.getDRFP);

router.delete("/d/:id", dController.deleteD);
// Définir les routes
router.put("/d/:id", dController.updateD);



module.exports = router;
