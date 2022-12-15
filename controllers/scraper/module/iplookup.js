const axios = require("axios");
const URL = "http://ip-api.com/json/";

async function iplookup(req, res) {
  const ip = req.query.ip;
  if (ip === undefined)
    return res.status(404).send({
      status: 404,
      message: `Input Parameter ip `,
    });
  axios
    .get(URL + ip)
    .then((result) => {
      res.status(200).send({
        code: 200,
        result: result.data,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send({ status: 500, message: "Internal Server Error" });
    });
}

module.exports = { iplookup };
