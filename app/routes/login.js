const express = require('express');
const bodyParser = require('body-parser');
const db = require("../../models/db.js");

const router = express.Router();


router.use(bodyParser.urlencoded({
  extended: true
}));
router.use(bodyParser.json());

router.post('/login', function(request, response){
  let userData = {username: request.body.username, password: request.body.password};
  //TODO: sanitize data in line above
  db.login(userData, function(err, user){
    if (err){
      response.render('login', {
    		pageTitle:"Login",
    		errors : err.message,
    		signup : false,
    		loggedIn : request.session.username
    	});

    }else{
      request.session.username = user.username;
      if (request.body.remember) request.session.cookie.maxAge = 30 * 86400000; //30 days
      response.render('home', {
        username: user.username,
  			pageTitle: `Welcome ${user.username}`,
  			email: user.email,
  			numnotes: user.note_ids.length,
  			loggedIn : request.session.username
      });
    }
    
  });
});


router.get('/login', function(request, response){
	response.render('login', {
		pageTitle:"Login",
		errors: false,
		signup : false,
		loggedIn : request.session.username
	});
});

module.exports = router;
