const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");

// Define user schema
const userSchema = new Schema({
  _id: String,
  email: String,
  displayName: String,
  username: String,
  password: String,
  vouchers: [
    {
      amount: Number,
      id: Number,
      voucherId: String,
      name: String,
      imageurl: String
    }
  ]
});

mongoose.model("users", userSchema);
const User = mongoose.model("users");

// userSchema.statics.authenticate = function(email, password, callback) {
//   User.findOne({ email: email }).exec(function(err, user) {
//     if (err) {
//       return callback(err);
//     } else if (!user) {
//       let err = new Error("user not found");
//       err.status = 401;
//       return callback(err);
//     }
//     bcrypt.compare(password, user.password, function(err, result) {
//       if (result === true) {
//         return callback(null, user);
//       } else {
//         return callback();
//       }
//     });
//   });
// };

userSchema.pre("save", function(next) {
  let user = this;
  bcrypt.hash(user.password, 10, function(err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  });
});
