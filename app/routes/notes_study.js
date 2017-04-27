const express = require('express');
const router = express.Router();

router.get('/notes_study', function(req, res){
  if (req.session.username){
    res.render('notes_study', {
			pageTitle:"Study",
			loggedIn : req.session.username,
	});
  }else{
    res.render('login', {
    		pageTitle:"Login",
    		errors : false,
    		alertBox : {
    		  pre : "Error!",
    		  message : "You have to sign in first",
    		  type : "danger",
    		},
    		loggedIn : req.session.username,
    		form : {},
    	});
  }
});

module.exports = router;
