// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/timestamp/", (req, res)=> {
  var utcTime = Date();
  res.json({ unix: Date(), utc: utcTime });  
})

app.get("/api/timestamp/:date_string?", (req, res) => {
  var timeString = req.params.date_string;
  //operate on timeString for validation
  
  var validInput = new RegExp(/\d{5,}/);
  
  if(validInput.test(timeString)){
    var dateInt = parseInt(timeString);
    res.json({unix: timeString, utc: new Date(dateInt).toUTCString()})
  }
  
  let dateObj = new Date(timeString);
  
  if(!dateObj.toString() === "Invalid Date"){
    res.json({unix: timeString, utc: dateObj.toUTCString()});
  } else {
    res.json({error: "Invalid Date"});      
  }
  
  
  
})



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});