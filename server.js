// Instiantiate server

const express = require('express');
app = express();

// allow express to accept form data

app.use(express.urlencoded({ extended: true })); 

// Set ejs view engine and set-up views folder

app.set('view engine', 'ejs'); // allows usage of ejs in views
app.set('views', __dirname + '/views'); // tells server where views folder is

// Import routers

const indexRouter = require('./routes/index');
const show_dataRouter = require('./routes/show_data');

// Mount routers to roots/resources

app.use("/", indexRouter);
app.use("/show_data", show_dataRouter)

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

