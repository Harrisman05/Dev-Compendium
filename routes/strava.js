// Dependencies

const express = require('express');
const router = express.Router();
const StravaActivity = require('../model/strava');
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
    
    const strava_db = await StravaActivity.find({});
    const strava_api_data = await getStravaData();

    for (const run of strava_api_data) {

        const doesRunExist = await StravaActivity.exists({upload_id: run.upload_id});
        console.log(doesRunExist);

        if (doesRunExist) {
            console.log("Run already exists, don't save");
        } else {
            console.log("Run doesn't exist, save run");

            const new_run = new StravaActivity({
                upload_id: run.upload_id,
                average_speed: run.average_speed,
                distance: run.distance,
                moving_time: run.moving_time,
                max_speed: run.max_speed,
                date: run.date
            });

            try {
                const save_new_run = await new_run.save();
            } catch {
                console.log("Error saving a new run!");
            }
            
        }
    }   

    res.render("strava_index", {strava_db: strava_db});
});

// Delete all data in strave db

router.delete('/delete', async (req, res) => {
    console.log("Delete request sent from client on Strava Page");

    const delete_all_activies = await StravaActivity.deleteMany({});

    res.redirect('/strava');
})

// Get Strava Data API call

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

    return transformStravaData(activitiesToJson);

}

// Extract relevant Strava Data

function transformStravaData(allActivities) {

    const sjpAllData = allActivities.filter((data_object) => {
        return data_object.name.startsWith("SJP");
    });

    // console.log(sjpAllData);

    sjpExtractedData = sjpAllData.map((run_object) => {

        const upload_id = run_object.upload_id;
        const average_speed = run_object.average_speed;
        const distance = run_object.distance;
        const moving_time = run_object.moving_time;
        const max_speed = run_object.max_speed;
        const date = new Date(run_object.start_date);

        return {            
            upload_id,
            average_speed,
            distance,
            moving_time,
            max_speed,
            date
        }
    });

    console.log(sjpExtractedData);

    return sjpExtractedData;
}

module.exports = router;

