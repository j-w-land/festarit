const fs = require("fs").promises;
const util = require("util");
const readFile = util.promisify(fs.readFile);

exports.getPrices = async function () {
  const tickets = await fs.readFile(
    "./database/files/storeTicketPrices.txt",
    "utf-8"
  );
  console.log(tickets);
  const extras = await fs.readFile("./database/files/storeExtras.txt", "utf-8");
  console.log(extras);

  console.log("getPrices:::TTET");
  return { tickets: tickets, extras: extras };
};

/* fs.readFile("./database/files/users.txt", "utf-8", function (err, data) {
  try {
    if (err) {
      throw err;
    }
  } catch (err) {
    console.log("test_error1");
    console.log(err);
    return null;
  }
}) */
