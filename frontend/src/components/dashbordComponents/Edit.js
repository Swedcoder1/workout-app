import React, { useState } from "react";
import axios from "axios";
import { BiSave } from "react-icons/bi";
import { MdOutlineCancel } from "react-icons/md";

//Commented and checked
const Edit = ({
  exercise,
  setToggleEdit,
  setWorkoutProgram,
  workoutProgram,
  setErrorMessage,
}) => {
  const [editExercise, setEditExercise] = useState(exercise);
  const exerciseId = exercise._id;

  const handleChange = (e) => {
    // Update the exercisevalue.
    setEditExercise({ ...editExercise, [e.target.name]: e.target.value });
  };

  //Save exercise change in database
  const saveUpdate = (editExercise) => {
    console.log("new exercise:" + JSON.stringify(editExercise));

    axios({
      method: "get",
      url: "http://localhost:5000/updateExercise",
      headers: {
        "content-type": "application/json",
      },
      params: { editExercise },
    })
      .then((response) => {
        //Updates the usestate of the workout and exercise.
        setWorkoutProgram(
          workoutProgram.map((workout) => {
            return {
              ...workout, //Keeps the workouts as they are
              exercises: workout.exercises.map((exercise) => {
                if (exercise._id === exerciseId) {
                  //If found the right exerciseid from the workout with the exerciseid from user input then change the exercise else stay as it was.
                  return {
                    ...exercise,
                    ...editExercise,
                  };
                } else {
                  return exercise;
                }
              }),
            };
          })
        );
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage(error.message);
        setInterval(() => {
          setErrorMessage("");
        }, 1500);
      });

    setToggleEdit(false);
  };

  return (
    <div key={exercise._id}>
      <div className="mt-4 flex items-end justify-around">
        <div className="w-3/12">
          <p className="text-gray-400">Exercise name</p>
          <input
            type="text"
            name="exercisename"
            defaultValue={exercise.exercisename}
            onChange={handleChange}
            className="w-full rounded-sm text-center text-xl outline outline-1 outline-gray-400"
          />
        </div>

        <div className="w-2/12">
          <p className="text-gray-400">Repetitions</p>
          <input
            type="text"
            name="repetition"
            defaultValue={exercise.repetition}
            onChange={handleChange}
            className="w-8/12 rounded-sm text-center text-xl  outline outline-1 outline-gray-400"
          />
        </div>
        <div className="w-2/12">
          <p className="text-gray-400">Sets</p>
          <input
            type="text"
            name="sets"
            defaultValue={exercise.sets}
            onChange={handleChange}
            className="w-8/12 rounded-sm text-center text-xl outline outline-1 outline-gray-400 "
          />
        </div>

        <div className="flex">
          <button
            onClick={() => saveUpdate(editExercise)}
            className="mr-3 text-3xl"
          >
            <BiSave />
          </button>
          <button
            onClick={() => setToggleEdit(false)}
            className="text-3xl text-red-500"
          >
            <MdOutlineCancel className="items-baseline" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Edit;
