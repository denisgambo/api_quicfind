const messageModel = require("../models/message.model")
// Créer un message
module.exports.createMessage = async (req, res) => {
 try {
       const message = await messageModel.create({
        ...req.body,
    });
    res.status(200).json(message);
 } catch (error) {
    console.log(error)
        res.status(500).json({ message: "Erreur lors de l'envoi du message." });

 }
};




//selectionner les messages d'un utilisateur 
module.exports.getMessageByUser = async (req, res) => {
  const userId = req.params.id;
  const expediteur = req.body.expediteur

  try {
    let messages = await messageModel.find({destinataire: userId});

    if (messages) {
      res.status(200).json({ messages });
    } else {
      res.status(404).json({ message: "categorie non trouvée." });
    }
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération de la catégorie." });
  }
};