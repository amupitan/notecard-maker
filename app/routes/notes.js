var express = require('express');
var router =express.Router();

router.get('/notes', function(request, response){

	response.render('notes', {
			// questionTag: ${questions},
			// questionObj: quest,
			aa: 'aa'
	});

  // response.render('notes');
});

module.export = router;
