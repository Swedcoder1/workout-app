const router = require("express").Router();
const User = require("./models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//compare username and password values ent to backend with the values in the database.If they match, the user gets sent a token to get access to the dashboard page.
router.post("/login", async (req, res) => {
  const user = req.body;
  let userId;
  const userLogin = await User.findOne({ username: user.username });

  if (userLogin && (await bcrypt.compare(user.password, userLogin.password))) {
    userId = userLogin._id.toString();

    const token = jwt.sign(
      {
        id: userId,
        email: user.email,
      },
      process.env.SECRET_TOKEN_KEY,
      {
        expiresIn: "1h",
      }
    );
    user.token = token;
    res.status(200).json({
      message: "Login successful",
      username: user.username,
      email: userLogin.email,
      token,
    });
  } else {
    res.status(400).json("Invalid credentials");
  }
});

module.exports = router;
