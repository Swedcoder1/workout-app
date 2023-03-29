const router = require("express").Router();
const Exercises = require("../models/exercises");

//Delete workout by matching id sent from frontend.
router.delete("/delete-workout", (req, res) => {
  const id = req.body.workoutId;

  Exercises.deleteOne({ _id: id })
    .then(function () {
      res.status(200).json({ message: "Workout deleted" });
    })
    .catch(function (error) {
      console.log(error);
      res.status(500).json({ message: "Couldn´t delete workout" });
    });
});

module.exports = router;
