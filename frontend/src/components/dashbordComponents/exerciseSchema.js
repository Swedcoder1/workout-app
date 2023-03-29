import * as Yup from "yup";

export const ExerciseSchema = Yup.object().shape({
  exercisename: Yup.string()
    .min(2, "Too Short!")
    .max(20, "Too Long!")
    .required("Required"),
  repetition: Yup.number()
    .min(0, "Must be over 0")
    .max(50, "Must be under 50")
    .positive()
    .required("Required"),
  sets: Yup.number()
    .min(0, "Must be over 0")
    .max(10, "Must be under 10")
    .positive()
    .required("Required"),
});

export const WorkoutTitle = Yup.object().shape({
  workoutTitle: Yup.string()
    .min(3, "Too short!")
    .max("20", "Too long!")
    .required("Required"),
});
