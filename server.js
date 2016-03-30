var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
// var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/webdev2016');

var app = express();

// app.get('/hello', function(req,res){
//     res.send("<h1>hello</h1>>");
// });

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(session({ secret: "Tyro" }));

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

require("./public/assignment/server/app.js")(app);
require("./public/project/server/app.js")(app);

app.listen(port, ipaddress);