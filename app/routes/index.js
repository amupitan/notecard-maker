// Add <script src="/reload/reload.js"></script> in every page to reload it. Put it in res.send(``);
var express = require('express');
var router =express.Router();


router.get('/',function(request,response){
  response.send(`
      <h1>Welcome a </h1>
      <p>Some paragraph text</p>

      <script src="/reload/reload.js"></script>
    `);
});
