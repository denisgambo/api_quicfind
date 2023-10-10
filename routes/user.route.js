const express = require("express");
const { createUser, getAllUsers, editUser, findUserById, Login, updatePassword, bloquerDebloquer, changerStatut } = require("../controllers/user.controller");
const upload = require('../middleware/photos_profil')

const router = express.Router();
//Find user by id
 router.post("/user:id", findUserById);
//modifier mot de passe
router.post("/updatepassword", updatePassword)

//bloquer débloquer
router.put("/bloquer", bloquerDebloquer);
//Changer de statut
router.put("/statut", changerStatut);
//Recueillir tous les utilisateurs
router.get("/", getAllUsers);

//Find user by id
 router.get("/:id", findUserById);

//Login
router.post("/login", Login)

//Créer un utilisateur
router.post("/",upload, createUser);

//Modifier un utilisateur

router.put("/:id",upload, editUser);
//bloquer débloquer
router.put("/bloquer", bloquerDebloquer);



//Supprimer un utilisateur
router.delete("/:id", (req, res) => {
    res.json({ message: "User supprimer " + req.params.id });
});

//liker une publication

router.patch("/like-post/:id", (req, res) => {
    res.json({ message: "post-liké : id: " + req.params.id });
});

//disliker un post

router.patch("/dislike-post/:id", (req, res) => {
    res.json({ message: "post-disliké : id: " + req.params.id });
});
module.exports = router;