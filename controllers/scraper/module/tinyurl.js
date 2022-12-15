const axios = require("axios");
const URL = "https://tinyurl.com/api-create.php?url=";

/**
 * @info Tiny API
 * @returns Create Short URL
 */

async function short(req, res) {
  const url = req.query.url;
  if (url === undefined)
    return res.status(404).send({
      status: 404,
      message: `Input Parameter (url)`,
    });
  axios
    .get(URL + url)
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

module.exports = { short };
