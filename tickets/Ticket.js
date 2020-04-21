const mongoose = require("mongoose")

mongoose.model("Ticket", {
    name: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: false
    }
});