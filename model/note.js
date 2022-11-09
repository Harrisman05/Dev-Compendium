const mongoose = require('mongoose');
const imagesBasePath = 'assets/images';
let { marked } = require('marked');
const createDomPurify = require('dompurify');
const { JSDOM } = require('jsdom');
const dompurify = createDomPurify(new JSDOM().window);

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    sanitised_content: {
        type: String,
        required: true
    },
    youtube_video_url: {
        type: String
    },
    youtube_video_title: {
        type: String,
        default: "No Youtube Video URL Provided"
    },
    date: {
        type: Date,
        required: true
    },
    imageName: {
        type: String
    }
});

// Need to sanitise incoming HTML so no malicious code is run. Content sent from user is validated using middleware function below, sanitised then rendered as HTML on the clientside

noteSchema.pre('validate', function(next) {
    if (this.content) {
        this.sanitised_content = dompurify.sanitize(marked.parse(this.content));
    }
    next();
});

// https://www.youtube.com/watch?v=1NrHkjlWVhM&t=2452s&ab_channel=WebDevSimplified


module.exports = mongoose.model('Note', noteSchema); // Note is name of table, noteSchema defines the table
module.exports.imagesBasePath = imagesBasePath;
