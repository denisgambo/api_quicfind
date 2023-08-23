const express = require("express");
const { createMessage, getMessageByUser } = require("../controllers/message.controller");

const router = express.Router()

//créer un message
router.post("/", createMessage)

////selectionner les messages d'un utilisateur 
router.get("/:id", getMessageByUser)
module.exports = router;