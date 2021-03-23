const fs = require("fs").promises;

exports.getPrices = async function () {
  const tickets = await fs.readFile(
    "./database/files/storeTicketPrices.txt",
    "utf-8"
  );

  const extras = await fs.readFile("./database/files/storeExtras.txt", "utf-8");

  return { tickets: tickets, extras: extras };
};
