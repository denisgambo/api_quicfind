const mongoose = require("mongoose");

const avisSchema = mongoose.Schema(
    {
        message: {
            type: String,
            required: true
        },


        auteur: {
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

module.exports = mongoose.model("avis", avisSchema);

