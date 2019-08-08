var express = require('express');
var router = express.Router();
var low = require('lowdb');
var FileSync = require('lowdb/adapters/FileSync')
var adapter = new FileSync('db.json')
var db = low(adapter)
// Set some defaults (required if your JSON file is empty)
db.defaults({ users: [] }).write()

// define the route users
router.get('/', function (req, res) {
    res.render('users/index', {
        users: db.get('users').value()
    });
});

router.get('/search', function (req, res) {
    var q = req.query.q;
    var users = db.get('users').value()  
    var matcheUsers = users.filter(function(users) {
        return users.name.toLowerCase().indexOf(q.toLowerCase().trim()) !== -1;
    });    
    res.render('users/index', {
        users: matcheUsers        
    });
    
});

router.get('/create', function(req, res) {
    res.render('users/create.pug');
});

router.get('/:id', function(req, res) {
    var id = (req.params.id);
    var user = db.get('users').find({id: id}).value();
    res.render('users/view', {
        user: user
    });
});

router.get('/delete/:id', function(req, res) {
    var id = (req.params.id);
    db.get('users').remove({id: id}).write();
    res.redirect('/users');
});

router.post('/create', function(req, res) {
    req.body.id = shortid.generate();
    db.get('users').push(req.body).write();       
    res.redirect('/');
});

module.exports = router
