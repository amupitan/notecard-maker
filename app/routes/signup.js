const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const db = require("../../models/db.js");

router.use(bodyParser.urlencoded({
  extended: true
}));
router.use(bodyParser.json());

router.get('/signup', function(request, response){
	response.render('signup', {
			pageTitle:"Sign up",
			errors: null
	});
});

router.post('/signup', function(request, response){
  //TODO: validations on all requests
  if (request.body.password !== request.body.rpassword){
    response.render('signup', {
    		pageTitle:"Sign Up",
    		errors : "The passwords don't match"
    	});
  }
  let userData = {username: request.body.username, password: request.body.password, email: request.body.email, first_name: request.body.first_name, last_name: request.body.last_name};
  db.addUser(userData, function(err, res){
    if(err){
      response.render('signup', {
    		pageTitle:"Sign Up",
    		errors : err.message
    	});
    }else{
      response.send("<h1>Account Created</h1><a href=\"/login\">Login<a/>");
    }
  });

});

module.exports = router;