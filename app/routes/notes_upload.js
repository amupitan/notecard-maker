const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

router.use(bodyParser.urlencoded({
  extended: true
}));
router.use(bodyParser.json());
router.use(fileUpload());

router.post('/notes_upload', function(req, res) {
  if (!req.files)
    return res.status(400).send('No files were uploaded.');
  let noteFile = req.files.noteFile;
  noteFile.mv("./app/data/note.txt", function(err) {
    if (err)
      return res.status(500).send(err);
    res.redirect("/notes_study");
  });
});

module.exports = router;
