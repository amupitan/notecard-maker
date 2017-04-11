var express = require('express');
var router =express.Router();

router.get('/notes_select', function(request, response){
	response.render('notes_select', {
			pageTitle:"Select"
	});
});

module.exports = router;
