const express = require('express');
const router = express.Router();

router.get('/notes_study', function(req, res) {
  res.render('notes_study');
});

module.exports = router;
