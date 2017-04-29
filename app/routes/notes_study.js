const express = require('express');
const router = express.Router();

router.get('/notes_study', function(req, res){
  if (req.session.username){
    res.render('notes_study', {
			pageTitle:"Study",
			loggedIn : req.session.username,
	  });
  }else if(!req.session.username)
      return res.redirect('/login?error=true&after=' + encodeURIComponent(req.originalUrl));
  });

module.exports = router;
