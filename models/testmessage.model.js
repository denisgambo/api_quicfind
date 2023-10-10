const mongoose = require("mongoose");

const testmessage = mongoose.Schema(
    {
        message: {
            type: String,
            required: true
        },

        email:{
            type:String,
            require:false
        }


    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model("testmessage", testmessage);

