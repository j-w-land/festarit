let User = require("../database/actions/user");
let hash = require("../database/actions/hash");

// Good validation documentation available at https://express-validator.github.io/docs/
const { body } = require("express-validator");

const form_key_text = {
  username: "käyttäjänimi",
  password: "salasana",
  email: "sähköposti",
  phone: "puhelinnumero",
};

exports.login = async function (req, res, next) {
  body("*").trim().escape();
  const email = req.body.email;
  const password = req.body.password;

  let login = await User.findOne(email);

  if (login === null) {
    return res.status(404).send({
      status: false,
      error: "Käyttäjätiliä ei tunnistettu. Koita uudestaan.",
    });
  } else {
    let login_split = login.split(";");

    if (hash.getHashedPassword(password) === login_split[3]) {
      let authToken = hash.generateAuthToken(email);
      return res.json({
        status: true,
        message: "success",
        token: authToken,
      });
    } else {
      return res.status(404).send({
        success: false,
        error: "Käyttäjätiliä ei tunnistettu.",
        status: false,
      });
    }
  }
};

// Handle user registration on POST.
exports.create = async function (req, res, next) {
  body("*").trim().escape();

  let check = checkfields(req.body);

  if (check.length > 0) {
    let string = " ";
    if (check.length === 1) {
      string = string + form_key_text[check[0]] + ", ";
    } else {
      for (const key in check) {
        string = string + form_key_text[check[key]];
        if (key == check.length - 2) {
          string = string + " ja ";
        } else if (key !== check.length - 1) {
          string = string + ", ";
        }
      }
    }

    return res.status(404).send({
      success: false,
      error: `Tarkista ${string}kiitos ja rock on!`,
      status: false,
    });
  }

  let register = await User.register(req.body);

  if (register.status === true) {
    return res.json({
      status: true,
      message: "success",
      token: register.token,
    });
  } else {
    return res.status(404).send({
      status: false,
      error: register.message,
      token: null,
    });
  }
};

function checkfields(body) {
  let result = [];
  Object.keys(body).map((e) => {
    if (e === "email") {
      if (!emailIsValid(body[e])) {
        result.push("email");
      }
    } else if (e === "phone") {
      if (!validatePhone(body[e])) {
        result.push("phone");
      }
    }
  });
  return result;
}

//https://ui.dev/validate-email-address-javascript/
function emailIsValid(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

//https://www.javascript-coder.com/form-validation/javascript-form-validation-phone-number/
//Vaadi väh 6 numeroa.
//Hyväksy + ()- ja digit
function validatePhone(input_str) {
  var re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{0,15}$/im;

  return re.test(input_str);
}

exports.authenticate = async function (req, res, next) {
  body("*").trim().escape();
  const token = req.body.token;

  let login = await User.authenticate(token);

  if (login === null) {
    return res.json({
      status: false,
    });
  } else {
    return res.json({
      status: true,
    });
  }
};
