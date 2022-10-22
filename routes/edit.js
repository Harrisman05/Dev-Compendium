const express = require('express');
const router = express.Router();
const Note = require('../model/note');

router.get("/:id", async (req, res) => {

    const allNotes = await Note.find({});

    res.render('edit', {
        allNotes: allNotes,
        selected_note_id: req.params.id
    });
    
})

router.put("/:id", async (req, res) => {

    console.log("Put request sent from client");

    try {
        const selected_note = await Note.findById(req.params.id);
        selected_note.title = req.body.edited_title;
        selected_note.content = req.body.edited_content;
        selected_note.date = new Date();
        await selected_note.save();
        res.redirect("/");
    } catch {
        console.error("Error");
        res.redirect("/");
    }

});

module.exports = router;