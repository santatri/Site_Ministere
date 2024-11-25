const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.post('/register', userController.registerUser);
// Route pour se connecter
router.post('/login', userController.loginUser);

router.put('/validate/:id', userController.validateUser);

router.get('/unvalidated', userController.getUnvalidatedUsers);

router.get('/list', userController.getUsers);
// router.get('/list', userController.getUsers);

router.delete('/:id', userController.deleteUser);

router.put('/update/:id', userController.updateUser);



module.exports = router;
