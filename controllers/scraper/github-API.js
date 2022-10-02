const axios = require("axios");
const URL = "https://api.github.com";
/*
  GITHUB API
  
  Website: https://api.github.com

  @params username | GET

  For: Get Infomation From Account ${username}
 */

async function userInfo(req, res) {
  const username = req.query.username;
  if (username === undefined)
    return res.status(404).send({
      status: 404,
      message: `Input Parameter (username)`,
    });
  axios
    .get(URL + "/users/" + username)
    .then((result) => {
      res.status(200).send({
            status: 200,
            content: result.data
        })
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ status: 500, message: "Internal Server Error" });
    });
}



module.exports = { userInfo };
