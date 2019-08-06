var express = require('express');
var app = express();
var port = 3000;

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
    console.log(q)
    // document.getElementById("search").innerHTML = q;
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

app.listen(port, function () {
    console.log('Server litsening...')
});
