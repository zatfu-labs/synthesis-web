const lower = /[aiueo]/g;
const upper = /[AIUEO]/g;

/*
  Hilih Function
  
  @params kata | Method : GET

  For: Change Upper and Lower in Word
 */

async function Hilih(req, res) {
	const kata = req.query.kata;
	if (kata === undefined)
		return res.status(404).send({
			status: 404,
			message: `Input Parameter (kata)`,
		});
	const hasil = kata.replace(lower, 'i').replace(upper, 'I');
	res.status(200).send({
		code: 200,
		result: hasil,
	});
}

async function Halah(req, res) {
	const kata = req.query.kata;
	if (kata === undefined)
		return res.status(404).send({
			status: 404,
			message: `Input Parameter (kata)`,
		});
	const hasil = kata.replace(lower, 'a').replace(upper, 'A');
	res.status(200).send({
		code: 200,
		result: hasil,
	});
}
module.exports = { Halah, Hilih };
