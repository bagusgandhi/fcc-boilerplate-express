/******************************************************
 * PLEASE DO NOT EDIT THIS FILE
 * the verification process may break
 * ***************************************************/
 
var bGround = require('fcc-express-bground');
var myApp = require('./myApp');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var myPath = __dirname + '/views/index.html';
var response = "Hello json".toUpperCase();

app.use('/public', express.static(__dirname + "/public"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function(req, res){
  res.sendFile(myPath);
});

app.get('/:word/echo', (req, res) => {
  // res.params();
  res.json({"echo": req.params.word});
});

app.get('/name', (req, res) => {
  let { first: firstName, last: lastName } = req.query;
  res.json({
    "name":`${firstName} ${lastName}`
  })
});


app.get(
  "/now",
  (req, res, next) => {
    req.time = new Date().toString();
    next();
  },
  (req, res) => {
    res.send({
      time: req.time
    });
  }
);

if (!process.env.DISABLE_XORIGIN) {
  app.use(function(req, res, next) {
    var allowedOrigins = ['https://narrow-plane.gomix.me', 'https://www.freecodecamp.com'];
    var origin = req.headers.origin || '*';
    if(!process.env.XORIG_RESTRICT || allowedOrigins.indexOf(origin) > -1){
         console.log(origin);
         res.setHeader('Access-Control-Allow-Origin', origin);
         res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    }
    next();
  });
}



var port = process.env.PORT || 3000;
bGround.setupBackgroundApp(app, myApp, __dirname).listen(port, function(){
  bGround.log('Node is listening on port '+ port + '...')
});

/******************************************************
 * PLEASE DO NOT EDIT THIS FILE
 * the verification process may break
 * ***************************************************/

