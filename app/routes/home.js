const express = require('express');

const router = express.Router();

router.get('/home', function(req, res){
  if (req.session.username === undefined) res.redirect("/login");

  var buttons=
   `<li><a href="/home"><span class="glyphicon glyphicon-home"></span>Home</a></li>
  	<li><a href="/logout"><span class="glyphicon glyphicon-log-out"></span>Logout</a></li>`;


  res.render('home', {
    username: req.session.username,
  	pageTitle: `Welcome `,
  	email: "email",
  	numnotes: 10,
    butt: `${buttons}`

  });
});

module.exports = router;
