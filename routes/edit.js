const express = require('express');
const router = express.Router();
const Note = require('../model/note');
const getYoutubeTitle = require('./reuse_functions/getYoutubeTitle');
const deleteImage = require('./reuse_functions/deleteImage');

// delete image function + dependencies for uploading a file

const imageMimeTypes = ['image/jpeg','image/png','image/gif']
const path = require('path');
const uploadPath = path.join('public', Note.imagesBasePath)
const multer = require('multer');
const upload = multer({
    dest: uploadPath,
    fileFilter: (req, file, callback) => {
        callback(null, imageMimeTypes.includes(file.mimetype));
    }
});

// Middleware - Ensure to reset layout

router.use((req, res, next) => {
    // Change layout for back to default layout page
    req.app.set('layout', 'layouts/layout');
    next();
});

// Routes

router.get("/:id", async (req, res) => {

    const allNotes = await Note.find({});
    
    res.render('edit', {
        allNotes: allNotes,
        selected_note_id: req.params.id
    });
    
})

router.put("/:id", upload.single('update_file'), async (req, res) => {

    console.log("Put request sent from client");

    const fileName = req.file != null ? req.file.filename : null;
    const edited_title = req.body.edited_title;
    const edited_content = req.body.edited_content;
    const edited_youtube_video_url = req.body.edited_youtube_video_url;
    console.log(edited_youtube_video_url);
    

    try { 

        // get original note from database
        const preUpdateNote = await Note.findById(req.params.id);

        // Title and content will only change if a value is submitted by client

        if (edited_title) {
            preUpdateNote.title = edited_title;
        }
        if (edited_content) {
            preUpdateNote.content = edited_content;
        }

        if (edited_youtube_video_url) {
            preUpdateNote.youtube_video_url = edited_youtube_video_url;
            preUpdateNote.youtube_video_title = await getYoutubeTitle(edited_youtube_video_url);
            console.log(preUpdateNote.youtube_video_title);
        }

        if (fileName) {
            if (preUpdateNote.imageName) { // if there is a current image
                deleteImage(preUpdateNote.imageName); // delete current image 
            }
            preUpdateNote.imageName = fileName; // replace image name in db
        }

        preUpdateNote.date = new Date();

        await preUpdateNote.save();
        res.redirect("/");

    } catch 
    {
        console.error("Error updating database");
        res.redirect("/");
    }

});

module.exports = router;
