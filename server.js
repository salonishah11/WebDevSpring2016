var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');

var app = express();

// app.get('/hello', function(){
//     console.log("hello");
// });

app.use(express.static(__dirname + '/public'));

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

require("./public/assignment/server/app.js")(app);

app.listen(port, ipaddress);