const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = mongoose.model("users");
const uuidv1 = require("uuid/v1");
const checkUser = require('../utils/user').checkUser
const safeUserInfo = require('../utils/user').safeUserInfo

/**
 * Module to handle authentication routing request
 */
module.exports = app => {
  // Handle User Logout Request
  app.get("/api/logout", (req, res) => {
    if (req.session) {
      req.session.destroy(function(err) {
        if (err) {
          return res.send("cannot logout");
        } else {
          return res.redirect("/");
        }
      });
    } else {
      res.redirect("/");
    }
  });

  // Handle User Login Request
  app.post("/api/login", (req, res) => {
    const { email, password } = req.body;
    if (email && password) {
      // check user in database
      User.findOne({ email })
        .then(user => {
          if (!user) {
            return res.json({ success: false, message: "Email not registered, sign up to continue." });
          }
          bcrypt.compare(password, user.password, function(err, result) {
            if (result === true) {
              req.session.userId = user._id;
              return res.json({ success: true });
            } else {
              return res.json({
                success: false,
                message: "Incorrect password"
              });
            }
          });
        })
        .catch(err => {
          console.log(err);
          return res.json({
            success: false,
            message: "wrong email or password"
          });
        });
    } else {
      res.json({
        success: false,
        message: "Email or Password cannot be empty"
      });
    }
  });

  // Handle User Login Request
  app.post("/api/signup", (req, res) => {
    const { username, email, password, confirmPassword } = req.body;
    if (username && email && password && confirmPassword) {
      // check if there is an existing user with the same email
        checkUser(email).then(user => {
          if(user)
            return res.json({ success: false, message: "email already exists" });
          // save new user to database with a uuid generated _id property
          new User({
            _id: uuidv1(),
            username,
            password,
            email
          })
          .save()
          .then(user => {
            req.session.userId = user._id;
            res.json({ success: true });
          })
          .catch(err => {
            console.log(err);
            res.json({
              success: false,
              message: "Internal server error user not saved"
            });
        }) 
      })
    } else {
      res.json({ success: false, message: "Fields cannot be empty" });
    }
  });

  // Handle request for currently logged In user
  app.get("*/api/current_user", (req, res) => {
    if(req.session.userId) {
      User.findById(req.session.userId)
        .then(user => {
          if (user) {
            res.json(safeUserInfo(user));
          } else {
            res.status(500).send("user not logged in");
          }
        })
        .catch(error => {
          console.log(error);
          res.send("Server Error");
        });
    } else {
      return res.status(204).send('not loggedIn')
    }
  });
};

