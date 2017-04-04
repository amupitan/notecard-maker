const express = require('express');
const reload = require('reload');
const app = express();
const fileUpload = require('express-fileupload');

var NoteParser = require('./parser');
const fs = require('fs');
var filePath = "./app/data/note.txt";

var dataFile = require('./data/notes.json');

app.set('port', process.env.PORT || 3000);
app.set('appData', dataFile); //Making dataFile available to all the other files
app.set('view engine', 'ejs');
app.set('views','app/views');


app.use(fileUpload());
app.use(express.static('app/public'));
// app.use(require('./routes/index'));
// app.use(require('./routes/notes'));

app.get('/',function(request,response){
  // console.log(request);
  response.render('index');
});

app.get('/notes', function(request,response){
  // console.log(request);
  response.render('notes');
});

app.get('/notecards', function(request,response){
  // console.log(request);
    fs.readFile(filePath, 'UTF-8', (err, data) => {
        // console.log(request.query);
        if (err) console.error(err);
        var np = new NoteParser(data);
        if (request.query.course === 'true') {
          np.parseMeta();
          if (np.note._meta !== undefined)
            response.json(np.note._meta.CLASS);
          else response.json("");
        }
        else{
          np.makeNoteCards(true, true, true, false);
          response.json(np.parseResult());
        }

    });
});

app.post('/upload', function(req, res) {
  if (!req.files)
    return res.status(400).send('No files were uploaded.');
  let noteFile = req.files.noteFile;
  noteFile.mv("./app/data/note.txt", function(err) {
    if (err)
      return res.status(500).send(err);
    res.render('notes');
  });
});


var server = app.listen(app.get('port'), function(){ //Port listening to, and callback
  console.log('Listening to port ' + app.get('port'));
});

reload(server,app);
