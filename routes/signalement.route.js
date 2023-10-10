const express = require("express");
const { createSignalement, getSignalementByUser, supprimerSignalement } = require("../controllers/signalement.controller");


const router = express.Router()

//créer un message
router.post("/", createSignalement)

////selectionner les messages d'un utilisateur 
router.get("/signal_par_destinataire", getSignalementByUser)

// Supprimer un message
router.delete("/:id", supprimerSignalement)
module.exports = router;