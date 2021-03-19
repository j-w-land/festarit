let Store = require("../database/actions/store");

// Good validation documentation available at https://express-validator.github.io/docs/
const { body, validationResult, check } = require("express-validator");
const { sanitizeBody } = require("express-validator");

const form_key_text = {
  username: "käyttäjänimi",
  password: "salasana",
  email: "sähköposti",
  phone: "puhelinnumero",
};

exports.getPrices = async function (req, res, next) {
  let data = await Store.getPrices();
  console.log("getPricesDATT");
  console.log(data);

  if (data === null || data === undefined) {
    return res.status(404).send({
      status: false,
      error: "Datan haku epäonnistui",
    });
  } else {
    return res.json({
      status: true,
      data: JSON.stringify(data),
      test: "TEST",
    });
  }
};
