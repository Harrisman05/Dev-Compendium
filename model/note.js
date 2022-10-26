const mongoose = require('mongoose');
const imagesBasePath = 'assets/images'

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    imageName: {
        type: String
    }
});

module.exports = mongoose.model('Note', noteSchema); // Note is name of table, noteSchema defines the table
module.exports.imagesBasePath = imagesBasePath;
