
const paysModel = require("../models/pays.model")
// Créer un pays
module.exports.createPays = async (req, res) => {
 try {
       const pays = await paysModel.create({
        ...req.body,
    });
    res.status(200).json(pays);
 } catch (error) {
    console.log(error)
            res.status(500).json({ message: "Erreur lors de la création du pays." });

 }
};

//tous les pays
module.exports.getAllPays= async (req, res, next) => {
    try {
        const pays = await paysModel.find();
        res.status(200).json(pays);
    } catch (error) {
        next(error);
    }
};

//Modifier un pays



module.exports.modifierPays = async (req, res) => {
    try {
      const pays = await paysModel.findById(req.params.id);
    if (!pays) {
        res.status(400).json({ message: "Ce pays n\'existe pas" });
    } else {
                 
           const updatedPays = await paysModel.findByIdAndUpdate(pays, req.body, { new: true });
        res.status(200).json(updatedPays);
    }
    } catch (error) {
      
    }
}