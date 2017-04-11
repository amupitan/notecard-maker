var express = require('express');
var router =express.Router();

router.get('/notes_study', function(request, response){
	// app.get('/notes', function(request,response){
	//   // console.log(request);
	//   response.render('notes');
	// });
	response.render('notes_study', {
			// questionTag: ${questions},
			// questionObj: quest,
			pageTitle:"Study"
	});

  // response.render('notes');
});

module.exports = router;
