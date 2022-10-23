const express = require('express');
const router = express.Router();
const Note = require('../model/note');

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


    const created_note = new Note({
        title: req.body.title,
        content: req.body.content,
        date: new Date(),
        imageName: fileName
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
        deleted_note = await Note.findByIdAndRemove(req.params.id);
        res.redirect('/');
    } catch {
        console.log("Error");
        res.redirect('/');
    }

});


module.exports = router;