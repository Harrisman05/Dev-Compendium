const mongoose = require('mongoose');
const path = require('path');
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

noteSchema.virtual('fullImagePath').get(function () {
    if (this.imageName != null) {
        return path.join('/', imagesBasePath, this.imageName)
    }
})



module.exports = mongoose.model('Note', noteSchema); // Note is name of table, noteSchema defines the table
module.exports.imagesBasePath = imagesBasePath;
