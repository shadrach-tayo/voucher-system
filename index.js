const express = require("express");
const path = require("path");
const cookieSession = require("cookie-session");
const keys = require("./config/keys");
const passport = require("passport");
const mongoose = require("mongoose");
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const cors = require("cors");

// Initialize express application
const app = express();

// connect mongoose to our mongodb instance
mongoose.connect(keys.mongoURI);
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'))

app.use(session({
  secret: keys.cookieKey,
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db
  })
}))
app.use(cors());
// app.use(
//   cookieSession({
//     maxAge: 30 * 24 * 60 * 60 * 1000,
//     keys: [keys.cookieKey]
//   })
// );
app.use(passport.initialize());
app.use(passport.session());  
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if(process.env.NODE_ENV === 'production') {
  console.log('production')
    
  app.use(express.static(path.join(__dirname, "client")));

  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "client", "index.html"));
  });
} else {
    app.get('/', (req, res) => {
      res.send('welcome to bezop')
    })
}

require("./models/Voucher");
require("./models/User");
require("./routes/authRoutes")(app);
require("./routes/voucherRoutes")(app);
require("./services/passport");


// Serve app {PORT} depending on the environment
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on port: ", PORT));
