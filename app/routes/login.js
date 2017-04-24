const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser());
const db = require("../../models/db.js");

router.post('/login', function(request, response){
  let userData = {username: request.body.username, password: request.body.password};
  //TODO: sanitize data in line above
  db.login(userData, function(err, user){
    if (err){
      response.render('login', {
    		pageTitle:"Login",
    		errors : err.message
    	});
      // response.end();
    }else{
      response.render('userhome', {
        username: user.username,
  			pageTitle: `Welcome ${user.username}`
      });
    }
    
  });
});


router.get('/login', function(request, response){
	response.render('login', {
		pageTitle:"Login",
		errors: null,
	});
});

module.exports = router;
