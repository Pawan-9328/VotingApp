const express = require('express');
const app = express();
require('dotenv').config();
const db = require('./db.js');

const bodyParser = require("body-parser");
app.use(bodyParser.json()); // req body 
const PORT = process.env.PORT || 3000;

//Improt the router files...

const userRoutes = require('./routes/userRoutes.js');

app.use('/user', userRoutes);



app.listen(PORT, () =>{
      console.log('Listening on port 3000');

      
})





