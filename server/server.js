const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let userRouter = require("./routes/user");
let storeRouter = require("./routes/store");

// serve react build from the server
app.use(express.static(path.join(__dirname, "..", "client", "build")));

app.use("/api/user", userRouter);
app.use("/api/store", storeRouter);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`server listenin on ${PORT}`);
});
