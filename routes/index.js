var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var router = express.Router();


router.get('/', function (req, res) {
    res.render('index', { user : req.user });
});

router.get('/register', function(req, res) {
    res.render('register', { user: req.user });
});

router.post('/register', function(req, res, next) {
    Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
        if (err) {
          return res.render("register", {info: "Sorry. That username already exists. Try again."});
        }

        passport.authenticate('local')(req, res, function () {
            req.session.save(function (err) {
                if (err) {
                    return next(err);
                }
                res.redirect('/');
            });
        });
    });
});


router.get('/login', function(req, res) {
    res.render('login', { user : req.user, message : req.flash('error')});
});

router.post('/login', passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), function(req, res, next) {
    req.session.save(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
});

router.get('/logout', function(req, res, next) {
    req.logout();
    req.session.save(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
});


router.get('/temp', function (req, res) {
    var sys = require('sys')
    var exec = require('child_process').exec;
    var child;
    // executes `pwd`
    child = exec("pwd", function (error, stdout, stderr) {
        sys.print('stdout: ' + stdout);
        sys.print('stderr: ' + stderr);
        if (error !== null) {
            console.log('exec error: ' + error);
        }
        //res.status(200).send("stdout = " + stdout);
        res.render('temp', { user: req.user, data: stdout, error: error});
    });
});

router.get('/feed', function (req, res) {
    //res.status(200).send("pong!");
    var sys = require('sys')
    var exec = require('child_process').exec;
    var child;
    // executes `pwd`
    child = exec("pwd", function (error, stdout, stderr) {
        sys.print('stdout: ' + stdout);
        sys.print('stderr: ' + stderr);
        if (error !== null) {
            console.log('exec error: ' + error);
        }
        //res.status(200).send("stdout = " + stdout);
        res.render('temp', { user: req.user, data: stdout, error: error });
    });
});

module.exports = router;
