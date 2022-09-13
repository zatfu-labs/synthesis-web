const express = require('express');
const app = express();
const session = require('express-session');
const cookieParser = require('cookie-parser');
const expressLayout = require('express-ejs-layouts');
const rateLimit = require("express-rate-limit");
const passport = require('passport');
const helmet = require("helmet");
const flash = require('connect-flash');
const MemoryStore = require('memorystore')(session);
const compression = require('compression');
const logger = require('morgan');

const directRouters = require('./routes/direct');
const apiRouters = require('./routes/api');
const userRouters = require('./routes/users');

const visitor = require('./database/visitsUp');
const { isAuthenticated } = require('./lib/auth');
const { connectMongoDb } = require('./database/connect');
const { getApikey } = require('./database/db');
const { port } = require('./lib/settings');

const PORT = process.env.PORT || 3000;

connectMongoDb();

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, 
  max: 2000, 
  message: 'Oops too many requests'
});

app.set("trust proxy", 1);

app.use(compression());

app.use(limiter);

app.set('view engine', 'ejs');
app.use(expressLayout);
app.use(express.static('public'));
app.use(logger('dev'))

app.use(session({
  secret: 'secret',  
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 86400000 },
  store: new MemoryStore({
    checkPeriod: 86400000
  }),
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());
require('./lib/config')(passport);

app.use(flash());

app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
})

app.get('/', (req, res) => {
  res.render('index', {
    layout: 'layouts/main'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    layout: 'layouts/main'
  });
});

app.get('/test', (req, res) => {
  // visitor.siteViewsUp();
  res.render('test', {
    recaptcha: res.recaptcha,
    layout: false
  })
})

app.get('/docs', isAuthenticated, async (req, res) => { 
  let getkey = await getApikey(req.user.id)
  let { apikey, username } = getkey
  res.render('docs', {
    username: username,
    apikey: apikey,
    layout: false
  });
});

app.use('/direct', directRouters);
app.use('/api', apiRouters);
app.use('/users', userRouters);

app.use(function (req, res, next) {
  if (res.statusCode == '200') {
    res.render('notFound', {
      layout: false
    });
  }
}); 

app.get('*', function(req, res, next){
  res.render('error', {
    layout: false
  })
  res.status(404);
});

app.set('json spaces', 4);

app.listen(PORT, () => {
  console.log(`[INFO] App listening at http://localhost:${PORT}`);
});