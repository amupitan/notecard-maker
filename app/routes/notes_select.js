const express = require('express');
const router =express.Router();

router.get('/notes_select', function(req, res){
  if (!req.session.username)
    return res.redirect('/login?error=true&after=' + encodeURIComponent(req.originalUrl));
	res.render('notes_select', {
			pageTitle:"Select",
			loggedIn : req.session.username,
	});
});

module.exports = router;
