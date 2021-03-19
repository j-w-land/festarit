let User = require("../database/actions/user");
let hash = require("../database/actions/hash");

// Good validation documentation available at https://express-validator.github.io/docs/
const { body, validationResult, check } = require("express-validator");
const { sanitizeBody } = require("express-validator");

const form_key_text = {
  username: "käyttäjänimi",
  password: "salasana",
  email: "sähköposti",
  phone: "puhelinnumero",
};

// Display list of all posts.
exports.index = function (req, res, next) {
  const userId = req.params.userId;
  console.log(userId);

  /*  const anime = await Anime.findById(animeId, (anime) => anime); */

  User.find({}).exec(function (err, result) {
    if (err) {
      return next(err);
    }

    res.json(result);
  });
};

exports.login = async function (req, res, next) {
  body("*").trim().escape();
  console.log(req.body);
  const email = req.body.email;
  const password = req.body.password;

  let login = await User.findOne(email);

  if (login === null) {
    return res.status(404).send({
      status: false,
      error: "Käyttäjätiliä ei tunnistettu. Koita uudestaan.",
    });
  } else {
    console.log(login);
    console.log("login");
    let login_split = login.split(";");
    console.log(login_split[3]);

    console.log(hash.getHashedPassword(password));
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

  return res.status(404).send({
    success: false,
    error: "TESTING",
    status: false,
  });

  const userName = req.body.username;

  // Check if user exists. ********************************/

  const checkUser = await checkUserExist(req.body.username).catch();

  if (checkUser == null) {
    return res.status(404).send({
      success: false,
      error: "User not found",
      status: false,
    });
  }

  if (checkUser.password != req.body.password) {
    return res.status(404).send({
      success: false,
      error: "Username and password did not match. Please try again.",
      status: false,
    });
  }

  var user = new User({
    userName: req.body.username,
    password: req.body.password,
  });

  user.save(function (err, response) {
    if (err) {
      return next(err);
    }

    res
      .json({
        message: "success",
        username: checkUser.userName,
        id: checkUser._id,
        status: true,
      })
      .send();
  });
};

const checkUserExist = async (userName) => {
  try {
    let result = await User.findOne({ userName: userName }).exec();
    return result;
  } catch (error) {}
};

// Handle user registration on POST.
exports.create = async function (req, res, next) {
  body("*").trim().escape();

  const username = req.body.username;
  const password = req.body.password;
  const phone = req.body.phone;
  const email = req.body.email;

  console.log(req.body);
  let check = checkfields(req.body);
  console.log(check);
  console.log("CHECK");

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

  console.log(register);
  console.log("register");

  if (register.status === true) {
    console.log("SII");
    return res.json({
      status: true,
      message: "success",
      token: register.token,
    });
  } else {
    console.log("NOPE");
    return res.status(404).send({
      status: false,
      error: register.message,
      token: null,
    });
  }

  console.log("OHI");
  return res.status(404).send({
    success: false,
    error: "TESTING",
    status: false,
  });

  // Check if user exists. ********************************/

  const checkUser = await checkUserExist(req.body.username).catch();

  if (checkUser != null) {
    return res.status(404).send({
      success: false,
      error: "User name already registered. Kindly try another one!",
    });
  }

  var user = new User({
    userName: req.body.username,
    password: req.body.password,
  });

  user.save(function (err, response) {
    if (err) {
      return next(err);
    }

    res
      .json({
        message: "success",
        username: req.body.username,

        status: true,
      })
      .send();
  });
};

function checkfields(body) {
  let result = [];
  Object.keys(body).map((e) => {
    if (e === "email") {
      if (!emailIsValid(body[e])) {
        console.log("NOT VALID___");
        result.push("email");
      }
    } else if (e === "phone") {
      if (!validatePhone(body[e])) {
        console.log("NOT VALID___");
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
  console.log(req.body);
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
