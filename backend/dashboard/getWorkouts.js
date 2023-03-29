const router = require("express").Router();
const Exercises = require("../models/exercises");

router.get("/get-workouts", async (req, res) => {
  const user = req.query;

  //Get exerciseworkouts for specific user using their username.
  const userExercises = await Exercises.find({ username: user.username });
  if (userExercises) {
    res.status(200).json(userExercises);
  } else {
    res.status(400).json({ message: "Couldn´t load workouts" });
  }
});

module.exports = router;
