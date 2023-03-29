const router = require("express").Router();
const auth = require("./auth");

router.get("/auth-endpoint", auth, (req, res) => {
  res.json({ message: "You are authorized to access me" });
});

module.exports = router;
