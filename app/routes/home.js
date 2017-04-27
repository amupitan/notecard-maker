const express = require('express');

const router = express.Router();

router.get('/home', function(req, res){
  if (req.session.username === undefined) 
    res.redirect("/login");
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
