const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

app.use(bodyParser.json())

mongoose.connect(
  "mongodb+srv://MarcD:C3fiUxCkyuy8XJRj@cluster0-2cdlr.mongodb.net/users?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true},
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
    User.findOneAndRemove(req.params.id)
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
  

app.listen("5555", () => {
  console.log("running users");
});
