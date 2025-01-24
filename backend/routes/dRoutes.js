const express = require("express");
const dController = require("../controllers/dController");

const router = express.Router();



// Routes
router.post("/d", dController.insertOrUpdateD);
router.get("/d", dController.getDInfo);
router.delete("/d/:id", dController.deleteD);
// Définir les routes
router.put("/d/:id", dController.updateD);



module.exports = router;
