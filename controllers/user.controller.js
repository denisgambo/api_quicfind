const UserModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");
const userModel = require("../models/user.model");



//create a user

module.exports.createUser = async (req, res) => {
  console.log(req.body)
  const saltRounds = 10; // Définir le nombre de rounds pour le hachage du mot de passe
    const hashedPassword = await bcrypt.hash(req.body.mot_de_passe, saltRounds);
    try {
      if(req.file.filename){
        const photo_profil = `${req.protocol}://${req.get('host')}/images/photos_profil/${req.file.filename}`;
    const user = await UserModel.create({
      
        nom: req.body.nom,
        prenom: req.body.prenom,
        login: req.body.login,
        telephone: req.body.telephone,
        email: req.body.email,
        mot_de_passe: hashedPassword, // Stocker le mot de passe haché dans la base de données
        statut: req.body.statut,
        genre: req.body.genre,
        bloquer:false,
        pays:req.body.pays,
        
        photo_profil, //: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    res.status(200).json(user);
      }else{
        const user = await userModel.create({
      
           nom: req.body.nom,
        prenom: req.body.prenom,
        login: req.body.login,
        telephone: req.body.telephone,
        email: req.body.email,
        mot_de_passe: hashedPassword, // Stocker le mot de passe haché dans la base de données
        statut: req.body.statut,
        genre: req.body.genre,
        bloquer:false,
        pays:req.body.pays,
        
    });
    res.status(200).json(user);
      }
    } catch (error) {
      console.log(error)
      res.status(400).json(error)
    }
};

module.exports.Login = async (req, res, next) => {
  console.log(req.body)
  console.log(req.params)
    console.log(req.query)

  try {
    const { login, mot_de_passe } = req.body;
    const user = await UserModel.findOne({ login });

    if (!user) {
      return res.status(401).json({ message: 'Paire login/mot de passe incorrecte' });
    }

    const isPasswordValid = await bcrypt.compare(mot_de_passe, user.mot_de_passe);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Paire login/mot de passe incorrecte' });
    }

    res.status(200).json({
      userId: user._id,
      nom: user.nom,
      prenom: user.prenom,
      photo_profil: user.photo_profil,
      statut: user.statut,
      bloquer: user.bloquer,
      telephone:user.telephone,
      email:user.email,
      token: jwt.sign(
        { userId: user._id },
        'RANDOM_TOKEN_SECRET',
        { expiresIn: '24h' }
      )
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error });
  }
};

module.exports.getAllUsers = async (req, res) => {
   try {
     const allUsers = await UserModel.find();
    res.status(200).json(allUsers);
   } catch (error) {
    res.status(500).json({message:"Une erreur s'est produite lors de la recupération de l'utilisateurs"})
   }
}

//find user by id
module.exports.findUserById = async (req, res) => {
    const user = await UserModel.findById(req.params.id);
    res.status(200).json(user);
} 

//create a user
/* module.exports.createUser = async (req, res) => {
    const user = await UserModel.create({
        nom: req.body.nom,
        prenom: req.body.prenom,
        email: req.body.email
    });
    res.status(200).json(user);
} */


//edit a user



module.exports.editUser = async (req, res) => {
    try {
      const user = await UserModel.findById(req.params.id);
    if (!user) {
        res.status(400).json({ message: "Cet utilisateur n\'existe pas" });
    } else {
        if(req.file){
                  const photo_profil = `${req.protocol}://${req.get('host')}/images/photos_profil/${req.file.filename}`;
                  req.body.photo_profil = photo_profil

          const updateUser = await UserModel.findByIdAndUpdate(user, req.body, { new: true });
        res.status(200).json(updateUser);
        }else{
           const updateUser = await UserModel.findByIdAndUpdate(user, req.body, { new: true });
        res.status(200).json(updateUser);
        console.log("réussi")
        }
    }
    } catch (error) {
      console.log(error)
    }
}



//Bloquer ou débloquer un utilisateur

module.exports.bloquerDebloquer = async (req, res) => {
  // console.log(req.body)
  const id = req.body.id; // ID du consommable à mettre à jour
  const bloquer = req.body.bloquer; 
  try {
    // Recherche du consommable par son ID
    let user = await UserModel.findById(id);

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    // Mise à jour de la quantité en stock
    if(bloquer==true){
        user.bloquer =false;
    }else if(bloquer == false){
        user.bloquer = true;
    }

    // Enregistrement des modifications
    await user.save();

    res.status(200).json(user);
  } catch (error) {
    console.error("Une erreur s'est produite lors de la mise à jour de l'utlisateur :", error);
    res.status(500).json({ message: "Une erreur s'est produite lors de la mise à jour de l'utlisateur" });
  }
};


//Modifier mot de passe
module.exports.updatePassword = async (req, res) => {
  const { utilisateurId, mot_de_passe_actuel, nouveau_mot_de_passe } = req.body;

  try {
    // Trouver l'utilisateur par son ID
    const user = await UserModel.findById(utilisateurId);

    // Vérifier si l'utilisateur existe
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    // Vérifier si l'actuel mot de passe est correct
    const passwordMatch = await bcrypt.compare(mot_de_passe_actuel, user.mot_de_passe);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Mot de passe actuel incorrect" });
    }

    // Hacher et mettre à jour le nouveau mot de passe
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(nouveau_mot_de_passe, saltRounds);
    user.mot_de_passe = hashedPassword;

    // Sauvegarder les modifications dans la base de données
    await user.save();

    res.status(200).json({ message: "Mot de passe mis à jour avec succès" });
  } catch (error) {
    console.log(error)
    return res.status(500).json(error);
  }
}

//Change user status
module.exports.changerStatut = async (req, res) => {
  console.log(req.body)
  const id = req.body.id; // ID du consommable à mettre à jour
  const statut = req.body.statut; 
  try {
    // Recherche du consommable par son ID
    let user = await UserModel.findById(id);

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

   

    user.statut=statut

    // Enregistrement des modifications
    await user.save();

    res.status(200).json(user);
  } catch (error) {
    console.error("Une erreur s'est produite lors de la mise à jour de l'utlisateur :", error);
    res.status(500).json({ message: "Une erreur s'est produite lors de la mise à jour de l'utlisateur" });
  }
};