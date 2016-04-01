var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var session = require('express-session');
var mongoose = require('mongoose');


var connectionString = 'mongodb://localhost/webdev2016';

// use remote connection string
// if running in remote server
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME;

    // connectionString = 'mongodb://$OPENSHIFT_MONGODB_DB_HOST:$OPENSHIFT_MONGODB_DB_PORT/';
}

// connect to the database
var db = mongoose.connect(connectionString);

var app = express();

// app.get('/hello', function(req,res){
//     res.send("<h1>hello</h1>>");
// });

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
multer();
app.use(session({
    secret: "Tyro is my secret! Are you kidding me! Lol NO!",
    resave : true,
    saveUninitialized: true
}));

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

require("./public/assignment/server/app.js")(app, db, mongoose);
require("./public/project/server/app.js")(app);

app.listen(port, ipaddress);