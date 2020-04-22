const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const config = require('../config.json');

app.use(bodyParser.json())

mongoose.connect(
  "mongodb+srv://MarcD:UDoYX5HUundpJXtm@cluster0-2cdlr.mongodb.net/users?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("db connected");
  }
);

require("./User");
const User = mongoose.model("User");

app.post("/user", (req, res) => {
  console.log(req.body)
  var newUser = {
    name: req.body.name,
    wallet: req.body.wallet
  }
  var user = new User(newUser)
  user.save().then(() => {
    res.send("User Created")
  }).catch((err) => {
    if (err)
      throw err
  })
})

app.get("/user/:id", (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (user) {
        res.json(user);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      if (err) throw err;
    });
});

app.delete("/user/:id", (req, res) => {
  User.findByIdAndRemove(req.params.id)
    .then(() => {
      res.send("User deleted");
    })
    .catch((err) => {
      if (err) throw err;
    });
});

app.get("/users", (req, res) => {
  User.find()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      if (err) throw err;
    });
});


app.patch("/user/:id", (req, res) => {
  User.findById(req.params.id).then((user) => {
    console.log(req.body.price)
    if (user) {
      user.wallet -= req.body.price;
      user.save();
      res.send("User wallet updated");
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

app.listen(Number(config.userPort), () => {
  console.log("server for Users running");
});
