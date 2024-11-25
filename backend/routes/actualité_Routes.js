const express = require('express');
const actualité_Controller = require('../controllers/actualité_Controller');
const router = express.Router();

router.post('/insertion', actualité_Controller.register);
router.get('/all', actualité_Controller.getAll);

module.exports = router;
