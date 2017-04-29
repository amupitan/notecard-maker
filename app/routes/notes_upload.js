const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const NoteParser = require('../parser');
const User = require("../../models/users.js");

const router = express.Router();
const filePath = "./app/data/note.txt";
router.use(bodyParser.urlencoded({
  extended: true
}));
router.use(bodyParser.json());
router.use(fileUpload());

router.post('/notes_upload', function(req, res) {
  if (!req.session.username)
    return res.redirect('/login?error=true&after=' + encodeURIComponent('/create'));
  if (!req.files)
    return res.status(400).send('No files were uploaded.');
  let noteFile = req.files.noteFile;
  noteFile.mv("./app/data/note.txt", function(err) {
    if (err)
      return res.status(500).send(err); //TODO: sending user error
    fs.readFile(filePath, 'UTF-8', (err, data) => {
        if (err) console.error(err);
        var np = new NoteParser(data);
         np.parseMeta();
         np.parseNotes();
         np.makeNoteCards(true, true, true, false);
         User.getUser(req.session.username, (err, user) => {
           if (err) console.error(err);
           user.addNotes(Object.assign({cards: np.cards, note : np.note, lines : np.lines}), (err, notes) => {
             if (err) console.error(err);
           }); //user can be undefined only if the user was removed from the database after the user logged in (deleted their account)
         });
    });
    res.redirect("/notes"); //display stub for new note if it doesn't display yet
  });
});

module.exports = router;