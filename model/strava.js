const mongoose = require('mongoose');

const stravaSchema = new mongoose.Schema({
    upload_id: {
        type: String,
        required: true
    },
    average_speed: {
        type: String,
        required: true
    },
    distance: {
        type: String,
        required: true
    },
    moving_time: {
        type: String,
        required: true
    },
    max_speed: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('Strava', stravaSchema); // Strava is name of table, StravaSchema defines the table