const express = require("express");
const { createPays, getAllPays, modifierPays } = require("../controllers/pays.controller");
const router = express.Router()

//créer un pays
router.post("/", createPays)

////Selectionner tous les pays 
router.get("/", getAllPays)

//Modifier un pays
router.put("/:id", modifierPays)
module.exports = router;