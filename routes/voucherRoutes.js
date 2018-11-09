const mongoose = require('mongoose');

const Voucher = mongoose.model('vouchers');
const BoughtVoucher = mongoose.model('boughtvouchers');

module.exports = app => {
<<<<<<< HEAD
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
  
||||||| merged common ancestors
  // request to add vouchers to database
  app.post('/vouchers', (req, res) => {
    const voucher = req.body;
    console.log(voucher);
    if(!voucher) {
      res.send('no vouchers sent');
      return;
    }
    res.send(voucher);
  })
  
  app.post('/voucher', (req, res) => {
    const voucher = req.body;
    console.log(voucher); 
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
  });
  
  app.get('api/voucher', (req, res) => {
    res.send({message: "it's fucking working"});
    
  });

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
  
=======
  // request to add vouchers to database
  // app.post('/vouchers', (req, res) => {
  //   const voucher = req.body;
  //   console.log(voucher);
  //   if(!voucher) {
  //     res.send('no vouchers sent');
  //     return;
  //   }
  //   res.send(voucher);
  // })

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

  app.post('/voucher', (req, res) => {
    const voucher = req.body;
    console.log(voucher); 
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
  });
  
>>>>>>> 86564fe5963bff37e8ce2e092c1b873728a8bd2f
  app.get('/api/vouchers', async (req, res) => {
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

  app.put('/api/voucher', (req, res) => {
    const voucher = req.body;
    console.log(voucher); 
    if(!voucher) {
      res.status(500)
        .send('no vouchers sent');
      return;
    }
    saveUserVoucher(voucher).then((voucher) => {
      res.send(voucher);
    })
    .catch(err => res.send(err))
  });
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
<<<<<<< HEAD
||||||| merged common ancestors

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
=======

// function saveVouchersToDb(voucher) {
//   return new Promise(async (resolve, reject) => {
//     new Voucher({
//       name: voucher.name,
//       id: voucher.id,
//       code: voucher.code,
//       price: voucher.price
//     })
//       .save()
//       .then(voucher => {
//         resolve(voucher);
//       })
//   })
// }
>>>>>>> 86564fe5963bff37e8ce2e092c1b873728a8bd2f
