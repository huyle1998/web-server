var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var port = 3000;

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

var users = [
    { id: 1, name: 'Huy' },
    { id: 2, name: 'Diem' },
    { id: 3, name: 'Man' },
    { id: 4, name: 'Ngan' },
    { id: 5, name: 'Hai' },
    { id: 6, name: 'Thanh'}
]

app.set('view engine', 'pug')

app.get('/', function (req, res) {
    res.render('indexExpress');
});

app.get('/users', function (req, res) {
    res.render('users/index', {
        users: users
    });
});

app.get('/users/search', function (req, res) {
    var q = req.query.q;   
    var matcheUsers = users.filter(function(users) {
        return users.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
    res.render('users/index', {
        users: matcheUsers,
        search: q
    });
    
});

app.get('/users/create', function(req, res) {
    res.render('users/create.pug');
});

app.post('/users/create', function(req, res) {
    users.push(req.body);
    res.redirect('/users');
});

app.listen(port, function () {
    console.log('Server litsening...')
});
