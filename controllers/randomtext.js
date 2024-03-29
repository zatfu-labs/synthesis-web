const { cekKey } = require('../database/db');
const { readFileTxt, readFileJson } = require('../lib/function');

async function cakLontong(req, res) {
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

	readFileJson('./lib/data/caklontong.json')
		.then((result) => {
			res.status(200).send({
				status: 200,
				question: result.quiz,
				answer: result.answer,
				detail: result.detail,
			});
		})
		.catch((error) => {
			console.log(error);
			res.status(500).send({ status: 500, message: 'Internal Server Error' });
		});
}

async function quotes(req, res) {
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

	readFileJson('./lib/data/quotes.json')
		.then((result) => {
			res.status(200).send({
				status: 200,
				quotes: result.quotes,
				author: result.author,
			});
		})
		.catch((error) => {
			console.log(error);
			res.status(500).send({ status: 500, message: 'Internal Server Error' });
		});
}

async function fakta(req, res) {
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

	readFileTxt('./lib/data/fakta.txt')
		.then((result) => {
			res.status(200).send({ status: 200, result });
		})
		.catch((error) => {
			console.log(error);
			res.status(500).send({ status: 500, message: 'Internal Server Error' });
		});
}

async function bijak(req, res) {
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

	readFileTxt('./lib/data/bijak.txt')
		.then((result) => {
			res.status(200).send({ status: 200, result });
		})
		.catch((error) => {
			console.log(error);
			res.status(500).send({ status: 500, message: 'Internal Server Error' });
		});
}

async function motivasi(req, res) {
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

	readFileTxt('./lib/data/motivasi.txt')
		.then((result) => {
			res.status(200).send({ status: 200, result: result.replace(/"/g, '') });
		})
		.catch((error) => {
			console.log(error);
			res.status(500).send({ status: 500, message: 'Internal Server Error' });
		});
}

// |-------------------------------------|
//
//     CUSTOM API
//
// |-------------------------------------|

async function quotenime(req, res) {
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

	readFileJson('./lib/data/quotenime.json')
		.then((result) => {
			res.status(200).send({
				status: 200,
				quotes: result.quote,
				char: result.char,
			});
		})
		.catch((error) => {
			console.log(error);
			res.status(500).send({ status: 500, message: 'Internal Server Error' });
		});
}

async function loli(req, res) {
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

	readFileJson('./lib/data/loli.json')
		.then((resul) => {
			res.status(200).send({
				status: 200,
				result: resul,
			});
		})
		.catch((error) => {
			console.log(error);
			res.status(500).send({ status: 500, message: 'Internal Server Error' });
		});
}

async function husbu(req, res) {
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

	readFileJson('./lib/data/husbu.json')
		.then((resul) => {
			res.status(200).send({
				status: 200,
				result: resul,
			});
		})
		.catch((error) => {
			console.log(error);
			res.status(500).send({ status: 500, message: 'Internal Server Error' });
		});
}

module.exports = { cakLontong, quotes, bijak, fakta, motivasi, quotenime, husbu, loli };
