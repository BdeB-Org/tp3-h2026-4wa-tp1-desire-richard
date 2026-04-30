const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/page_connexion', authController.login);

module.exports = router;