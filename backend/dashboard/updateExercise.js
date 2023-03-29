const router = require("express").Router();
const Exercises = require("../models/exercises");

//Find the matching exercise with the exercis id and update the rest of the exercise values.
router.get("/updateExercise", async (req, res) => {
  const id = req.query.editExercise._id;
  const exercisename = req.query.editExercise.exercisename;
  const repetition = req.query.editExercise.repetition;
  const sets = req.query.editExercise.sets;
  try {
    let doc = await Exercises.findOneAndUpdate(
      { "exercises._id": id },
      {
        $set: {
          "exercises.$.exercisename": exercisename,
          "exercises.$.repetition": repetition,
          "exercises.$.sets": sets,
        },
      },
      {
        new: true,
      }
    );

    res.status(200).json({ message: "Successfully updated exercise" });
  } catch (error) {
    res.status(500).json({ message: "Oops, couldnt edit the exercise" });
  }
});

module.exports = router;
