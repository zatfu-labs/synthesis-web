const axios = require("axios");
/*
  Weather API

  Website: https://api.openweathermap.org

  @params country | GET

  For: Get Infomation About Weather In The Country
 */

async function weather(req, res) {
  const country = req.query.country;
  if (country === undefined)
    return res.status(404).send({
      status: 404,
      message: `Input Parameter (country)`,
    });
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=db8788ed4e52495bf8a51ae0a8e4caff&units=metric`;
  axios
    .get(URL)
    .then((result) => {
      res.status(200).send({
        status: 200,
        content: result.data,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ status: 500, message: "Internal Server Error" });
    });
}

module.exports = { weather };
