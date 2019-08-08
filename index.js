var express = require('express');
var bodyParser = require('body-parser')
const shortid = require('shortid');
var app = express();

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)
// Set some defaults (required if your JSON file is empty)
db.defaults({ users: [] }).write()

const port = 3000;

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

app.get('/users/:id', function(req, res) {
    var id = (req.params.id);
    var user = db.get('users').find({id: id}).value();
    res.render('users/view', {
        user: user
    });
});

app.get('/users/delete/:id', function(req, res) {
    var id = (req.params.id);
    db.get('users').remove({id: id}).write();
    res.redirect('/users');
});

app.post('/users/create', function(req, res) {
    req.body.id = shortid.generate();
    db.get('users').push(req.body).write();       
    res.redirect('/users');
});

app.listen(port, function () {
    console.log('Server litsening...')
});
