const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();

router.get('/discord', (req, res) => {
	res.redirect('http://discord.com');
});

router.get('*', async (req, res) => {
	res.redirect('/');
});

module.exports = router;
