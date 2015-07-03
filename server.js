var express = require("express");
var AV = require('leanengine');
var expressWs = require('express-ws');

// init LeanEngine
var PORT = parseInt(process.env.LC_APP_PORT || 3000);
var APP_ID = process.env.LC_APP_ID;
var APP_KEY = process.env.LC_APP_KEY;
var MASTER_KEY = process.env.LC_APP_MASTER_KEY;
AV.initialize(APP_ID, APP_KEY, MASTER_KEY);

// init websocket
var app = express();
expressWs(app);
app.set('view engine', 'ejs');  
app.use(AV.Cloud);

app.get('/', function(req, res) {
  res.render('index');
});

app.ws('/echo', function(ws, req) {
  ws.on('message', function(msg) {
    ws.send(msg);
  });
});
app.listen(PORT);
