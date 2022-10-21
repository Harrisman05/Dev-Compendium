const express = require('express');
const router = express.Router();
const Note = require('../model/note');

router.route('/')
    .get( async (req, res) => {

        console.log("Get request sent from client to root directory");

        const allNotes = await Note.find({});
        res.render('index', {
            text: "res.render sent back from server",
            allNotes: allNotes // sending allNotes to client, rendered in ejs file
        });

    })
    .post(async (req, res) => {
        console.log("Post request sent from client");
        console.log(req.body);

        const created_note = new Note({
            title: req.body.title,
            content: req.body.content,
            date: new Date()
        });


        try {
            const saveNote = await created_note.save();
            res.redirect('/');
        } catch {
            res.render('/', {
                error: 'Error creating Note'
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
        res.render()
    }

});


module.exports = router;