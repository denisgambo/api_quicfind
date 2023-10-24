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
      .populate('annonce', '_id titre description')
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
//

//Supprimer un message
module.exports.supprimerMessage = async (req, res) => {
  const id = req.params.id; // Utiliser req.params au lieu de req.body pour récupérer l'ID

  try {
    // Recherche de l'équipement par son ID
    let message = await messageModel.findById(id);

    if (!message) {
      return res.status(404).json({ message: "message non trouvée" });
    }

    // Supprimer l'annonce
    await messageModel.findByIdAndRemove(id);

    // Renvoyer une réponse de succès
    res.status(200).json({ message: "message supprimé avec succès" });
  } catch (error) {
    console.error("Une erreur s'est produite lors de la suppression du message :", error);
    res.status(500).json({ message: "Une erreur s'est produite lors de la suppression du message" });
  }
};
