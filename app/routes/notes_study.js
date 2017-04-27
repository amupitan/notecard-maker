const express = require('express');
const router = express.Router();

router.get('/notes_study', function(req, res){
  if (req.session.username ){ //&& req.session.notes_arrays
    res.render('notes_study', {
			pageTitle:"Study",
			loggedIn : req.session.username,
	});
}else if(!req.session.username){
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
  } else {
		res.render('notes_select', {
			pageTitle:"Select",
			loggedIn : req.session.username,
		});
	}
});

module.exports = router;
