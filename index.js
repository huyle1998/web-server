var express = require('express');
var bodyParser = require('body-parser')
var shortid = require('shortid');

var users = require('./routes/users.route');
var app = express();

app.use(express.static('public'))
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use('/users', users);
app.set('view engine', 'pug')

app.get('/', function (req, res) {
    res.render('indexExpress');
});

app.listen(3000, function () {
    console.log('Server litsening port 3000...')
});
