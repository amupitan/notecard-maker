const express = require('express');

const router = express.Router();

router.get('/home', function(req, res){
  if (req.session.username === undefined) 
    return res.redirect('/login?error=true&after=' + encodeURIComponent(req.originalUrl));
  else{
    let alertBox = null;
    if (req.query.message === "changed"){
      alertBox = {type: "success", pre: "Success! ", message: "You have successfully updated your account."};
    }else if (req.query.message === "same") alertBox = {type: "warning", pre: "Warning: ", message: "You account details were not changed"};
    res.render('home', {
      username: req.session.username,
    	fullName: req.session.fullName,
      loggedIn : req.session.username,
      alertBox : alertBox,
    });
  }
});

module.exports = router;
