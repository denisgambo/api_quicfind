const signalementModel = require("../controllers/signalement.controller")
const userModel = require("../models/user.model")
// Créer un message
module.exports.createSignalement = async (req, res) => {
 try {
       const signalement = await signalementModel.create({
        ...req.body,
    });
    res.status(200).json(signalement);
 } catch (error) {
    console.log(error)
        res.status(500).json({ message: "Erreur lors de l'envoi du message." });

 }
};




//selectionner les messages d'un destinataire 
module.exports.getSignalementByUser = async (req, res) => {
  const suspect = req.query.suspect;

  try {
    let signalements = await signalementModel
      .find({ suspect: suspect })
      .populate('auteur', 'nom prenom statut telephone email photo_profil')
      .populate('suspect', 'nom prenom statut telephone email')
      .populate('annonce', '_id titre description')
      // .populate('annonce', 'nom')
      .exec();

    if (signalements) {
      res.status(200).json({ signalements });
    } else {
      res.status(404).json({ message: "Aucun signalement trouvé." });
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Erreur lors de la récupération des messages." });
  }
};

//Supprimer un message
module.exports.supprimerSignalement = async (req, res) => {
  const id = req.params.id; // Utiliser req.params au lieu de req.body pour récupérer l'ID

  try {
    // Recherche de l'équipement par son ID
    let signalement = await signalementModel.findById(id);

    if (!signalement) {
      return res.status(404).json({ message: "message non trouvée" });
    }

    // Supprimer l'annonce
    await signalementModel.findByIdAndRemove(id);

    // Renvoyer une réponse de succès
    res.status(200).json({ message: "message supprimé avec succès" });
  } catch (error) {
    console.error("Une erreur s'est produite lors de la suppression du message :", error);
    res.status(500).json({ message: "Une erreur s'est produite lors de la suppression du message" });
  }
};
