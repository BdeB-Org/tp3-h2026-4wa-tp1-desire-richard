// Auteure = Bellandrade Désiré
const express = require("express");
const router = express.Router();

// Auteure = Bellandrade Désiré
const utilisateurController = 
require("../controllers/utilisateurController");

const authMiddleware = require('../middleware/authMiddleware');

// route GET
// Auteure = Bellandrade Désiré
//router.get("/utilisateur", utilisateurController.getUtilisateur);

router.get('/utilisateur/', authMiddleware, utilisateurController.getUtilisateur);

// route GET ID
// Auteure = Bellandrade Désiré
//router.get("/utilisateur/:id", utilisateurController.getUtilisateurID);

router.get('/utilisateur/:id', authMiddleware, utilisateurController.getUtilisateurID);

// route POST
// Auteure = Bellandrade Désiré
//router.post("/utilisateur", utilisateurController.addUtilisateur);

router.post('/utilisateur/', authMiddleware, utilisateurController.addUtilisateur);

// route UPDATE
//Auteure = Bellandrade Désiré
//router.put("/utilisateur/:id", utilisateurController.updateUtilisateur);

router.put('/utilisateur/:id', authMiddleware, utilisateurController.updateUtilisateur);

// route DELETE
// Auteure = Bellandrade Désiré
//router.delete("/utilisateur/:id", utilisateurController.deleteUtilisateur);

router.delete('/utilisateur/:id', authMiddleware, utilisateurController.deleteUtilisateur);

// VAR : Auteure = Bellandrade Désiré
module.exports = router;






