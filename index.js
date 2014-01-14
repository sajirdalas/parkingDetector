var port = 8080;
var express = require('express');
var app = express();

app.use(express.bodyParser());

var server = require('./server');
server.StartSever(app,express);

app.listen(port);
console.log('Listening on port '+port);