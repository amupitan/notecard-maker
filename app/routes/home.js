const express = require('express');

const router = express.Router();

router.get('/home', function(req, res){
  if (req.session.username === undefined) 
    return res.redirect('/login?error=true&after=' + encodeURIComponent(req.originalUrl));
  else{
    res.render('home', {
      username: req.session.username,
    	fullName: req.session.fullName,
      loggedIn : req.session.username,
    });
  }
});

module.exports = router;
