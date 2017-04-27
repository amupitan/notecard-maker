const express = require('express');
const reload = require('reload');
const session = require('express-session');
const fs = require('fs');
const mongoose = require('mongoose');
const NoteParser = require('./parser');
const app = express();

mongoose.connect('mongodb://127.0.0.1/np'); //np database
var db = mongoose.connection; //default connection
db.on('error', console.error.bind(console, 'MongoDB connection error:')); //console log mongo errors

const filePath = "./app/data/note.txt";
const bodyParser = require('body-parser'); //Parse through req

app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views','app/views');

app.use(session({
  secret: 'I have a dream',
  resave: false,
  saveUninitialized: true
}));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(require('./routes/documentation'));
app.use(require('./routes/notes_upload'));
app.use(require('./routes/notes_study'));
app.use(require('./routes/notes_select'));
app.use(require("./routes/index"));
// app.use(require('./routes/notecards'));
app.use(require("./routes/signup"));
app.use(require("./routes/login"));
app.use(require("./routes/home"));
// app.use(express.static('app/public'));
app.use(express.static(__dirname + '/public'));

app.get('/notecards', function(req,res){
    fs.readFile(filePath, 'UTF-8', (err, data) => {
        // console.log(req.query);
        if (err) console.error(err);
        var np = new NoteParser(data);
        if (req.query.course === 'true') {
          np.parseMeta();
          if (np.note._meta !== undefined)
            res.json(np.note._meta.CLASS);
          else res.json("");
        }
        else{
          np.makeNoteCards(true, true, true, false);
          res.json(np.parseResult());
        }
    });
});

app.get('/create', (req, res) => {
  res.render('notes_upload', {
		errors : false,
		loggedIn : req.session.username //TODO: this should always be true since the user has to be logged in
	});
});

app.post('/upload_textArea', function(req, res) {
        if (!req.body.noteText)
          return res.status(400).send('No text in textbox.');
        else{
          let noteText = req.body.noteText;
          var fs=require('fs');
          fs.writeFile("./app/data/note.txt", noteText, function(err){
            if (err)
              return res.status(500).send(err);
              res.redirect('/notes_select');
          });
        }
    });

app.get('/logout',function(req,res){
  let alertMessage = req.session.username ? {
          pre : null,
          message : "You have successfully logged out! Login with your credentials",
          type : "info",
        } : false;
  req.session.destroy(function(err) {
    if(err) {
      console.log(err);
    } else {
      res.render('login', {
        pageTitle:"Login",
        errors : false,
        alertBox : alertMessage,
        loggedIn : false,
        form : {},
      });
    }
  });
});


var server = app.listen(app.get('port'), function(){ //Port listening to, and callback
  console.log('Listening to port ' + app.get('port'));
});

reload(server,app);
