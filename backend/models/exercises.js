const mongoose = require("mongoose");

const exerciseSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    workoutName: {
      type: String,
      required: true,
    },
    exercises: [
      {
        exercisename: {
          type: String,
        },
        repetition: {
          type: Number,
        },
        sets: {
          type: Number,
        },
      },
    ],
  },
  { timestamps: true }
);

const Exercises = mongoose.model("Exercises", exerciseSchema);

module.exports = Exercises;
