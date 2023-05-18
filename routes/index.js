const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../lib/auth');
const { getApikey } = require('../database/db');

router.get('/', (req, res) => {
	res.render('index', {
		layout: 'layouts/main',
	});
});

router.get('/about', (req, res) => {
	res.render('about', {
		layout: 'layouts/main',
	});
});

router.get('/docs', isAuthenticated, async (req, res) => {
	const getkey = await getApikey(req.user.id);
	const { apikey, username } = getkey;
	res.render('docs', {
		username,
		apikey,
		layout: false,
	});
});

module.exports = router;