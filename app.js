const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

// Connect To Database
mongoose.connect(config.database);

// On Connection
mongoose.connection.on('connected', () => {
  console.log('Connected to database '+config.database);
});

// On Error
mongoose.connection.on('error', (err) => {
  console.log('Database error: '+err);
});

//Initialize Express
const app = express();
const users = require('./routes/users');

// Port Number
const port = 3001;

// CORS Middleware
// If we need to make an specific access from a url, we can change this
// using the npm specifications
//app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

app.use('/users', users);

// Index Route
app.get('/', (req, res) =>{
  res.send('Invalid Endpoint');
});

// Second Chance
//app.get('*', (req, res) => {
   //res.sendFile(path.join(__dirname, 'public/index.html'));
//});﻿

// Start Server
app.listen(port, () => {
  console.log('Server started on port '+port);
});
