const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
require("./db");

const register = require("./register.js");
const login = require("./login.js");
const dashboardRouter = require("./dashboard/dashboardRouter");

const urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(bodyParser.json(), urlencodedParser);

app.use(cors());

app.use("/", login);
app.use("/", register);
app.use("/", dashboardRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
