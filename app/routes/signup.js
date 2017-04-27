const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const db = require("../../models/users.js");

router.use(bodyParser.urlencoded({
  extended: true
}));
router.use(bodyParser.json());

router.all('/signup', (req, res, next) => {
  if (req.session.username)
    res.redirect('/home');
  else
    next();
});

router.get('/signup', function(req, res){
	if (req.session.username) res.redirect('/home');
	res.render('signup', {
			pageTitle:"Sign up",
			errors: false,
			loggedIn : req.session.username,
			form : {},
	});
});

router.post('/signup', function(req, res){
  //TODO: validations on all reqs
		if (req.session.username) res.redirect('/home');
  if (req.body.password !== req.body.rpassword){
    res.render('signup', {
    		pageTitle:"Sign Up",
    		errors : "The passwords don't match",
    		loggedIn : req.session.username,
    		form : req.body,
    	});
    	return;
  }
  let userData = {username: req.body.username, password: req.body.password, email: req.body.email, first_name: req.body.first_name, last_name: req.body.last_name};
  db.addUser(userData, function(err, result){
    if(err){
      res.render('signup', {
    		pageTitle:"Sign Up",
    		errors : err.message,
    		loggedIn : req.session.username,
    		form : req.body,
    	});
    }else{
      res.render('login', {
    		pageTitle:"Login",
    		errors : false,
    		alertBox : {
    		  pre : "Congratulations!",
    		  message : "You have successfully signed up! Login with your credentials",
    		  type : "success",
    		},
    		loggedIn : req.session.username,
    		form : {username: result.username},
    	});
    }
  });

});

module.exports = router;
