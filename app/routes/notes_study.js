const express = require('express');
const router = express.Router();


router.get('/notes_study', function(req, res){
	res.render('notes_study', {
			pageTitle:"Study",
			loggedIn : req.session.username,
	});
});

module.exports = router;
