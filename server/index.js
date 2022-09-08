const express = require("express");
const cors = require("cors");
const path = require('path')
const app = express();
 const {paintings, profileDetails} = require('./data')
app.use(cors());

app.use(express.json());

app.get('/', function(req,res) {
    res.sendFile(path.join(__dirname, '../public/index.html'));
    // rollbar.log("Accessed HTML successfully")
});

app.get('/mypaintings.html', function(req,res) {
  res.sendFile(path.join(__dirname, '../public/mypaintings.html'));
  // rollbar.log("Accessed HTML successfully")
});

app.get('/index.css', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/index.css'))
    // rollbar.log("Accessed css successfully")
  })

app.get('/main.js', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/main.js'))
    // rollbar.log("Accessed js file successfully")
  })


  app.get('/myPaintings.js', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/myPaintings.js'))
    // rollbar.log("Accessed js file successfully")
  })

const {getPaintings, getProfileDetails } = require('./controller');

app.get("/api/profileDetails", getProfileDetails);
app.get("/api/paintings", getPaintings);



app.listen(4000, () => console.log("Server running on 4000"));
