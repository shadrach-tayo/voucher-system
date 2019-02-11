const mongoose = require("mongoose");
const User = mongoose.model("users");

/**
 * returns public user data
 * @param {object} user
 */
function safeUserInfo(user) {
  return {
    username: user.username,
    email: user.email,
    vouchers: user.vouchers,
    cart: user.cart
  };
}

/**
 * Save voucher object to a user's list of purchased vouchers
 * @param {Object} voucher
 */
function saveUserVoucher(user, voucher) {
  return new Promise((resolve, reject) => {
    user.vouchers.push(voucher);
    User.findByIdAndUpdate(user._id, user)
      .then(user => {
        resolve(user);
      })
      .catch(err => reject(err));
  });
}

/**
 * Adds cartItem to user's cart
 * @param {Object} user
 * @param {Object} cartItem
 */
function addToCart(user, cartItem) {
  return new Promise((resolve, rej) => {
    let itemToadd = null;
    const itemExists = user.cart.find((val, i) => val.item.id === cartItem.id);
    if (itemExists) {
      let cart = [];
      user.cart.forEach(cartItem => {
        if (cartItem.item.id == itemExists.item.id) {
          cartItem.quantity++;
        }
        cart.push(cartItem);
      });

      user.cart = cart;
    } else {
      itemToadd = {
        item: cartItem,
        quantity: getItemQuantity(user, cartItem)
      };
      user.cart.push(itemToadd);
    }

    User.findByIdAndUpdate(user._id, user)
      .then(response => {
        resolve(user);
      })
      .catch(err => rej(err));
  });
}

function getItemQuantity(user, cartItem) {
  return user.cart.reduce((sum, item) => {
    if (item.item.id === cartItem.id) {
      sum++;
    }
    return sum;
  }, 1);
}

/**
 * check if user email exists in database
 * @param {String} email
 */
function checkUser(email) {
  return User.findOne({ email }).then(user => {
    if (user) {
      return user;
    }
    return false;
  });
}

module.exports = {
  checkUser,
  safeUserInfo,
  saveUserVoucher,
  addToCart
};
