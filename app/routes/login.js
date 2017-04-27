const express = require('express');
const bodyParser = require('body-parser');
const User = require("../../models/users.js");

const router = express.Router();

router.use(bodyParser.urlencoded({
  extended: true
}));
router.use(bodyParser.json());

router.all('/login', (req, res, next) => {
  if (req.session.username)
    res.redirect('/home');
  else
    next();
});

router.post('/login', function(request, response){
  let userData = {username: request.body.username, password: request.body.password};
  //TODO: sanitize data in line above
  let alertBox = null;
  if (request.query.after){
    alertBox = {after: `?after=${request.query.after}`};
  }
  User.login(userData, function(err, user){
    if (err){
      response.render('login', {
    		pageTitle:"Login",
    		errors : err.message,
    		alertBox : alertBox,
    		loggedIn : request.session.username,
    		form : request.body,
    	});
    }else{
      request.session.username = user.username;
      if (request.body.remember) request.session.cookie.maxAge = 30 * 86400000; //30 days
      
      response.redirect(request.query.after || '/home');
    }
    
  });
});


router.get('/login', function(req, res){
  let alert_error = null;
  // console.log(req);
  if (req.query.error){
    alert_error = {
    		  pre : "Error!",
    		  message : "You have to sign in first",
    		  type : "danger",
    		  after : `?after=${req.query.after}`,
    		};
  }
	res.render('login', {
		pageTitle:"Login",
		errors: false,
		alertBox : alert_error,
		loggedIn : req.session.username,
		form : req.body,
	});
});

module.exports = router;
