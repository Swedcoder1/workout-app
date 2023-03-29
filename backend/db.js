const mongoose = require("mongoose");
require("dotenv").config();
const uri = process.env.MONGODB_KEY;
mongoose.set("strictQuery", false);

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});
