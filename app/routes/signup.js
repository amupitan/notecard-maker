const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const db = require("../../models/db.js");

router.use(bodyParser.urlencoded({
  extended: true
}));
router.use(bodyParser.json());

router.get('/signup', function(req, res){
	if (req.session.username) res.redirect('/home');

	var buttons= `<li><a href="/signup"><span class="glyphicon glyphicon-user"></span> Sign Up</a></li>
		<li><a href="/login"><span class="glyphicon glyphicon-log-in"></span> Login</a></li>`;

	res.render('signup', {
			pageTitle:"Sign up",
			errors: false,
			butt: `${buttons}`
	});
});

router.post('/signup', function(req, res){
  //TODO: validations on all reqs
		if (req.session.username) res.redirect('/home');
		var buttons= `<li><a href="/signup"><span class="glyphicon glyphicon-user"></span> Sign Up</a></li>
			<li><a href="/login"><span class="glyphicon glyphicon-log-in"></span> Login</a></li>`;
  if (req.body.password !== req.body.rpassword){
    res.render('signup', {
    		pageTitle:"Sign Up",
    		errors : "The passwords don't match"
    	});
  }
  let userData = {username: req.body.username, password: req.body.password, email: req.body.email, first_name: req.body.first_name, last_name: req.body.last_name};
  db.addUser(userData, function(err, res){
    if(err){
      res.render('signup', {
    		pageTitle:"Sign Up",
    		errors : err.message
    	});
    }else{
      res.render('login', {
    		pageTitle:"Login",
    		errors : false,
    		signup : {
    		  pre : "Congratulations!",
    		  message : "You have successfully signed up! Login with your credentials",
    		  type : "success",
					butt: `${buttons}`
    		}
    	});
    }
  });

});

module.exports = router;
