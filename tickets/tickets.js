const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

require("./Ticket");
const Ticket = mongoose.model("Ticket");

app.use(bodyParser.json());

mongoose.connect(
  "mongodb+srv://MarcD:UDoYX5HUundpJXtm@cluster0-2cdlr.mongodb.net/test?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true},
  () => {
    console.log("db connected");
  }
);

app.get("/", (req, res) => {
  res.send("main endpoint");
});

app.post("/ticket", (req, res) => {
  var newTicket = {
    name: req.body.name,
    price: req.body.price,
    stock: req.body.stock
  };

  var ticket = new Ticket(newTicket);

  ticket
    .save()
    .then(() => {
      console.log("New Ticket created!");
    })
    .catch((err) => {
      throw err;
    });
  res.send("new ticket created");
});

app.get("/tickets", (req, res) => {
  Ticket.find()
    .then((tickets) => {
      console.log(res.json(tickets))
      res.json(tickets);
    })
    .catch((err) => {
      if (err) throw err;
    });
});

app.get("/ticket/:id", (req, res) => {
  Ticket.findById(req.params.id)
    .then((ticket) => {
      if (ticket) {
        res.json(ticket);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      if (err) throw err;
    });
});

app.delete("/ticket/:id", (req, res) => {
  Ticket.findOneAndRemove(req.params.id)
    .then(() => {
      res.send("Ticket deleted");
    })
    .catch((err) => {
      if (err) throw err;
    });
});

app.patch("/ticket/:id", (req, res) => {
  Ticket.findById(req.params.id).then((ticket) => {
    if (ticket) {
      ticket.stock -= 1;
      ticket.save();
      res.send("Ticket stock updated");
    } else {
      res.sendStatus(404);
    }
  }).catch((err) => {
    if (err) {
      res.sendStatus(404);
      throw err;
    }
  });
})

app.listen(2222, () => {
  console.log("server running");
});