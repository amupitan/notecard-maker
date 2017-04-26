const express = require('express');
const bodyParser = require('body-parser');
const db = require("../../models/db.js");

const router = express.Router();


router.use(bodyParser.urlencoded({
  extended: true
}));
router.use(bodyParser.json());

router.post('/login', function(req, res){
	if (req.session.username) res.redirect('/home');

	var buttons= `<li><a href="/signup"><span class="glyphicon glyphicon-user"></span> Sign Up</a></li>
		<li><a href="/login"><span class="glyphicon glyphicon-log-in"></span> Login</a></li>`;


  let userData = {username: req.body.username, password: req.body.password};
  //TODO: sanitize data in line above
  db.login(userData, function(err, user){
    if (err){
      res.render('login', {
    		pageTitle:"Login",
    		errors : err.message,
    		signup : false,
				butt: `${buttons}`
    	});

    }else{
			buttons=
		   `<li><a href="/home"><span class="glyphicon glyphicon-home"></span>Home</a></li>
		  	<li><a href="/logout"><span class="glyphicon glyphicon-log-out"></span>Logout</a></li>`;
      req.session.username = user.username;
      if (req.body.remember) req.session.cookie.maxAge = 30 * 86400000; //30 days
      res.render('home', {
        username: user.username,
  			pageTitle: `Welcome ${user.username}`,
  			email: user.email,
  			numnotes: user.note_ids.length,
				butt: `${buttons}`
      });
    }

  });
});


router.get('/login', function(req, res){
	if (req.session.username) res.redirect('/home');

	var buttons= `<li><a href="/signup"><span class="glyphicon glyphicon-user"></span> Sign Up</a></li>
		<li><a href="/login"><span class="glyphicon glyphicon-log-in"></span> Login</a></li>`;

	res.render('login', {
		pageTitle:"Login",
		errors: false,
		signup : false,
		butt: `${buttons}`
	});
});

module.exports = router;
