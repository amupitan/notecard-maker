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
			errors: false,
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
      response.render('login', {
    		pageTitle:"Login",
    		errors : false,
    		signup : {
    		  pre : "Congratulations!",
    		  message : "You have successfully signed up! Login with your credentials",
    		  type : "success",
    		}
    	});
    }
  });

});

module.exports = router;