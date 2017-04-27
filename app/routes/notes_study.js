const express = require('express');
const router = express.Router();

router.get('/notes_study', function(req, res){
  if (req.session.username ){ //&& req.session.notes_arrays
    res.render('notes_study', {
			pageTitle:"Study",
			loggedIn : req.session.username,
	});
}else if(!req.session.username){
    return res.redirect('/login?error=true&after=' + encodeURIComponent(req.originalUrl));
  } else {
		res.render('notes_select', {
			pageTitle:"Select",
			loggedIn : req.session.username,
		});
	}
});

module.exports = router;
