const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/product");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/", (req, res, next) => {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({
        error: err
      });
    } else {
      const user = new User({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email,
        password: hash,
        number: req.body.number
      });
      user
        .save()
        .then(result => {
          res.status(200).json({
            msg: "Successfully Signed In"
          });
        })
        .catch(err => {
          res.status(500).json({
            error: err
          });
        });
    }
  });
});


router.post("/login", (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        return res.status(401).json({
          msg: "User not found",
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            msg: "Password matching failed",
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              name: user[0].name,
              email: user[0].email,
            },
            "this is random text",
            {
              expiresIn: "24h",
            }
          );
          res.status(200).json({
            msg: "Login successful",
            token: token,
          });
        } else {
          res.status(401).json({
            msg: "Password matching failed",
          });
        }
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

router.put("/update", (req, res)=>{
  User.findOneAndUpdate({email: req.body.email},{
    $set:{
      number: req.body.number
    }
  })
  .then(result=>{
    res.status(200).json({
      msg: 'Changed Successfully'
    })
  })
  .catch(err=>{
    console.log(err);
    res.status(500).json({
      error: err
    })
  })
})

module.exports = router;
