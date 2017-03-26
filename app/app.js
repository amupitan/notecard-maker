var express = require('express');
var reload = require('reload');
var app = express();
var dataFile = require('./data/notes.json');

app.set('port', process.env.PORT || 3000);
app.set('appData', dataFile); //Making dataFile available to all the other files
app.set('view engine', 'ejs');
app.set('views','app/views');

app.use(express.static('app/public'));
// app.use(require('./routes/index'));
// app.use(require('./routes/notes'));

app.get('/',function(request,response){
    response.render('index');
});

app.get('/notes', function(request,response){
  response.render('notes');
})



var server = app.listen(app.get('port'), function(){ //Port listening to, and callback
  console.log('Listening to port ' + app.get('port'));
});

reload(server,app);
