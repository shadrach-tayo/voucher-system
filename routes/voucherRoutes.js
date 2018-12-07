const mongoose = require('mongoose');
const Voucher = mongoose.model('vouchers');
const User = mongoose.model('users');
const safeUserInfo = require('../utils/user').safeUserInfo;
const saveUserVoucher = require('../utils/user').saveUserVoucher;
const deleteUserVoucher = require('../utils/voucher').deleteUserVoucher
const saveVouchers = require('../utils/voucher').saveVouchers

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
      .catch(error => {
        console.log(error);
        res.send({success: false, error})
      })
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
  
  // handle request to save multiple vouchers to database
  app.post('/api/vouchers', (req, res) => {
    const vouchers = req.body;
    if(!vouchers)
      return res.status(500)
        .send('no vouchers sent')
    return saveVouchers(vouchers)
    .then(vouchers => {
      res.json(vouchers);
    })
    .catch(err => {
      res.send(err);
      console.log(err);
    })
  })

  // handles request to clear all available vouchers in the database
  app.delete('/api/vouchers', (req, res) => {
    Voucher.remove({}).then(() => {
      res.send('success');
    }).catch(err => res.send(err))
  })
}
