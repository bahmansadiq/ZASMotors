// =======================
// get the packages we need ============
// =======================
var express     = require('express');
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');
var passport    = require('passport'); 
var Customer    = require('./app-server/models/customer.js'); // get our mongoose model
var Inventory   = require('./app-server/models/inventory.js'); // get our mongoose model
var Dealer      = require('./app-server/models/dealer.js');
var Users		= require('./app-server/models/user.js');
var router   = require("./app-server/routes/routes"); 
var app         = express();
var path = require('path');
var jwt         = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config      = require('./app-server/config/main'); // get our config file

// Enable CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    next();
});
   
// =======================
// configuration =========
// =======================
// use morgan to log requests to the console
app.use(morgan('dev'));
mongoose.connect(config.database); // connect to database
app.set('superSecret', config.secret); // secret variable
///added for heroku

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Initialize passport for use
app.use(passport.initialize());  

app.use(express.static(__dirname));
app.use("/api", router);  


module.exports=app;
// =======================
// start the server ======
// =======================
app.listen(config.port);
console.log("you server is running on port "+ config.port+".");