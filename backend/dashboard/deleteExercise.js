const router = require("express").Router();
const Exercises = require("../models/exercises");

router.delete("/delete-exercise", (req, res) => {
  const exerciseId = req.body.exerciseId;
  const workoutId = req.body.workoutId;

  //Find the matching workout with the id and matching exercise with id and deleting the right exercise.
  Exercises.findOneAndUpdate(
    { _id: workoutId },
    { $pull: { exercises: { _id: exerciseId } } },
    { new: true }
  )
    .then((workout) => {
      if (workout.exercises.length === 0) {
        // If there are no exercises left, remove the entire workout
        return Exercises.findByIdAndDelete(workoutId);
      }
      return workout;
    })
    .then((updatedWorkout) => {
      // Handle updated workout
      res.status(200).json({ message: "Success" });
    })
    .catch((error) => {
      // Handle error
      res.status(500).json({ message: "Couldn´t delete exercise" });
    });
});

module.exports = router;
