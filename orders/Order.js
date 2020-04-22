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
  paid: {
      type: Boolean,
      require: true
  }
});
