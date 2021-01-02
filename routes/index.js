var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/olevel', function(req, res) {
  res.render('base', { title: "O'Level", page: 'olevel' });
});

router.get('/logout', function(req, res) {
  res.locals.isSignedIn = false;
  res.locals.user = null;
  req.user = null;
  res.clearCookie('userAccess', { path: '/' });
  res.redirect('/');
});

router.get('/login', function(req, res) {
  if(req.user){
    return res.redirect('/');
  }
  res.render('base', { title: 'Login To E-learning Platform', page: 'login' });
});

router.get('/signup', function(req, res) {
  if(req.user){
    return res.redirect('/')
  }
  res.render('base', { title: 'Register', page: 'signup' });
});

router.get('/', function(req, res) {
  res.render('base', { title: 'Home', page: 'home' });
});

router.get('/subjects', function(req, res) {
  res.render('base', { title: 'Subjects', page: 'subjects' });
});

router.get('/biology', function(req, res) {
  res.render('base', { title: 'Biology', page: 'biology' });
});


module.exports = router;
