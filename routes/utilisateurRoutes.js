// Auteure = Bellandrade Désiré
const express = require("express");
const router = express.Router();

// Auteure = Bellandrade Désiré
const utilisateurController = 
require("../controllers/utilisateurController");


// route GET
// Auteure = Bellandrade Désiré
router.get("/utilisateur", utilisateurController.getUtilisateur);

// route GET ID
// Auteure = Bellandrade Désiré
router.get("/utilisateur/:id", utilisateurController.getUtilisateurID);

// route POST
// Auteure = Bellandrade Désiré
router.post("/utilisateur", utilisateurController.addUtilisateur);

// route UPDATE
//Auteure = Bellandrade Désiré
router.put("/utilisateur/:id", utilisateurController.updateUtilisateur);

// route DELETE
// Auteure = Bellandrade Désiré
router.delete("/utilisateur/:id", utilisateurController.deleteUtilisateur);

// VAR : Auteure = Bellandrade Désiré
module.exports = router;