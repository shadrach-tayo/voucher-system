const passport = require("passport");
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const User = mongoose.model("users");
const uuidv1 = require('uuid/v1');

/**
 * Module to handle authentication routing request
 */
module.exports = app => {
  // Handle Google Login requests
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );

  // Finalize user Authentication on google callback
  app.get(
    "/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/" }),
    (req, res) => {
      res.redirect("/");
    }
  );

  // Handle User Logout Request
  app.get("/api/logout", (req, res) => {
    console.log("logging out");
    if (req.session) {
      req.session.destroy(function(err) {
        if (err) {
          return res.send("cannot logout");
        } else {
          return res.redirect("/");
        }
      });
    } else {
      res.redirect('/')
    }
  });

  // Handle User Login Request
  app.post("/api/login", (req, res) => {
    console.log("user: ", req.body);
    const { email, password } = req.body;
    if (email && password) {
      // check user in database
      User.findOne({ email: email })
        .then(user => {
          if (!user) {
            return res.json({ success: false, message: "user not found" });
          }
          bcrypt.compare(password, user.password, function(err, result) {
            console.log('user to logIn: ', user);
            if (result === true) {
              req.session.userId = user._id;
              return res.redirect("/");
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
    console.log("user: ", req.body);
    const { username, email, password, confirmPassword } = req.body;
    if (username && email && password && confirmPassword) {
      // save new user to database
      new User({
        _id: uuidv1(),
        username: username,
        password: password,
        email: email,
        confirmPassword: confirmPassword
      }).save()
        .then(user => {
          console.log("new user: ", user);
          req.session.userId = user._id;
          res.json({success: true});
        })
        .catch(err => {
          console.log(err);
          console.log('user not saved');
          res.send('User not saved');
        })
    } else {
      console.log('user not saved');
      res.json({ success: false, message: "Fields cannot be empty" });
    }
  });

  // Handle request for currently logged In user
  app.get("/api/current_user", (req, res) => {
    console.log("getting current user");
    User.findById(req.session.userId)
      .then(user => {
        console.log("user: ", user, " session id: ", req.session.userId);
        if (user) {
          const { _id, username, email, vouchers } = user;
          res.send({_id, username, email, vouchers});
        } else {
          res.status(500).send('user not logged in');
        }
      })
      .catch(error => {
        res.send("Server Error");
      });
    // res.send(req.user);
  });
};
