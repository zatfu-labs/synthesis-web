const express = require('express');
const router = express.Router();
const { cekKey } = require('../database/db'); 
const { youtubePlay, youtubeMp4, youtubeMp3 } = require('../controllers/yt');
const { cakLontong, bijak, quotes, fakta, motivasi, quotenime, husbu, loli } = require('../controllers/randomtext');
const Scraper = require('../controllers/scraper/index');
const Utils = require('../controllers/utils/index')

router.get('/checkkey', async (req, res) => {
    const apikey = req.query.apikey;
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    res.send({status: 200, apikey: apikey, response: 'Active'});
});

router.get('/ytplay', youtubePlay);

router.get('/ytmp4', youtubeMp4);

router.get('/ytmp3', youtubeMp3);

router.get('/ghinfo', Scraper.Github.userInfo);

router.get('/caklontong', cakLontong);

router.get('/quotenime', quotenime);

router.get('/quotes', quotes);

router.get('/fakta', fakta);

router.get('/bijak', bijak);

router.get('/motivasi', motivasi);

router.get('/loli', loli);

router.get('/husbu', husbu)

// Utils API

// router.get('/faker', Utils.Faker);
    router.get('/iplookup', Utils.iplookup)

// Invalid Page Handler
router.get('*', async (req, res) => {
    return res.status(404).send({
      status: 404,
      message: `Invalid API URL :)`,
    });
})

module.exports = router;
