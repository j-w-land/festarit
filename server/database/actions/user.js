let fs = require("fs");
const readline = require("readline");
let hash = require("./hash");

exports.register = async function (body) {
  let write = await readWriteAsync();
  return write;

  //name;email;phone;password;
  async function readWriteAsync() {
    let existingUser = await findUser(body.email);

    if (existingUser !== null)
      return {
        status: false,
        message: "Sähköposti rekisteröity jo palveluun.",
        token: null,
      };

    let newValue =
      body.username +
      ";" +
      body.email +
      ";" +
      body.phone +
      ";" +
      hash.getHashedPassword(body.password) +
      ";\n";

    fs.appendFile(
      "./database/files/users.txt",
      newValue,
      "utf-8",
      function (err) {
        try {
          if (err) throw err;
        } catch (err) {}
      }
    );
    let authToken = hash.generateAuthToken(body.email);
    return { status: true, token: authToken };
  }
};

exports.findOne = async function (email) {
  let res = await findUser(email);
  return res;
};

async function findUser(email) {
  const rl = readline.createInterface({
    input: fs.createReadStream("./database/files/users.txt"),
  });

  //https://stackoverflow.com/questions/43638105/how-to-get-synchronous-readline-or-simulate-it-using-async-in-nodejs
  for await (const line of rl) {
    try {
      if (line.split(";")[1] === email) {
        rl.removeAllListeners();
        return line;
      }
    } catch (error) {}
  }
  return null;
}

exports.authenticate = async function (token) {
  let res = await searchAuthTokens(token);
  return res;
};

async function searchAuthTokens(token) {
  const rl = readline.createInterface({
    input: fs.createReadStream("./database/files/authTokens.txt"),
  });

  for await (const line of rl) {
    try {
      if (line.split(";")[1] === token) {
        rl.removeAllListeners();
        return line;
      }
    } catch (error) {}
  }
  return null;
}
