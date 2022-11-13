const express = require('express');
const router = express.Router();
const Note = require('../model/note');
const deleteImage = require('./reuse_functions/deleteImage');

// delete image function + dependencies for uploading a file

const multer = require('multer');
const storage = multer.memoryStorage();
const uploads = multer({ storage });
const processImage = require('./reuse_functions/processImage');

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

router.put("/:id", uploads.single('update_file'), async (req, res) => {

    console.log("Put request sent from client");
    
    const edited_title = req.body.edited_title;
    const edited_content = req.body.edited_content;
    
    try { 

        // get original note from database
        const preUpdateNote = await Note.findById(req.params.id);

        // Title, content, youtube url, image will only change if a value is submitted by client

        if (edited_title) {
            preUpdateNote.title = edited_title;
        }
        if (edited_content) {
            preUpdateNote.content = edited_content;
        }
        
        let image_name;
        if (req.file) { // if client submits an image for updating
            if (preUpdateNote.imageName) { // if there is a current image
                deleteImage(preUpdateNote.imageName); // delete current image 
            }
            image_name = await processImage(req.file); // process new image
            preUpdateNote.imageName = image_name; // replace image name in db
        }

        preUpdateNote.date = new Date();

        console.log(preUpdateNote);
        

        await preUpdateNote.save();
        res.redirect("/");

    } catch 
    {
        console.error("Error updating database");
        res.redirect("/");
    }

});

module.exports = router;
