// Add <script src="/reload/reload.js"></script> in every page to reload it. Put it in res.send(``);
var express = require('express');
var router =express.Router();


router.get('/',function(request,response){
  // var dataFile = request.app.get('appData');
    response.render('index', {
      pateTitle: "Home",
      pageID: "home"
    });
});
module.exports = router;
