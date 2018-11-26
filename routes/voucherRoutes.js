const mongoose = require('mongoose');
const Voucher = mongoose.model('vouchers');
const User = mongoose.model('users');

/**
 * Function defines handlers for requests related to vouchers
 * Accepts express app for which defined handlers are applied to
 */
module.exports = app => {
  app.get('/voucher/:id', (req, res) => {
    Voucher.findOne({id: req.params.id})
      .then(voucher => {
        if(voucher) {
          res.json({voucher});
        } else {
          res.status(404)
            .send('not found');
        }
      })
  })
  
  app.delete('/voucher/:id', (req, res) => {
    User.findById(req.session.userId).then(user => {
      deleteUserVoucher(user, req.params.id).then((user) => {
        console.log('user voucher deleted: ', user);
       return res.send({success: true, user: safeUserInfo(user)});
      })
      .catch(error => res.send({success: false, error}))
    })
  })

  // handle request to get all available vouchers in Database
  app.get('*/api/vouchers', (req, res) => {
    Voucher.find()
      .then(vouchers => {
        if(vouchers) {
          res.json({vouchers});
        } else {
          res.status(404)
            .send('not found');
        }
      })
  });


  // handle request to save voucher under a particular user
  app.post('*/api/voucher', (req, res) => {
    const voucher = req.body;
    if(!voucher) {
      return res.status(500)
        .send('no vouchers sent');
    }
    User.findById(req.session.userId).then(user => {
      saveUserVoucher(user, voucher).then((user) => {
        console.log('user voucher saved: ', user);
       return res.send({success: true, user: safeUserInfo(user)});
      })
      .catch(error => res.send({success: false, error}))
    })
  });
}

/**
 * Save voucher object to a user's list of purchased vouchers
 * @param {Object} voucher 
 */
function saveUserVoucher(user, voucher) {
  return new Promise((resolve, reject) => {
    user.vouchers.push(voucher);
    User.findByIdAndUpdate(user._id, user).then(user => {
      resolve(user);
    })
    .catch(err => reject(err))
  })
}

function deleteUserVoucher(user, id) {
  return new Promise((resolve, reject) => {
    console.log(user.vouchers, Number(id));
    user.vouchers = user.vouchers.filter(voucher => voucher.id !== Number(id));
    User.findByIdAndUpdate(user._id, user)
      .then(user => {
        resolve(user);
      })
      .catch(err => reject(err))
  })
};

function safeUserInfo(user) {
  return {
    username: user.username,
    email: user.email,
    vouchers: user.vouchers
  }
}