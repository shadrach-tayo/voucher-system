const express = require('express');
const path = require('path');
const cookieSession = require('cookie-session');
const keys = require('./config/keys');
const passport = require('passport');
const mongoose = require('mongoose');
const cors = require('cors');
// const https = require('https');
// const fs = require('fs')

// let server
const app = express();

// connect mongoose to our mongodb instance
mongoose.connect(keys.mongoURI);

app.use(cors());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
  );
  app.use(passport.initialize());
  app.use(passport.session());
  
  // parse application/json
  app.use(express.json())
  
if(process.env.NODE_ENV === 'production') {
  // server = https.createServer(app);
  // serve production assets
  app.use(express.static('client/build'))

  // serve index.html file if path is not recongnized
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
} else {
  app.use(express.static(path.join(__dirname, 'client/public', 'index.html')))
  // const httpsOptions = {
  //   cert: fs.readFileSync(path.join(__dirname, 'ssl', 'server.crt')),
  //   key: fs.readFileSync(path.join(__dirname, 'ssl', 'server.key'))
  // }
  // server = https.createServer(httpsOptions, app);
}


app.get('/', (req, res) => {
  res.send('<h1>Welcome to Voucher system</h1>')
}); 

// require authentication routing handler
// and plug into express app instance
require('./models/Voucher');
require('./models/BoughtVoucher');
require('./models/User');
require('./routes/authRoutes')(app);
require('./routes/voucherRoutes')(app);
require('./services/passport');

console.log(process.env.NODE_ENV);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Server running on port: ', PORT));