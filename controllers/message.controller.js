const messageModel = require("../models/message.model")
const userModel = require("../models/user.model")
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




//selectionner les messages d'un destinataire 
module.exports.getMessageByUser = async (req, res) => {
  const destinataire = req.query.destinataire;

  try {
    let messages = await messageModel
      .find({ destinataire: destinataire })
      .populate('expediteur', 'nom prenom statut telephone email photo_profil')
      .populate('destinataire', 'nom prenom statut telephone email')
      .populate('annonce')
      // .populate('annonce', 'nom')
      .exec();

    if (messages) {
      res.status(200).json({ messages });
    } else {
      res.status(404).json({ message: "Aucun message trouvé." });
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Erreur lors de la récupération des messages." });
  }
};
/* module.exports.getMessageByUser = async (req, res) => {
  // const userId = req.params.id;
  const destinataire = req.query.destinataire;

  try {
    let messages = await messageModel.find({destinataire: destinataire});

    if (messages) {
      res.status(200).json({ messages });
    } else {
      res.status(404).json({ message: "Aucun message trouvée." });
    }
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des  messages." });
  }
}; */