

/* Strava API documentation is bad, and access token on website API profile doesn't work. Had to go about a roundabout way in order to access correct access token. 

https://www.youtube.com/watch?v=W_-Ai33_8f8&list=PLO6KswO64zVvcRyk0G0MAzh5oKMLb6rTW&index=3&ab_channel=franchyze923

Code below will generate correct access token as it expires. Refresh token never changes 

*/

// Dependencies

const path = require('path'); // path needed to direct strava to env file
const dotenv = require('dotenv').config({
    path: path.resolve(__dirname, '../.env') // file couldn't find environment variables
});
const fetch = require("node-fetch"); // imported old version of node fetch

// Authorisation Code

// const auth_link = 'https://www.strava.com/oauth/token'

// async function getActivities(access_token) {
//     const activities_link = `https://www.strava.com/api/v3/athlete/activities?access_token=${access_token}`

//     const activities = await fetch(activities_link)
    
//     const activitiesToJson = await activities.json();
    
//     console.log(activitiesToJson);
    
//     return activitiesToJson;
    
// }

// async function reAuthorise() {
//     const getRefreshToken = await fetch(auth_link, {
//         method: 'post',
//         headers: {
//             'Accept': 'application/json, text/plain, */*',
//             'Content-Type': 'application/json'
//         },

//         body: JSON.stringify({
//             client_id: process.env.CLIENT_ID,
//             client_secret: process.env.CLIENT_SECRET,
//             refresh_token: process.env.REFRESH_TOKEN,
//             grant_type: 'refresh_token'
//         })
//     });

//     const resToJson = await getRefreshToken.json()
//     const access_token = await resToJson.access_token;

//     await getActivities(access_token);
    
// }

// const strava_data = reAuthorise();

const vidurl = 'https://www.youtube.com/watch?v=G3Rpqopaot0&ab_channel=SkySportsFootball';

fetch(`https://noembed.com/embed?dataType=json&url=${vidurl}`)
  .then(res => res.json())
  .then(data => console.log('fetch', data.title))

// module.exports = strava_data;

/* 
https://www.strava.com/oauth/token?client_id=96055&client_secret=58247b5789f817200db3d76a0a860e224d3de98d&refresh_token=05b79007f37a3116b8c28e5e7c9f13645e643dd6&grant_type=refresh_token

*/