const express = require('express');
const path = require('path');
const cookieSession = require('cookie-session');
const keys = require('./config/keys');
const passport = require('passport');
const mongoose = require('mongoose');
const cors = require('cors');


// Initialize express application
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
  // serve production assets
  app.use(express.static('client'))
  
  // serve index.html file if path is not recongnized
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'index.html'));
  })
} else {
    app.use(express.static('client'))
    app.get('/', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'index.html'));
    })
}


require('./models/Voucher');
require('./models/User');
// require authentication routing handler
// and plug into express app instance
require('./routes/authRoutes')(app);
require('./routes/voucherRoutes')(app);
require('./services/passport');

// Serve app {PORT} depending on the environment
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Server running on port: ', PORT));