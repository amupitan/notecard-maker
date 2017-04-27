const express = require('express');
const User = require("../../models/users.js");
const Note = require("../../models/notes.js");

const router = express.Router();

router.all(/(^(\/notes)\/?$)|(\/notes\/)/, (req, res, next) => { //matches: /notes, /notes/, /notes/*
  if (!req.session.username)
    return res.redirect('/login?error=true&after=' + encodeURIComponent(req.originalUrl));
  else
    next();
});

router.get('/notes', (req, res) => {
  if (req.session.username){
    // let note_arr = [];
    User.getUser(req.session.username, (err, user) => { //TODO: change this to get notes from Note not User. $where owner == username
      if (err) console.error(err);
      user.getNotes((err, notes) => {
        if (err) console.error(err);
        res.render('view_notes', {
          username: req.session.username,
        	pageTitle: `Notes`,
          notes : notes,
          loggedIn : req.session.username,
        });
      });
    });
  }else{
    res.redirect('/login'); //TODO: pull the else render from notes_study. Put it in appData to avoid duplication of code
  }
});

router.get('/notes/note/:nid', (req, res) => { //TODO: actually render note page
  Note.getNote(req.params.nid, (err, note) => {
    if (err) console.error(err);
    res.end(
    `Note Title: ${note.title}
     Note Date: ${note.date}
     Note Course: ${note.course}`
           );
  });
  
});

module.exports = router;