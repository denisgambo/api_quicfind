const mongoose = require("mongoose");

const messageSchema = mongoose.Schema(
    {
        contenu: {
            type: String,
            required: true
        },


        expediteur: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true
        },

        destinataire: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true
        },
        annonce: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "anonnce",
            required: false
        },
        date_envoi:{
            type:Date,
            require:false
        }


    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model("message", messageSchema);

