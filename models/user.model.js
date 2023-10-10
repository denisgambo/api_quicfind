const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        nom: {
            type: String,
            required: true
        },
        prenom: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: false
        },
         telephone: {
            type: String,
            required: true
        },
         login: {
            type: String,
            required: true
        },
         statut: {
            type: String,
            required: true
        },
         photo_profil: {
            type: String,
            required: false
        },
         mot_de_passe: {
            type: String,
            required: true
        },
          bloquer: {
            type: Boolean,
            required: false
        },

        pays: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "pays",
            required: false
        }


    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model("user", userSchema);

