const express = require("express");
const { createCategorie, modifierCategorie, getCategorieById, supprimerCategorie, getAllCategories } = require("../controllers/categorie.controller");
const router = express.Router();


// ...

 router.post("/", createCategorie);
 //Toutes les catégories
 router.get("/", getAllCategories)

 //Modifier une acégorie
router.put("/", modifierCategorie); 

// ...


//Selectionner une catégorie par l'id
router.get("/:id", getCategorieById);

// Supprimer une catégorie
router.delete("/:id", supprimerCategorie)

module.exports = router;
