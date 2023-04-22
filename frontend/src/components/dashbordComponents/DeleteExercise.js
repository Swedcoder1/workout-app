import React from "react";
import axios from "axios";
import { TbTrash } from "react-icons/tb";

const DeleteExercise = ({
  exercise,
  workoutProgram,
  setWorkoutProgram,
  workout,
  setExerciseDeleteMessage,
  setExerciseDeleteError,
}) => {
  const deleteExercise = () => {
    const workoutId = workout._id;
    const exerciseId = exercise._id; // ID of the exercise object to delete

    //Delete exercise in the workout
    const updatedData = workoutProgram
      .map((workout) => {
        if (workout._id === workoutId) {
          const updatedExercises = workout.exercises.filter((exercise) => {
            return exercise._id !== exerciseId;
          });

          if (updatedExercises.length === 0) {
            // If there are no exercises left, remove the entire workout
            return null;
          }

          return { ...workout, exercises: updatedExercises };
        } else {
          return workout;
        }
      })
      .filter((workout) => workout !== null); // Remove any null values (i.e., deleted workouts)

    setWorkoutProgram(updatedData);

    //Send data to backend and to database
    axios({
      method: "delete",
      url: "https://workout-app-beige.vercel.app/delete-exercise",
      headers: {
        "content-type": "application/json",
      },
      data: { exerciseId, workoutId },
    })
      .then((response) => {
        console.log(response);
        setExerciseDeleteMessage(true);
        setInterval(() => {
          setExerciseDeleteMessage(false);
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
        setExerciseDeleteError(true);
        setInterval(() => {
          setExerciseDeleteError(false);
        }, 2000);
      });
  };

  return (
    <button onClick={() => deleteExercise()} className="text-3xl text-red-500">
      <TbTrash />
    </button>
  );
};

export default DeleteExercise;
