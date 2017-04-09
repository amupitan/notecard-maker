var express = require('express');
var router =express.Router();

router.get('/signup', function(request, response){
	response.render('signup', {
			pageTitle:"Sign up"
	});
});

module.exports = router;
