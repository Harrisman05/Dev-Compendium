const Note = require('../../model/note');
const fs = require("fs");
const path = require('path');
const uploadPath = path.join('public', Note.imagesBasePath)

function deleteImage(imageName) {
    fs.unlink(path.join(uploadPath, imageName), err => {
        if (err) console.error(err);
    });
}

module.exports = deleteImage;