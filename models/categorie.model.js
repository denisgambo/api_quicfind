const mongoose = require("mongoose");

const categorieSchema = mongoose.Schema(
    {
        nom: {
            type: String,
            require: true
        },
        description: {
            type: String,
            require: false
        },
    }
)

module.exports = mongoose.model("categorie", categorieSchema);