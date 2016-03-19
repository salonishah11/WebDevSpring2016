var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// app.get('/hello', function(req,res){
//     res.send("<h1>hello</h1>>");
// });

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

require("./public/assignment/server/app.js")(app);

app.listen(port, ipaddress);