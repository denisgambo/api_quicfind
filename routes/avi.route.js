const express = require("express");
const { createAvis, getAvisByAnnonce } = require("../controllers/avi.controller");

const router = express.Router()

//créer un message
router.post("/", createAvis)

////selectionner les messages d'un utilisateur 
router.get("/avis_par_annonce", getAvisByAnnonce)
module.exports = router;