const router = require("express").Router();
const createProgram = require("./createProgram");
const getWorkouts = require("./getWorkouts.js");
const deleteWorkout = require("./deleteWorkout.js");
const updateExercise = require("./updateExercise.js");
const deleteExercise = require("./deleteExercise.js");

//Routing for the functions for creating, sending, deleting, updating the workouts/exercises.
router.use("/", createProgram);
router.use("/", getWorkouts);
router.use("/", deleteWorkout);
router.use("/", updateExercise);
router.use("/", deleteExercise);

module.exports = router;
