var express = require('express');
var bodyParser = require('body-parser')
var app = express();

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)
// Set some defaults (required if your JSON file is empty)
db.defaults({ users: [] }).write()

var port = 3000;

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded



app.set('view engine', 'pug')

app.get('/', function (req, res) {
    res.render('indexExpress');
});

app.get('/users', function (req, res) {
    res.render('users/index', {
        users: db.get('users').value()
    });
});

app.get('/users/search', function (req, res) {
    var q = req.query.q;
    var users = db.get('users').value()  
    var matcheUsers = users.filter(function(users) {
        return users.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });    
    res.render('users/index', {
        users: matcheUsers        
    });
    
});

app.get('/users/create', function(req, res) {
    res.render('users/create.pug');
});

app.post('/users/create', function(req, res) {
    // Add a post
    db.get('users').push(req.body).write();  
    // console.log(db.get('users'))  
    res.redirect('/users');
});

app.listen(port, function () {
    console.log('Server litsening...')
});
