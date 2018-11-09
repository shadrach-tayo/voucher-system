const mongoose = require('mongoose');

const Voucher = mongoose.model('vouchers');
const BoughtVoucher = mongoose.model('boughtvouchers');

module.exports = app => {
  // request to add vouchers to database
  app.post('/voucher', (req, res) => {
    const voucher = req.body;
    console.log(voucher);
    if(!voucher) {
      res.send('no vouchers sent');
      return;
    }
    console.log(req.body);
    saveVouchersToDb(voucher).then((voucher) => {
      res.send(voucher);
    })
    .catch(err => res.send(err))
  })
  
  app.post('api/voucher', (req, res) => {
    const voucher = req.body;
    console.log(voucher);
    res.send(req.body);
    // if(!voucher) {
    //   res.status(500)
    //     .send('no vouchers sent');
    //   return;
    // }
    console.log(req.body);
    saveUserVoucher(voucher).then((voucher) => {
      res.send(voucher);
    })
    .catch(err => res.send(err))
  })

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
  
  app.get('/api/vouchers', async (req, res) => {
    Voucher.find()
      .then(vouchers => {
        console.log(vouchers);
        if(vouchers) {
          res.json({vouchers});
        } else {
          res.status(404)
            .send('not found');
        }
      })
  })
}


function saveUserVoucher(voucher) {
  return new Promise(async (resolve, reject) => {
    new BoughtVoucher({
      userId: voucher.userId,
      id: voucher.id,
      amount: voucher.amount,
      voucherId: voucher.voucherId
    }).save()
      .then(voucher => {
        resolve(voucher);
      })
  })
}

function saveVouchersToDb(voucher) {
  return new Promise(async (resolve, reject) => {
    new Voucher({
      name: voucher.name,
      id: voucher.id,
      code: voucher.code,
      price: voucher.price
    })
      .save()
      .then(voucher => {
        resolve(voucher);
      })
  })
}