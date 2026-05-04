// Auteure = Bellandrade Désiré
const express = require("express");
const router = express.Router();
const utilisateurController = 
require("../controllers/utilisateurController");
const authMiddleware = require('../middleware/authMiddleware');

// route GET

router.get('/', authMiddleware, utilisateurController.getUtilisateur);

// route GET ID

router.get('/:id', authMiddleware, utilisateurController.getUtilisateurID);

// route POST

router.post('/', authMiddleware, utilisateurController.addUtilisateur);

// route UPDATE

router.put('/:id', authMiddleware, utilisateurController.updateUtilisateur);

// route DELETE

router.delete('/:id', authMiddleware, utilisateurController.deleteUtilisateur);

// VAR 
module.exports = router;






