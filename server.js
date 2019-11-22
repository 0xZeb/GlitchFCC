'use strict';

var express = require('express');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


var cors = require('cors');

var app = express();

// Basic Configuration 
var port = process.env.PORT || 3000;

/** this project needs a db !! **/ 
// mongoose.connect(process.env.MONGOLAB_URI);
mongoose.connect(process.env.MONGO_URI, { 
      useUnifiedTopology: true, 
      useNewUrlParser: true });

console.log("readyState " + mongoose.connection.readyState);
/* codes for mongoose.connection.readyState~~
0: disconnected
1: connected
2: connecting
3: disconnecting
*/

app.use(cors());


/** this project needs to parse POST bodies **/
// you should mount the body-parser here
app.use(bodyParser.urlencoded({extended: false})); 

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(req, res){
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post("/api/shorturl/new", (req, res) => {
  console.log(req.body);
});

/*

*/
var URLshrinkerSchema = new mongoose.Schema({
  url: String 
});

var LongURL = mongoose.model('LongURL', URLshrinkerSchema);

var createAndSaveURL = function(URL, done){
  var createdURL = new  LongURL({url: URL});
  
  createAndSaveURL.save(function(err, data){
    if(err) return console.error(err);
    done(null, data);
  })
}







app.listen(port, function () {
  console.log('Node.js listening ...');
});



