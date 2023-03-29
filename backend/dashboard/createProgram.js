const router = require("express").Router();
const Exercises = require("../models/exercises");

//Create program and saves it in mongDB
router.post("/createprogram", (req, res) => {
  const exerciseData = req.body;
  console.log(exerciseData);

  Exercises.insertMany(exerciseData, function (error, docs) {
    if (error) {
      res.status(500).json({ message: "Couldn´t save program" });
    }
    res.status(200).json({ message: "Program has been saved" });
  });
});

module.exports = router;
