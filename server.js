// Instiantiate server

const express = require('express');
app = express();
const expressLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');

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
const dotenv = require('dotenv').config();

const uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@digitalnotebookcluster.shhmcpj.mongodb.net/?retryWrites=true&w=majority`

async function connect() {
    try {
        await mongoose.connect(uri);
        console.log('Connected to MongoDB Cluster');
    } catch (error) {
        console.error(error);
    }
}

connect();

// ALlow server to listen to requests from client

app.listen(process.env.PORT || 3500, () => {
    console.log(`Listening on PORT 3500 or ${process.env.PORT}...`);
});

