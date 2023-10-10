const mongoose = require("mongoose");

const SignalementSchema = mongoose.Schema(
    {
        motif: {
            type: String,
            required: true
        },


        auteur: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true
        },

        suspect: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true
        },
        annonce: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "annonces",
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

module.exports = mongoose.model("signalement", SignalementSchema);

