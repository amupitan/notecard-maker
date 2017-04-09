var express = require('express');
var router =express.Router();


router.get('/documentation',function(request,response){
  var dataFile = request.app.get('appData');
  var info='';
  dataFile.KeyCharacters.forEach(function(item){
    info+=`
      <div>
        <h3>${item.Character}</h3>
        <ul>${item.Value}</ul>
        <ul>${item.Description}</ul>
        <ul>${item.Example}</ul>
        <ul>${item.Example_Description}</ul>
      </div>
    `;
  });
  response.render('documentation', {
    pageTitle: "Documentation",
        // rules:`<h1>RULES</h1>`,
    info: `${info}`
  });

    // response.send(`
    //   <h1>RULES</h1>
    //   ${info}
    //   `);
  // app.get('/documentation', function(req, res){
  //   res.sendFile()
  //   res.render('documentation');
  // });


});
module.exports = router;
