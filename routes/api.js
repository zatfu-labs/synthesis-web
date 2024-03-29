const express = require('express');
const router = express.Router();
const { cekKey, cekLimit } = require('../database/db');
const { youtubePlay, youtubeMp4, youtubeMp3 } = require('../controllers/yt');
const { cakLontong, bijak, quotes, fakta, motivasi, quotenime, husbu, loli } = require('../controllers/randomtext');
const Scraper = require('../controllers/scraper/main');

router.get('/checkkey', async (req, res) => {
	const { apikey } = req.query;
	if (apikey === undefined) {
		return res.status(404).send({
			status: 404,
			message: 'Input Parameter apikey',
		});
	}

	const check = await cekKey(apikey);
	if (!check) {
		return res.status(403).send({
			status: 403,
			message: `apikey ${apikey} not found, please register first!`,
		});
	}

	res.send({ status: 200, apikey, response: 'Active' });
});

router.post('/ceklimit', async (req, res) => {
	const { apikey } = req.query;
	if (apikey === undefined) {
		return res.status(404).send({
			status: 404,
			message: 'Input Parameter apikey',
		});
	}

	const check = await cekLimit(apikey);
	if (!check) {
		return res.status(403).send({
			status: 403,
			message: `apikey ${apikey} not found!`,
		});
	}

	res.send({ status: 200, apikey, limit: check });
});

// LIST A API V1 From Scrapper To Function
router.get('/ytplay', youtubePlay);
router.get('/ytmp4', youtubeMp4);
router.get('/ytmp3', youtubeMp3);
router.get('/ghinfo', Scraper.Github.userInfo);
router.get('/weather', Scraper.Weather.weather);
router.get('/iplookup', Scraper.Iplookup.iplookup);
router.get('/hilih', Scraper.Word.Hilih);
router.get('/halah', Scraper.Word.Halah);
router.get('/gempa', Scraper.Bmkg.Gempa);
router.get('/pinterest', Scraper.Pinterest.Search);
router.get('/shorturl', Scraper.TinyURL.short);
router.get('/caklontong', cakLontong);
router.get('/quotenime', quotenime);
router.get('/quotes', quotes);
router.get('/fakta', fakta);
router.get('/bijak', bijak);
router.get('/motivasi', motivasi);
router.get('/loli', loli);
router.get('/husbu', husbu);

/*
------------------------------------------------------------------------------------------
------------------------------[API V2 Experiment]-----------------------------------------
------------------------------------------------------------------------------------------
*/

/*
------------------------------------------------------------------------------------------
------------------------------[ PAGE 404 NOT FOUNDS ]-------------------------------------
------------------------------------------------------------------------------------------
*/
router.get('*', async (req, res) =>
	res.status(404).send({
		status: 404,
		message: 'Invalid API URL :)',
	})
);

module.exports = router;
