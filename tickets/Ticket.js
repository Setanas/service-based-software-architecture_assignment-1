const mongoose = require("mongoose")

mongoose.model("Ticket", {
    name: {
        type: String,
        require: true
    },
    stock: {
        type: Number,
        require: true
    },
    price: {
        type: Number,
        require: true
    }
});