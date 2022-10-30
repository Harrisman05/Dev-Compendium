const express = require('express');
const router = express.Router();
const Note = require('../model/note');
const getYoutubeTitle = require('./reuse_functions/getYoutubeTitle');
const deleteImage = require('./reuse_functions/deleteImage');

// Imports for images

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
})

// Routes

router.get('/', async (req, res) => {
    console.log("Get request sent from client to root directory");

    const allNotes = await Note.find({});
    res.render('index', {
        text: "res.render sent back from server",
        allNotes: allNotes // sending allNotes to client, rendered in ejs file
    });
});

router.post('/', upload.single('input_file'), async (req, res) => {

    const fileName = req.file != null ? req.file.filename : null;
    
    let youtube_title;
    if (req.body.youtube_video_url) {
        youtube_title = await getYoutubeTitle(req.body.youtube_video_url); 
    }

    const created_note = new Note({
        title: req.body.title,
        content: req.body.content,
        imageName: fileName,
        youtube_video_url: req.body.youtube_video_url,
        youtube_video_title: youtube_title,
        date: new Date(),
    });

    console.log(created_note);
    
    try {
        const saveNote = await created_note.save();
        res.redirect('/');
    } catch {
        const allNotes = await Note.find({});
        res.render('index', {
            error: 'Error creating Note',
            allNotes: allNotes
        })
    }
});

// :id needed as a different note id is sent back to server each time, depending on which note the user wants to delete

router.delete("/:id", async (req, res) => { 
    console.log("Delete request sent from client");
    let deleted_note;
    try {
        const findNote = await Note.findById(req.params.id);
        console.log(findNote);
        
        if (findNote.imageName != null) { // if note has image, delete image from assets folder
            deleteImage(findNote.imageName);
        }

        // after imageName is used to delete image, then delete from db

        deleted_note = await Note.findByIdAndRemove(req.params.id);

        res.redirect('/');
    } catch {
        console.log("Error");
        res.redirect('/');
    }

});

module.exports = router;
