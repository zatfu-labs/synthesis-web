const express = require('express');
const app = express();
const session = require('express-session');
const cookieParser = require('cookie-parser');
const expressLayout = require('express-ejs-layouts');
const rateLimit = require('express-rate-limit');
const passport = require('passport');
const flash = require('connect-flash');
const MemoryStore = require('memorystore')(session);
const compression = require('compression');
const logger = require('morgan');

const indexRouter = require("./routes/index");
const authRouter = require('./routes/auth');
const apiRouters = require('./routes/api');

const { connectMongoDb } = require('./database/connect');

connectMongoDb();

const limiter = rateLimit({
	windowMs: 1 * 60 * 1000,
	max: 1500,
	message: 'Oops too many requests',
});

app.set('trust proxy', 1);
app.disable('x-powered-by');
app.use(compression());
app.use(limiter);

app.set('view engine', 'ejs');
app.use(expressLayout);
app.use(express.static('public'));
app.use(logger('dev'));

app.use(
	session({
		secret: 'secret',
		resave: true,
		saveUninitialized: true,
		cookie: { maxAge: 86400000 },
		store: new MemoryStore({
			checkPeriod: 86400000,
		}),
	})
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());
require('./lib/config')(passport);

app.use(flash());

app.use((req, res, next) => {
	res.locals.success_msg = req.flash('success_msg');
	res.locals.error_msg = req.flash('error_msg');
	res.locals.error = req.flash('error');
	res.locals.user = req.user || null;
	next();
});


app.use('/', indexRouter);
app.use('/auth', authRouter)
app.use('/api', apiRouters);

app.set('json spaces', 4);

module.exports = app;