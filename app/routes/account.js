const express = require('express');
const router = express.Router();
const User = require("../../models/users.js");

router.all('/account', (req, res, next) => {
  if(!req.session.username)
    return res.redirect('/login?error=true&after=' + encodeURIComponent(req.originalUrl));
  else next();
});

router.get('/account', (req, res) => {
  User.getUser(req.session.username, (err, user) => {
    if (err) console.error(err);
    res.render('account', {
			pageTitle: req.session.username,
			loggedIn : req.session.username,
			errors : err && err.message,
			form : {
			  first_name : user.first_name,
			  last_name : user.last_name,
			  username : user.username,
			  email: user.email
			},
	  });
  });
});

router.post('/account', function(req, res){
  //TODO: validations on all reqs
  if (req.body.password && (req.body.password !== req.body.rpassword)){
    return res.render('account', {
    		pageTitle: req.session.username,
    		errors : "The passwords don't match",
    		loggedIn : req.session.username,
    		form : req.body,
    	});
  }
  let userData = {username: req.body.username, password: req.body.password, email: req.body.email, first_name: req.body.first_name, last_name: req.body.last_name};
  User.getUser(req.session.username, (err, user) => {
    if(err){
      res.render('account', {
    		pageTitle: req.session.username,
    		errors : err.message,
    		loggedIn : req.session.username,
    		form : req.body,
    	});
    }else{
      user.update(userData, (err, new_user) => {
        if (err) console.error(error);
        req.session.username = new_user.username;
        req.session.fullName = new_user.name;
        res.redirect('/home?message=changed');
      });
    }
  });
});
module.exports = router;