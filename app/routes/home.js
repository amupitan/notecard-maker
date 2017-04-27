const express = require('express');

const router = express.Router();

router.get('/home', function(req, res){
  if (req.session.username === undefined) 
    res.redirect("/login"); //TODO: pull the else render from notes_study. Put it in appData to avoid duplication of codd
  else{
    res.render('home', {
      username: req.session.username,
    	pageTitle: `Welcome `,
    	email: "email",
    	numnotes: 10,
      loggedIn : req.session.username,
    });
  }
});

module.exports = router;
