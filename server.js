// Instiantiate server

const express = require('express');
app = express();
const expressLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');
const path = require('path');

// allow express to accept form data, and put/delete request from client

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method')); // allow server to use method override (+ query)

// Set ejs view engine and set-up views folder

app.set('view engine', 'ejs'); // allows usage of ejs in views
app.set('views', __dirname + '/views'); // tells server where views folder is
app.set('layout', 'layouts/layout'); 
app.use(expressLayouts);
app.use(express.static('public'));

// Import routers

const indexRouter = require('./routes/index');
const editRouter = require('./routes/edit');
const stravaRouter = require('./routes/strava');

// Mount routers to roots/resources

app.use("/", indexRouter);
app.use("/edit", editRouter);
app.use("/strava", stravaRouter);

// Connectiing to Mongoose Database

const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/dev_compendium_db", {
    useNewUrlParser: true
});

const db_connection = mongoose.connection; // Accessing connection variable
db_connection.on('error', error => console.error(error)); // If error 
db_connection.once('open', () => console.log('Connected to Mongoose')); // Confirming connection

// ALlow server to listen to requests from client

app.listen((3500), () => {
    console.log("Listening on PORT 3500...");
});

