const express = require('express');

const router = express.Router();

router.get('/home', function(request, response){
  if (request.session.username === undefined) response.redirect("/login");
  response.render('home', {
    username: request.session.username,
  	pageTitle: `Welcome `,
  	email: "email",
  	numnotes: 10
  });
});

module.exports = router;
