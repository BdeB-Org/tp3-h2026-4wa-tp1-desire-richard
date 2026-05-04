// Auteure Charlotte Richard
const express = require("express");
const router = express.Router();
const travailController = require("../controllers/travailController");
const authMiddleware = require("../middleware/authMiddleware");

// route GET
router.get("/", authMiddleware, travailController.getTravail);

// route GET ID
router.get("/:id", authMiddleware, travailController.getTravailByID);

// route POST
router.post("/", authMiddleware, travailController.addTravail);

// route UPDATE
router.put("/:id", authMiddleware, travailController.updateTravail);

// route DELETE
router.delete("/:id", authMiddleware, travailController.deleteTravail);

// VAR : Auteure = Charlotte Richard
module.exports = router;