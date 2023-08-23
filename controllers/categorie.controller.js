const categorieModel = require("../models/categorie.model")

// Créer une categorie
module.exports.createCategorie = async (req, res) => {
 try {
       const categorie = await categorieModel.create({
        ...req.body,
    });
    res.status(200).json(categorie);
 } catch (error) {
    console.log(error)
 }
};

//toutes les catégories
module.exports.getAllCategories= async (req, res, next) => {
    try {
        const categories = await categorieModel.find();
        res.status(200).json(categories);
    } catch (error) {
        next(error);
    }
};


//Supprimer une categorie
module.exports.supprimerCategorie = async (req, res) => {
  const id = req.params.id; // Utiliser req.params au lieu de req.body pour récupérer l'ID
  console.log(id)

  try {
    // Recherche de la categorie par son ID
    let categorie = await categorieModel.findById(id);

    if (!categorie) {
      return res.status(404).json({ message: "categorie non trouvée" });
    }

    // Supprimer la categorie
    await categorieModel.findByIdAndRemove(id);

    // Renvoyer une réponse de succès
    res.status(200).json({ message: "catégorie supprimée avec succès" });
  } catch (error) {
    console.error("Une erreur s'est produite lors de la suppression de la categorie :", error);
    res.status(500).json({ message: "Une erreur s'est produite lors de la suppression de la categorie " });
  }
};



//selectionner une categore par id
module.exports.getCategorieById = async (req, res) => {
  const id = req.params.id;

  try {
    let categore = await categorieModel.findById(id);

    if (categore) {
      res.status(200).json({ categore });
    } else {
      res.status(404).json({ message: "categorie non trouvée." });
    }
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération de la catégorie." });
  }
};

//Modifier une catégorie

module.exports.modifierCategorie = async (req, res) => {
    try {
      const categore = await categorieModel.findById(req.params.id);
    if (!categore) {
        res.status(400).json({ message: "Cette catégorie n\'existe pas" });
    } else {
                 
           const updatedCategorie = await categorieModel.findByIdAndUpdate(categore, req.body, { new: true });
        res.status(200).json(updatedCategorie);
    }
    } catch (error) {
      
    }
}