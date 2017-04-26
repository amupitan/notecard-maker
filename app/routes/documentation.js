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
  var buttons= (req.session.username ?
    `<li><a href="/home"><span class="glyphicon glyphicon-home"></span>Home</a></li>
    <li><a href="/logout"><span class="glyphicon glyphicon-log-out"></span>Logout</a></li>`
    :`<li><a href="/signup"><span class="glyphicon glyphicon-user"></span> Sign Up</a></li>
    <li><a href="/login"><span class="glyphicon glyphicon-log-in"></span> Login</a></li>`);

  res.render('documentation', {
    pageTitle: "Documentation",
    info: `${info}`,
    butt: `${buttons}`

  });
});
module.exports = router;
