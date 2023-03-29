import React, { useState } from "react";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import { ExerciseSchema } from "./exerciseSchema";
import Edit from "./Edit";
import DeleteExercise from "./DeleteExercise";
import { TbEdit } from "react-icons/tb";
import { TbTrash } from "react-icons/tb";
import DeleteWorkoutModal from "./DeleteWorkoutModal";
import { capitalizeFirst } from "./capitalizeFirstLetter";

const ShowWorkout = ({
  workout,
  setSuccess,
  setWorkoutProgram,
  workoutData,
  workoutProgram,
  setExerciseDeleteMessage,
}) => {
  const [programToggle, setProgramToggle] = useState(false);
  const [toggleEdit, setToggleEdit] = useState(false);
  const [update, SetUpdate] = useState(0);
  const [deleteToggle, setDeleteToggle] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const deleteWorkout = (workout) => {
    const workoutId = workout._id;
    const updateData = workoutProgram.filter((workout) => {
      return workout._id !== workoutId;
    });
    setWorkoutProgram(updateData);
    axios({
      method: "delete",
      url: "http://localhost:5000/delete-workout",
      headers: {
        "content-type": "application/json",
      },
      data: { workoutId },
    })
      .then((response) => {
        console.log(response);
        setSuccess(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEdit = (exercise) => {
    const workoutId = exercise._id;
    setToggleEdit(true);
    SetUpdate(workoutId);
  };

  return (
    <div className="m-auto mt-8 rounded-md bg-gray-50 py-4 shadow-md hover:shadow-lg sm:w-3/4 lg:w-2/4">
      <h2
        className="text-xl font-semibold hover:cursor-pointer"
        onClick={() => setProgramToggle((prev) => !prev)}
      >
        {capitalizeFirst(workout.workoutName)}
      </h2>
      {workout.exercises.map(
        (exercise, index) =>
          programToggle &&
          (toggleEdit && update === exercise._id ? (
            <Edit
              exercise={exercise}
              setToggleEdit={setToggleEdit}
              setWorkoutProgram={setWorkoutProgram}
              workoutData={workoutData}
              workoutProgram={workoutProgram}
              update={update}
              key={index}
              setErrorMessage={setErrorMessage}
            />
          ) : (
            <div key={exercise._id}>
              {errorMessage && (
                <p className="text-red-500">Oops couldn´t save changes</p>
              )}
              <div className="m-auto mt-4 flex items-end justify-around">
                <div className="w-3/12">
                  <p className="text-gray-400">Exercise name</p>
                  <p className="text-xl">
                    {capitalizeFirst(exercise.exercisename)}
                  </p>
                </div>

                <div className="w-2/12">
                  <p className="text-gray-400">Repetitions</p>
                  <p className="text-center text-xl">{exercise.repetition}</p>
                </div>
                <div className="w-2/12">
                  <p className="text-gray-400">Sets</p>
                  <p className="text-center text-xl">{exercise.sets}</p>
                </div>

                <div>
                  <button
                    onClick={() => handleEdit(exercise)}
                    className="mr-2 text-3xl"
                  >
                    <TbEdit />
                  </button>
                  <DeleteExercise
                    exercise={exercise}
                    workoutProgram={workoutProgram}
                    setWorkoutProgram={setWorkoutProgram}
                    workout={workout}
                    setExerciseDeleteMessage={setExerciseDeleteMessage}
                  />
                </div>
              </div>
            </div>
          ))
      )}
      {programToggle && (
        <div>
          {deleteToggle ? (
            <DeleteWorkoutModal
              deleteWorkout={deleteWorkout}
              workout={workout}
              setDeleteToggle={setDeleteToggle}
            />
          ) : (
            <button
              onClick={() => setDeleteToggle((prev) => !prev)}
              className="z-10 mt-6 text-red-500"
            >
              Delete workout
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ShowWorkout;
