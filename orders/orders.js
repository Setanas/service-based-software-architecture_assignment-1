const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const axios = require("axios")

require("./Order");
const Order = mongoose.model("Order");

app.use(bodyParser.json());

mongoose.connect(
  "mongodb+srv://MarcD:UDoYX5HUundpJXtm@cluster0-2cdlr.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("db connected");
  }
);

app.get("/", (req, res) => {
  res.send("main endpoint");
});

function postTicket(req, ticket) {
  if (ticket.data.stock == 0) {
    res.status(404).send("No more ticket available");
  } else {
    var newOrder = {
      userId: req.body.userId,
      ticketId: req.body.ticketId,
      paid: false
    };
    var order = new Order(newOrder);

    order.save()
      .then(() => { })
      .catch((err) => {
        throw err;
      });
  }
}

app.post("/order", (req, res) => {
  axios.get("http://localhost:2222/ticket/" + req.body.ticketId)
    .then(postTicket.bind(null, req))
    .catch((err) => {
      if (err) throw err;
    });
  res.send("new order created");
});


function payTicket(document, res, userData, ticket) {
  if (userData.wallet >= ticket.data.price &&
    ticket.data.stock > 0 &&
    document.paid == false) {
    document.paid = true;
    axios.patch("http://localhost:2222/ticket/" + document.ticketId)
    .catch((err) => {
      if (err) {
        res.sendStatus(404);
        throw err;
      }
    });
    axios.patch("http://localhost:3333/user/" + document.userId)
    .catch((err) => {
      if (err) {
        res.sendStatus(404);
        throw err;
      }
    });
    document.save()
    res.send("The order has been paid")
  } else {
    res.sendStatus(404)
  }
}

function getUser(document, res, user) {
  if (user) {
    axios.get("http://localhost:2222/ticket/" + document.ticketId)
      .then(payTicket.bind(null, document, res, user.data))
      .catch(err => {
        if (err) {
          res.sendStatus(404);
          throw err;
        }
      });
  } else {
    res.sendStatus(404)
  }
}

app.patch("/order/:id", (req, res) => {
  Order.findById(req.params.id).then((document) => {
    if (document) {
      axios.get("http://localhost:3333/user/" + document.userId)
        .then(getUser.bind(null, document, res))
        .catch((err) => {
          if (err) {
            res.sendStatus(404);
            throw err;
          }
        });
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




app.get("/orders", (req, res) => {
  Order.find()
    .then((orders) => {
      res.json(orders);
    })
    .catch((err) => {
      if (err) {
        res.sendStatus(404);
        throw err;
      }
    });
});

app.get("/order/:id", (req, res) => {
  Order.findById(req.params.id)
    .then((order) => {
      if (order) {
        axios.get("http://localhost:3333/user/" + order.userId).then((response) => {
          console.log()
          var orderObject = { userName: response.data.name, ticketName: "" }
          axios.get("http://localhost:2222/ticket/" + order.ticketId).then((response) => {
            orderObject.ticketName = response.data.name
            res.json(orderObject);
          })
        })
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      if (err) {
        res.sendStatus(404);
        throw err;
      }
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

app.listen(4444, () => {
  console.log("server running");
});
