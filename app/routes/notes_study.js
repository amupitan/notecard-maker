var express = require('express');
var router =express.Router();

router.get('/notes_study', function(req, res){
	var buttons= (req.session.username ?
		`<li><a href="/home"><span class="glyphicon glyphicon-home"></span>Home</a></li>
		<li><a href="/logout"><span class="glyphicon glyphicon-log-out"></span>Logout</a></li>`
		:`<li><a href="/signup"><span class="glyphicon glyphicon-user"></span> Sign Up</a></li>
		<li><a href="/login"><span class="glyphicon glyphicon-log-in"></span> Login</a></li>`);

	res.render('notes_study', {
			pageTitle:"Study",
			butt:`${buttons}`
	});
});

module.exports = router;
