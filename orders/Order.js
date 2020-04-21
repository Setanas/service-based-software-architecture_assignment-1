const mongoose = require("mongoose");

mongoose.model("Order", {
  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    require: true,
  },
  ticketId: {
    type: mongoose.SchemaTypes.ObjectId,
    require: true,
  },
  initialDate: {
      type: Date,
      require: true
  },
  deliveryDate: {
      type: Date,
      require: true
  }
});
