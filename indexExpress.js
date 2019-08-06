var express = require('express');
var app = express();

app.listen(3000, function() {
	console.log('Server listening...')
})

app.get('/', function(req, res) {
	res.render('indexExpress.pug')
})