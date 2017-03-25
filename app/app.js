var express = require('express');
var reload = require('reload');
var app = express();
var dataFile = require('./data/notes.json');

app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views','app/views');

app.get('/',function(request,response){
    response.render('index');
});

app.get('/notes', function(request, response){
  // dataFile.
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
  response.send(
    `
    ${questions}
    `
  );
});

var server = app.listen(app.get('port'), function(){ //Port listening to, and callback
  console.log('Listening to port ' + app.get('port'));
});

reload(server,app);
