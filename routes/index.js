var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    layout: 'layouts/main',
    title: "Home"
  });
});

router.get('/signin', function(req, res, next) {
  res.render('signin', {
    layout: 'layouts/layout1',
    title: "Sign In"
  });
});


module.exports = router;
