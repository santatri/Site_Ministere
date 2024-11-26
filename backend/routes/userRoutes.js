const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.post('/register', userController.registerUser);

router.put('/validate/:id', userController.validateUser);

router.get('/unvalidated', userController.getUnvalidatedUsers);

module.exports = router;
