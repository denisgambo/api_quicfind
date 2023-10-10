const express = require("express");
const { testMessage } = require("../controllers/testmessage.controller");

const router = express.Router()

//créer un message
router.post("/", testMessage)

////selectionner les messages d'un utilisateur 
module.exports = router;