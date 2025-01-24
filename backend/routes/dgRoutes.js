const express = require("express");
const dgController = require("../controllers/dgController");

const router = express.Router();



// Routes
router.post("/dg", dgController.insertOrUpdateDG);
router.get("/dg", dgController.getDGInfo);
router.delete("/dg/:id", dgController.deleteDG);
// Définir les routes
router.put("/dg/:id", dgController.updateDG);



module.exports = router;
