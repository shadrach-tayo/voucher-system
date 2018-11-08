const express = require('express');
const path = require('path');
const cookieSession = require('cookie-session');
const keys = require('./config/keys');
const passport = require('passport');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
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
app.use(bodyParser.json())


app.use(express.static(path.join(__dirname, 'client/public', 'index.html')))

app.get('/', (req, res) => {
  res.send('<h1>Welcome to Voucher system</h1>')
}); 

// require authentication routing handler
// and plug into express app instance
require('./routes/authRoutes')(app);
require('./models/Voucher');
require('./routes/voucherRoutes')(app);
require('./models/User');
require('./services/passport');

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Server running on port: ', PORT));