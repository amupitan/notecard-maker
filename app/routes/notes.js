var express = require('express');
var router =express.Router();

router.get('/notes', function(request, response){
	// app.get('/notes', function(request,response){
	//   // console.log(request);
	//   response.render('notes');
	// });
	response.render('notes', {
			// questionTag: ${questions},
			// questionObj: quest,
			aa: 'aa'
	});

  // response.render('notes');
});

module.exports = router;
