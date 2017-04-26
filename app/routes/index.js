// Add <script src="/reload/reload.js"></script> in every page to reload it. Put it in res.send(``);
var express = require('express');
var router =express.Router();


router.get('/',function(req,res){
  // var dataFile = req.app.get('appData');
    res.render('index', {
      pageTitle: "Home",
      pageID: "home",
      loggedIn : req.session.username,
    });
});
module.exports = router;
