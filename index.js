var express = require('express');
var app = express();
var port = 3000;

var users = [
    { id: 1, name: 'Huy' },
    { id: 2, name: 'Diem' }
]

app.set('view engine', 'pug')
app.set('views', './views')

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
        users: matcheUsers
    });
});

app.listen(port, function () {
    console.log('Server litsening...')
});
