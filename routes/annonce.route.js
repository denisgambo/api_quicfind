const express = require("express");
const router = express.Router();

const upload = require("../middleware/photos_annonces");
const { createAnnonce, updateAnnonce, findAnnonceById, supprimerAnnonce, getAllAnnonces, getProduits, getServices } = require("../controllers/annonce.controller");

// ...
//Toutes les annonces
router.get("/", getAllAnnonces)
//Selectionner toutes les annonces concernant les produits
router.get("/produits", getProduits)

//Selectionner toutes les annonces concernant les services
router.get("/services", getServices)

// Utilisation du middleware upload dans les routes
router.post("/", upload, createAnnonce);
router.put("/", upload, updateAnnonce);

// ...


//Selectionner une annonce par l'id
router.get("/:id", findAnnonceById);

// Supprimer une annonce
router.delete("/:id", supprimerAnnonce)

module.exports = router;
