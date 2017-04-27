const express = require('express');
const bodyParser = require('body-parser');
const db = require("../../models/users.js");

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
  db.login(userData, function(err, user){
    if (err){
      response.render('login', {
    		pageTitle:"Login",
    		errors : err.message,
    		alertBox : false,
    		loggedIn : request.session.username,
    		form : request.body,
    	});
    }else{
      request.session.username = user.username;
      if (request.body.remember) request.session.cookie.maxAge = 30 * 86400000; //30 days
      response.redirect('/home');
    }
    
  });
});


router.get('/login', function(request, response){
	response.render('login', {
		pageTitle:"Login",
		errors: false,
		alertBox : false,
		loggedIn : request.session.username,
		form : request.body,
	});
});

module.exports = router;
