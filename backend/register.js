const router = require("express").Router();
const User = require("./models/user");
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
  const user = req.body;

  //Check if the values already exist in the database.
  const takenUsername = await User.findOne({ username: user.username });
  const takenEmail = await User.findOne({ email: user.email });

  //If they already exist in the database, send error message the user already exist. Else the user gets created and sent to the databse.
  if (takenUsername || takenEmail) {
    res.status(500).json("User already exist");
  } else {
    user.password = await bcrypt.hash(req.body.password, 10);

    const dbUser = new User({
      username: user.username.toLowerCase(),
      email: user.email.toLowerCase(),
      password: user.password,
    });

    dbUser.save();
    res.status(200).json({ message: "Successful registration" });
  }
});

module.exports = router;
