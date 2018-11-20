const mongoose = require('mongoose');
const Voucher = mongoose.model('vouchers');
const BoughtVoucher = mongoose.model('boughtvouchers');
const User = mongoose.model('users');

/**
 * Function defines handlers for requests related to vouchers
 * Accepts express app for which defined handlers are applied to
 */
module.exports = app => {
  app.get('/voucher/:id', async (req, res) => {
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
    console.log(voucher); 
    if(!voucher) {
      res.status(500)
        .send('no vouchers sent');
      return;
    }
    saveUserVoucher(voucher).then((voucher) => {
      console.log('saved to database');
      res.send(voucher);
    })
    .catch(err => res.send(err))
  });
}

/**
 * Save voucher object to a user's list of purchased vouchers
 * @param {Object} voucher 
 */
function saveUserVoucher(voucher) {
  return new Promise(async (resolve, reject) => {
    User.findOne({googleId: voucher.userId}).then(user => {
      console.log(user.vouchers);
      user.vouchers.push(
        new BoughtVoucher({
          userId: voucher.userId,
          id: voucher.id,
          amount: voucher.amount,
          voucherId: voucher.voucherId
        })
      )
    })
   .save()
      .then(voucher => {
        resolve(voucher);
      })
  })
}
