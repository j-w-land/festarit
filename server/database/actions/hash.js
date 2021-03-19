const crypto = require("crypto");
const fs = require("fs");

//https://stackabuse.com/handling-authentication-in-express-js/

exports.getHashedPassword = (password) => {
  const sha256 = crypto.createHash("sha256");
  const hash = sha256.update(password).digest("base64");
  return hash;
};

//todo: tarkista löytyykö käyttäjältä tokenia
//poista vanhentuneet tokenit..
exports.generateAuthToken = (email) => {
  let token = crypto.randomBytes(30).toString("hex");

  let newValue = email + ";" + token + ";" + Date.now() + ";\n";

  fs.appendFile(
    "./database/files/authTokens.txt",
    newValue,
    "utf-8",
    function (err) {
      try {
        if (err) throw err;
      } catch (err) {}
    }
  );

  return token;
};
