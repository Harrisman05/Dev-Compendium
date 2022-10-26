// Dependencies

const express = require('express');
const router = express.Router();
const path = require('path'); // path needed to direct strava to env file
const dotenv = require('dotenv').config({
    path: path.resolve(__dirname, '../.env') // file couldn't find environment variables
});
const fetch = require("node-fetch"); // imported old version of node fetch so require statement could be used

// Middleware to change layout view

router.use((req, res, next) => {
    // Change layout for strava page
    req.app.set('layout', 'layouts/strava');
    next();
})

// Routes

router.get("/", async (req, res) => {
    console.log("Get request received from strava resource");
    const strava_data = await getStravaData();

    res.render("strava_index", {strava_data: strava_data});
});

async function getStravaData() {

    const auth_link = 'https://www.strava.com/oauth/token'

    const getRefreshToken = await fetch(auth_link, {
        method: 'post',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },

        body: JSON.stringify({
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            refresh_token: process.env.REFRESH_TOKEN,
            grant_type: 'refresh_token'
        })
    });

    const resToJson = await getRefreshToken.json()
    const access_token = await resToJson.access_token;

    const activities_link = `https://www.strava.com/api/v3/athlete/activities?access_token=${access_token}`;

    const activities = await fetch(activities_link);
    
    const activitiesToJson = await activities.json();

    const sjpRuns = activitiesToJson.filter((data_object) => {
        return data_object.name.startsWith("SJP");
    });

    console.log(sjpRuns);
    const average_speed = sjpRuns[0].average_speed;
    const distance = sjpRuns[0].distance;
    const moving_time = sjpRuns[0].moving_time;
    const max_speed = sjpRuns[0].max_speed;
    const date = sjpRuns[0].start_date;

    console.log(`
    Average Speed (m/s) - ${average_speed}
    Distance (m) - ${distance}
    Moving Time (s) - ${moving_time}   
    Max Speed (m/s) - ${max_speed}
    Date - ${date}
    `);

    return {average_speed, distance, moving_time, max_speed, date};
}

module.exports = router;

