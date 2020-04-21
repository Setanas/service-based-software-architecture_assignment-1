const mongoose = require("mongoose")

mongoose.model("User", {
    name: {
        type: String,
        require: true
    },
    wallet: {
        type: Number,
        require: true
    }
});