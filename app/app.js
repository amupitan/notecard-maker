const express = require('express');
const reload = require('reload');
const app = express();
const fileUpload = require('express-fileupload');
// var dataFile = require('./data/description.json');
const NoteParser = require('./parser');
const fs = require('fs');

const filePath = "./app/data/note.txt";
var bodyParser = require('body-parser'); //Parse through req

app.set('port', process.env.PORT || 3000);
// app.set('appData', dataFile);
app.set('view engine', 'ejs');
app.set('views','app/views');
// app.set('appData', dataFile); //Making dataFile available to all the other files

app.use(require('./routes/documentation'));
app.use(require('./routes/notes_study'));
app.use(require('./routes/notes_select'));
app.use(require("./routes/index"));
// app.use(require('./routes/notecards'));
app.use(require("./routes/signup"));
app.use(require("./routes/login"));
app.use(fileUpload());
app.use(express.static('app/public'));

app.use(bodyParser());

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
      res.render('notes_study');
  });
});

app.post('/upload_textArea', function(req, res) {
        if (!req.body.noteText)
          return res.status(400).send('No text in textbox.');
        else{
        //   console.log("Text: ", req.body.noteText);
        // }
        let noteText = req.body.noteText;
        var fs=require('fs');
        fs.writeFile("./app/data/note.txt", noteText, function(err){
        // noteText.mv("./app/data/note.txt", function(err) {
          if (err)
            return res.status(500).send(err);
            res.render('notes_study');
        });
      }
    });


var server = app.listen(app.get('port'), function(){ //Port listening to, and callback
  console.log('Listening to port ' + app.get('port'));
});

reload(server,app);
