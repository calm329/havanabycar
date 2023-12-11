const express = require('express');
const cookieParser = require("cookie-parser");
const cors = require('cors');
const cookieSession = require('cookie-session'); //Handles Cookies
const mongo = require('./models/mongo.js');
const secrets = require('./secrets/secrets.js');
const api = require('./routes/api.js');
const admin = require('./routes/admin.js');
const frontNav = require('./routes/frontNav.js');
const {cj} = require('./cj.js');
const mw = require('./middleware/mw.js');

const app = express();
app.use(cookieParser());

// set the view engine to ejs
app.set('view engine', 'ejs');
// Set trust proxy to see IP addresses
app.set('trust proxy',true); 

app.use(cors());
app.use(express.json());
app.set('json spaces', 2);

//Protect Sensitive Data
app.use((req, res, next) => {
    // Implement your rules here
    if(
        req.url.includes('/CCS/') || 
        req.url.includes('/payments/')
    ) return mw.verify(req, res, next);
    next();
});

app.use('/static', express.static('static'));
app.use('/sitemap.xml', express.static('sitemap.xml'));

app.use(cookieSession({
	maxAge: 60 * 60 * 1000,
	keys: [secrets.secret]
}));

app.use(api.router);
app.use(admin.router);
app.use(frontNav.router);

mongo.connect(app); //Connects to Mongo
cj();
