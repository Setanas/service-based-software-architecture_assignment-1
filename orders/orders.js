const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const axios = require("axios")

require("./Order");
const Order = mongoose.model("Order");

app.use(bodyParser.json());

mongoose.connect(
  "mongodb+srv://MarcD:C3fiUxCkyuy8XJRj@cluster0-2cdlr.mongodb.net/orders?retryWrites=true&w=majority",
  () => {
    console.log("db connected");
  }
);

app.get("/", (req, res) => {
  res.send("main endpoint");
});

app.post("/order", (req, res) => {
  var newOrder = {
    userId: mongoose.Types.ObjectId(req.body.userId),
    ticketId: mongoose.Types.ObjectId(req.body.ticketId),
    initialDate: req.body.initialeDate, 
    deliveryDate: req.body.deliveryDate
  };

  var order = new Order(newOrder);

  order
    .save()
    .then(() => {
      console.log("New Order created!");
    })
    .catch((err) => {
      throw err;
    });
  res.send("new order created");
});

app.get("/orders", (req, res) => {
  Order.find()
    .then((orders) => {
      res.json(orders);
    })
    .catch((err) => {
      if (err) throw err;
    });
});

app.get("/order/:id", (req, res) => {
  Order.findById(req.params.id)
    .then((order) => {
      if (order) {
        axios.get("http://localhost:5555/user/" + order.userId).then((response)=> {
            console.log()
            var orderObject = { userName: response.data.name, ticketName: ""}
            axios.get("http://localhost:4545/ticket/" + order.ticketId).then((response) => {
                orderObject.ticketName = response.data.name
                res.json(orderObject);
            })
        })
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      if (err) throw err;
    });
});

app.delete("/order/:id", (req, res) => {
  Order.findOneAndRemove(req.params.id)
    .then(() => {
      res.send("Order deleted");
    })
    .catch((err) => {
      if (err) throw err;
    });
});

app.listen(7777, () => {
  console.log("server running");
});
