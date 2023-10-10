const mongoose = require("mongoose");

const AnnonceSchema = mongoose.Schema(
    {
        titre: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        date_publication:{
            type: Date,
            require:false
        },
        
        categorie: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "categorie",
            required: false
        },
        type:{
            type:String,
            require:false
        },
        en_vente:{
            type:Boolean,
            require:false
        },
          en_location:{
            type:Boolean,
            require:false
        },
        prix_vente: {
            type: Number,
            required: false
        },
        prix_location: {
            type: Number,
            required: false
        },
        duree_location:{
            type:String,
            require:false
        },
        
         adresse: {
            type: String,
            required: true
        },
         photo: {
            type: [String],
            required: false
        },
        disponibilite: {
            type: Boolean,
            required: false
        },

        proprietaire: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: false
        }


    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model("annonces", AnnonceSchema);

