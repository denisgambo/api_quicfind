const express = require("express");
const { createMessage, getMessageByUser } = require("../controllers/message.controller");

const router = express.Router()

//créer un message
router.post("/", createMessage)

////selectionner les messages d'un utilisateur 
router.get("/message_par_destinataire", getMessageByUser)
module.exports = router;