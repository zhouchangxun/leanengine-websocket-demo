var express = require("express");
var cloud = require('leanengine').Cloud;

var app = express();
require('express-ws')(app);
app.set('view engine', 'ejs');  
app.use(cloud);

app.get('/', function(req, res) {
  res.render('index');
});

app.ws('/echo', function(ws, req) {
  ws.on('message', function(msg) {
    ws.send(msg);
  });
});

var PORT = parseInt(process.env.LC_APP_PORT || 3000);
app.listen(PORT);
