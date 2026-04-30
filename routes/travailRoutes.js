// Auteure Charlotte Richard
const express = require("express");
const router = express.Router();
const travailController = require("../controllers/travailController");

// route GET
router.get("/travail", travailController.getTravail);

// route GET ID
router.get("/travail/:id", travailController.getTravailByID);

// route POST
router.post("/travail", travailController.addTravail);

// route UPDATE
router.put("/travail/:id", travailController.updateTravail);

// route DELETE
router.delete("/travail/:id", travailController.deleteTravail);

// VAR : Auteure = Charlotte Richard
module.exports = router;