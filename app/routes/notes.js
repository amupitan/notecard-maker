var express = require('express');
var router =express.Router();

router.get('/notes', function(request, response){
	var dataFile = request.app.get('appData');

  console.log("data is " +dataFile.Notes.Subject);
  console.log("Questions are: " + dataFile.Notes.Questions);

  let quest = dataFile.Notes.Questions;
  var questions ="";
  console.log(quest);
  for(let i in quest){
    // console.log("Question: " + quest[i]);
    questions += `
      <p>${i}</p>
      <p>${quest[i]}</p>
    `
    console.log(i + " : " + quest[i]);
  }
  // response.send(
  //   `
  //   ${questions}
  //   `
  // );

	response.render('notes', {
			// questionTag: ${questions},
			// questionObj: quest,
			aa: 'aa'
	});

  // response.render('notes');
});

module.export = router;
