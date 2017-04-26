var express = require('express');
var router =express.Router();

router.get('/notes_select', function(req, res){
	res.render('notes_select', {
			pageTitle:"Select",
			loggedIn : req.session.username,
	});
});

module.exports = router;
