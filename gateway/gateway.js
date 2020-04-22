const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const axios = require("axios");
const config = require('../config.json');

app.use(bodyParser.json());

//ORDER

app.post("/order", (req, res) => {
  var newOrder = {
    userId: mongoose.Types.ObjectId(req.body.userId),
    ticketId: mongoose.Types.ObjectId(req.body.ticketId),
    paid: req.body.paid,
  };
  axios
    .post("http://localhost:" + config.orderPort + "/order", newOrder)
    .then((orders) => {
      res.send(orders.data);
    })
    .catch((err) => {
      if (err) throw err;
    });
});

app.get("/orders", (req, res) => {
  axios
    .get("http://localhost:" + config.orderPort + "/orders")
    .then((orders) => {
      res.send(orders.data);
    })
    .catch((err) => {
      if (err) throw err;
    });
});

app.get("/order/:id", (req, res) => {
  axios
    .get("http://localhost:" + config.orderPort + "/order/" + req.params.id)
    .then((orders) => {
      res.send(orders.data);
    })
    .catch((err) => {
      if (err) throw err;
    });
});

app.delete("/order/:id", (req, res) => {
  axios
    .delete("http://localhost:" + config.orderPort + "/order/" + req.params.id)
    .then((orders) => {
      res.send(orders.data);
    })
    .catch((err) => {
      if (err) throw err;
    });
});

app.patch("/order/:id", (req, res) => {
  axios
    .patch("http://localhost:" + config.orderPort + "/order/" + req.params.id, req.body)
    .then((orders) => {
      res.send(orders.data);
    })
    .catch((err) => {
      if (err) {
        res.send(err.message);
        throw err;
      }
    });
});

//USER

app.post("/user", (req, res) => {
  var newUser = {
    name: req.body.name,
    wallet: req.body.wallet,
  };
  axios
    .post("http://localhost:" + config.userPort + "/user", newUser)
    .then((users) => {
      res.send(users.data);
    })
    .catch((err) => {
      if (err) throw err;
    });
});

app.get("/users", (req, res) => {
  axios
    .get("http://localhost:" + config.userPort + "/users")
    .then((users) => {
      res.send(users.data);
    })
    .catch((err) => {
      if (err) throw err;
    });
});

app.get("/user/:id", (req, res) => {
  axios
    .get("http://localhost:" + config.userPort + "/user/" + req.params.id)
    .then((users) => {
      res.send(users.data);
    })
    .catch((err) => {
      if (err) throw err;
    });
});

app.delete("/user/:id", (req, res) => {
  axios
    .delete("http://localhost:" + config.userPort + "/user/" + req.params.id)
    .then((users) => {
      res.send(users.data);
    })
    .catch((err) => {
      if (err) throw err;
    });
});

app.patch("/user/:id", (req, res) => {
  axios
    .patch("http://localhost:" + config.userPort + "/user/" + req.params.id, req.body)
    .then((users) => {
      res.send(users.data);
    })
    .catch((err) => {
      if (err) throw err;
    });
});

//TICKET

app.post("/ticket", (req, res) => {
  var newTicket = {
    name: req.body.name,
    price: req.body.price,
    stock: req.body.stock,
  };
  axios
    .post("http://localhost:" + config.ticketPort + "/ticket", newTicket)
    .then((tickets) => {
      res.send(tickets.data);
    })
    .catch((err) => {
      if (err) throw err;
    });
});

app.get("/tickets", (req, res) => {
  axios
    .get("http://localhost:" + config.ticketPort + "/tickets")
    .then((tickets) => {
      res.send(tickets.data);
    })
    .catch((err) => {
      if (err) throw err;
    });
});

app.get("/ticket/:id", (req, res) => {
  axios
    .get("http://localhost:" + config.ticketPort + "/ticket/" + req.params.id)
    .then((tickets) => {
      res.send(tickets.data);
    })
    .catch((err) => {
      if (err) throw err;
    });
});

app.delete("/ticket/:id", (req, res) => {
  axios
    .delete("http://localhost:" + config.ticketPort + "/ticket/" + req.params.id)
    .then((tickets) => {
      res.send(tickets.data);
    })
    .catch((err) => {
      if (err) throw err;
    });
});

app.patch("/ticket/:id", (req, res) => {
  axios
    .patch("http://localhost:" + config.ticketPort + "/ticket/" + req.params.id, req.body)
    .then((tickets) => {
      res.send(tickets.data);
    })
    .catch((err) => {
      if (err) throw err;
    });
});

app.listen(Number(config.gatewayPort), () => {
  console.log("server for Gateway running");
});
