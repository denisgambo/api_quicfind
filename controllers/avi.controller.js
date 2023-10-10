const annonceModel = require("../models/annonce.model")
const avisModel = require("../models/avi.model")
// Créer un message
module.exports.createAvis = async (req, res) => {
 try {
       const avis = await avisModel.create({
        ...req.body,
    });
    res.status(200).json(avis);
 } catch (error) {
    console.log(error)
        res.status(500).json({ message: "Erreur lors de l'envoi du commentaire." });

 }
};




//selectionner les messages d'un destinataire 
module.exports.getAvisByAnnonce = async (req, res) => {
  const annonce = req.query.annonce;
  // console.log(req.query)

  try {
    let avis = await avisModel
      .find({ annonce: annonce })
      .populate('auteur', 'nom prenom statut telephone email photo_profil')
    //   .populate('annonce')
      // .populate('annonce', 'nom')
      .exec();

    if (avis) {
      res.status(200).json({ avis });
      // console.log(avis)
    } else {
      res.status(404).json({ message: "Aucun avis trouvé." });
      console.log("Aucun avis")
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Erreur lors de la récupération des avis." });
  }
};
