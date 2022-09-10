require('dotenv').config()
const express = require("express");
const cors = require("cors");
const path = require('path')
const app = express();
const {SERVER_PORT} = process.env
const {seed} = require('./seed.js') 
app.use(cors());

app.use(express.json());

app.post('/seed', seed)

app.get('/', function(req,res) {
    res.sendFile(path.join(__dirname, '../public/index.html'));
    // rollbar.log("Accessed HTML successfully")
});

app.get('/mypaintings.html', function(req,res) {
  res.sendFile(path.join(__dirname, '../public/myPaintings.html'));
  // rollbar.log("Accessed HTML successfully")
});

app.get('/addpainting.html', function(req,res) {
  res.sendFile(path.join(__dirname, '../public/addPainting.html'));
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


  app.get('/mypaintings.js', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/myPaintings.js'))
    // rollbar.log("Accessed js file successfully")
  })

  app.get('/addpainting.js', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/addPainting.js'))
    // rollbar.log("Accessed js file successfully")
  })

const {getPaintings, getProfileDetails, addPainting, updatePainting, deletePainting, getPaintingById } = require('./controller');

app.get("/api/profileDetails", getProfileDetails);
app.get("/api/paintings", getPaintings);
app.post("/api/painting", addPainting);
app.put("/api/painting/:id", updatePainting); 
app.delete("/api/painting/:id", deletePainting); 
app.get("/api/painting/:id", getPaintingById);


app.listen(4000, () => console.log("Server running on 4000"));
