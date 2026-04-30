// Auteure Charlotte Richard
const express = require("express");
const router = express.Router();
const travailController = require("../controllers/travailController");
const authMiddleware = require("../middleware/authMiddleware");

// route GET
router.get("/travail/", authMiddleware, travailController.getTravail);

// route GET ID
router.get("/travail/:id", authMiddleware, travailController.getTravailByID);

// route POST
router.post("/travail/", authMiddleware, travailController.addTravail);

// route UPDATE
router.put("/travail/:id", authMiddleware, travailController.updateTravail);

// route DELETE
router.delete("/travail/:id", authMiddleware, travailController.deleteTravail);

// VAR : Auteure = Charlotte Richard
module.exports = router;