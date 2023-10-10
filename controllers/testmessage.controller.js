const testmessageSchema = require("../models/testmessage.model")
// Créer un message
module.exports.testMessage = async (req, res) => {
 try {
       const message = await testmessageSchema.create({
        ...req.body,
    });
    res.status(200).json(message);
 } catch (error) {
    console.log(error)
        res.status(500).json({ message: "Erreur lors de l'envoi du commentaire." });

 }
};