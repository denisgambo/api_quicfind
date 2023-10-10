const AnnonceModel = require('../models/annonce.model')
const mongoose = require("mongoose")

// module.exports.createAnnonce = async (req, res)=>
module.exports.createAnnonce = async (req, res) => {
  // console.log(req.body)
    try {
      if(req.file){
        const photo = `${req.protocol}://${req.get('host')}/images/images_annonces/${req.file.filename}`;
    const annonce = await AnnonceModel.create({
      
        ...req.body,
        
        photo, //: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    res.status(200).json(annonce);
      }else{
        const annonce = await AnnonceModel.create({
      
        ...req.body,
        
    });
    res.status(200).json(annonce);
      }
    } catch (error) {
      console.log(error)
      res.status(400).json(error)
    }
};

//Selectionner toutes les annonces
module.exports.getAllAnnonces = async (req, res) => {

  try {
    let annonces = await AnnonceModel.find().populate({
      path: 'proprietaire',
      select: 'nom prenom email telephone photo_profil pays'
    });

    if (annonces) {
      res.status(200).json({ annonces });
    } else {
      res.status(404).json({ message: "Annonce non trouvé." });
    }
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération de l'annonce." });
  }
};

//Selectionner toutes les annonces concernant les produits
/* module.exports.getProduits = async (req, res) => {

  try {
    let annonces = await AnnonceModel.find({type:"produit"});

    if (annonces) {
      res.status(200).json({ annonces });
    } else {
      res.status(404).json({ message: "Annonce non trouvé." });
    }
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération de l'annonce." });
  }
}; */
module.exports.getProduits = async (req, res) => {
  try {
    let annonces = await AnnonceModel.find({ type: "produit" }).populate({
      path: 'proprietaire',
      select: 'nom prenom email telephone photo_profil pays'
    });

    if (annonces) {
      res.status(200).json({ annonces });
    } else {
      res.status(404).json({ message: "Annonce non trouvé." });
    }
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération de l'annonce." });
  }
};

//Selectionner toutes les annonces concernant l'immobiliers
module.exports.getImmobilier = async (req, res) => {

  try {
    let annonces = await AnnonceModel.find({type:"immobilier"}).populate({
      path: 'proprietaire',
      select: 'nom prenom email telephone photo_profil pays'
    });

    if (annonces) {
      res.status(200).json({ annonces });
    } else {
      res.status(404).json({ message: "Annonce non trouvé." });
    }
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération de l'annonce." });
  }
};


//Selectionner toutes les annonces concernant les services
module.exports.getServices = async (req, res) => {

  try {
    let annonces = await AnnonceModel.find({type:"service"}).populate({
      path: 'proprietaire',
      select: 'nom prenom email telephone photo_profil pays'
    });

    if (annonces) {
      res.status(200).json({ annonces });
    } else {
      res.status(404).json({ message: "Annonce non trouvé." });
    }
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération de l'annonce." });
  }
};


//Modifier une annonce

module.exports.updateAnnonce = async (req, res) => {
  const id = req.params.id;
   try {
    // Vérifier si une nouvelle image a été fournie
    if (req.file) {
      const photo = `${req.protocol}://${req.get('host')}/images/images_annonces${req.file.filename}`;

      // Mettre à jour l'annonce avec la nouvelle image
      await AnnonceModel.findOneAndUpdate(
        { _id:new mongoose.Types.ObjectId(id)  },
        { ...req.body, photo },
        { new: true }
      );
      console.log(" premier succès")
    } else {
      // Mettre à jour l'annonce sans changer l'image
      await AnnonceModel.findOneAndUpdate(
        { _id: id },
        req.body,
        { new: true }
      );
      console.log(" deuxième succès")
    }

    res.status(200).json({ message: "L'annonce a été mise à jour avec succès." });
  } catch (error) {
    console.log(error)
    res.status(400).json(error);
  }
};


//Selectionner une annonce par l'id
module.exports.findAnnonceById = async (req, res) => {
 
  const id = req.params.id;

  try {
    let annonce = await AnnonceModel.findById(id).populate({
      path: 'proprietaire',
      select: 'nom prenom email telephone photo_profil pays'
    });

    if (annonce) {
      res.status(200).json({ annonce });
    } else {
      res.status(404).json({ message: "Annonce non trouvé." });
    }
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des l'annonce." });
  }
};


//Supprimer une annonce
module.exports.supprimerAnnonce = async (req, res) => {
  const id = req.params.id; // Utiliser req.params au lieu de req.body pour récupérer l'ID

  try {
    // Recherche de l'équipement par son ID
    let annonce = await AnnonceModel.findById(id);

    if (!annonce) {
      return res.status(404).json({ message: "Annonce non trouvée" });
    }

    // Supprimer l'annonce
    await AnnonceModel.findByIdAndRemove(id);

    // Renvoyer une réponse de succès
    res.status(200).json({ message: "Annonce supprimée avec succès" });
  } catch (error) {
    console.error("Une erreur s'est produite lors de la suppression de l'annonce :", error);
    res.status(500).json({ message: "Une erreur s'est produite lors de la suppression de l'annonce" });
  }
};

//Annonces par utilisateurs
module.exports.getAnnoncesByUser = async (req, res) => {
  const userId = req.query.userId

  // console.log(req.query)
  try {
    let annonces = await AnnonceModel.find({ proprietaire: userId }).populate({
      path: 'proprietaire',
      select: 'nom prenom email telephone photo_profil pays'
    });

    if (annonces) {
      res.status(200).json({ annonces });
    } else {
      res.status(404).json({ message: "Annonce non trouvé." });
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Erreur lors de la récupération des annonces.", error });
  }
};