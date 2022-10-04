const axios = require('axios');
const cheerio = require('cheerio');
const URL = 'https://www.bmkg.go.id/gempabumi/gempabumi-dirasakan.bmkg';
/*
  BMKG API
  
  Website: https://www.bmkg.go.id

  Method HTTP : GET

  For: Get Infomation Earth Quake From Indonesia
 */

async function Gempa(req, res) {
  axios
    .get(URL)
    .then((response) => {
      const $ = cheerio.load(response.data);

      const urlElems = $("table.table-hover.table-striped");
      for (let i = 0; i < urlElems.length; i++) {
        const urlSpan = $(urlElems[i]).find("tbody")[0];

        if (urlSpan) {
          const urlData = $(urlSpan).find("tr")[0];
          var Kapan = $(urlData).find("td")[1];
          var Letak = $(urlData).find("td")[2];
          var Magnitudo = $(urlData).find("td")[3];
          var Kedalaman = $(urlData).find("td")[4];
          var Wilayah = $(urlData).find("td")[5];
          var lintang = $(Letak).text().split(" ")[0];
          var bujur = $(Letak).text().split(" ")[2];
          var hasil = {
            Waktu: $(Kapan).text(),
            Lintang: lintang,
            Bujur: bujur,
            Magnitudo: $(Magnitudo).text(),
            Kedalaman: $(Kedalaman).text().replace(/\t/g, ").replace(/I/g, "),
            Wilayah: $(Wilayah)
              .text()
              .replace(/\t/g, "")
              .replace(/I/g, "")
              .replace("-", "")
              .replace(/\r/g, "")
              .split("\n")[0],
            Map: "",
          };
          res.status(200).send({
            status: 200,
            content: hasil,
          });
        }
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ status: 500, message: "Internal Server Error" });
    });
}

module.exports = { Gempa };
