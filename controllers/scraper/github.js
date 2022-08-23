const axios = require("axios");
const URL = "https://api.github.com";

async function userInfo(req, res) {
  const username = req.query.username;
  if (username === undefined)
    return res.status(404).send({
      status: 404,
      message: `Input Parameter username bro >:v`,
    });
  axios
    .get(URL + "/users/" + username)
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



module.exports = { userInfo };
