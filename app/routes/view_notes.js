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
  User.getUser(req.session.username, (err, user) => {
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
});

router.get('/notes/note/:nid', (req, res) => {
  Note.getNote(req.params.nid, (err, note) => {
    if (err) console.error(err);
    if ((err && err.name === 'CastError') || (note.owner.username !== req.session.username)){
      return res.status(400).send("Hmm! We can't find that note. You can double check the url");
    }
    if (req.query.course === 'true') {
      res.json(note.course);
    }else if (req.query.cards === 'true'){
      res.json(note.cards); 
    }else{
      res.render('notes_select', {
  			pageTitle:`Select | ${note.title}`,
  			card_url : " ",
  			loggedIn : req.session.username,
  	  });
    }
  });
});

module.exports = router;