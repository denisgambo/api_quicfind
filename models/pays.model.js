const mongoose = require("mongoose");

const paysSchema = mongoose.Schema(
    {
        nom: {
            type: String,
            require: true
        },
        indicatif: {
            type: String,
            require: false
        }
    }
)

module.exports = mongoose.model("pays", paysSchema);