const express = require('express');
const router = express.Router();
const dataFile = require('../data/description.json');

router.get('/documentation',function(req,res){
  var info='';
  dataFile.KeyCharacters.forEach(function(item){
    info+=`
      <div>
        <h3>${item.Character}</h3>
        <ul>${item.Value}</ul>
        <ul>${item.Description}</ul>
        <ul>${item.Example}</ul>
        <ul>${item.Example_Description}</ul>
      </div>
    `;
  });
  res.render('documentation', {
    pageTitle: "Documentation",
    info: `${info}`,
    loggedIn : req.session.username,
  });
});
module.exports = router;
