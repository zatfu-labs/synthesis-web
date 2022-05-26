var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    layout: 'layouts/main'
  });
});

router.get('/project-list', function(req, res, next) {
  res.render('project', {
    layout: 'layouts/main'
  });
});

router.get('/about', function(req, res, next) {
  res.render('about', {
    layout: 'layouts/main'
  });
});

module.exports = router;
