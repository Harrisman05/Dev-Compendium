// Instiantiate server

const express = require('express');
app = express();

// Set ejs view engine and set-up views folder

app.set('view engine', 'ejs'); // allows usage of ejs in views
app.set('views', __dirname + '/views'); // tells server where views folder is

// Import routers

const indexRouter = require('./routes/index');

// Mount routers to roots/resources

app.use("/", indexRouter);


// ALlow server to listen to requests from client

app.listen((3500), () => {
    console.log("Listening on PORT 3500...");
});

