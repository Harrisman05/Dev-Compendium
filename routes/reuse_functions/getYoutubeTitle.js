const fetch = require('node-fetch');

async function getYoutubeTitle(vidurl) {
    
    const fetch_url = await fetch(`https://noembed.com/embed?dataType=json&url=${vidurl}`);
    const fetch_url_json = await fetch_url.json();
    const fetch_url_title = fetch_url_json.title;
    
    return fetch_url_title;
}

module.exports = getYoutubeTitle;