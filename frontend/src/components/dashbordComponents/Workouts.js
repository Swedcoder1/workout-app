import React, { useState, useEffect } from "react";
import axios from "axios";
import ShowWorkout from "./ShowWorkout";
import { Link } from "react-router-dom";

//Commented, look over overflow-scroll

const Workouts = () => {
  const [workoutProgram, setWorkoutProgram] = useState([]);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [exerciseDeleteMessage, setExerciseDeleteMessage] = useState(false);
  const [exerciseDeleteError, setExerciseDeleteError] = useState(false);

  useEffect(() => {
    setLoading(true);
    const user = JSON.parse(sessionStorage.getItem("user"));
    const username = user.username;

    axios({
      method: "get",
      url: "https://workout-app-beige.vercel.app/get-workouts",
      headers: {
        "content-type": "application/json",
      },
      params: { username },
    })
      .then((response) => {
        setWorkoutProgram(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setErrorMessage(error.message);
      });
  }, [success]);

  return (
    <div className="mt-4 text-center">
      <h1 className="text-3xl font-semibold">Your workouts</h1>
      <Link
        to="/dashboard/create-program"
        className="m-auto mt-10 mb-2 block w-1/2 rounded-md bg-indigo-600 py-3 font-medium text-white hover:bg-indigo-700 sm:w-1/3"
      >
        Create exercise
      </Link>

      {/* When a exercise gets deleted */}
      {exerciseDeleteMessage && (
        <p className="m-auto w-1/4 rounded-md bg-green-500 p-2 text-center text-xl text-white">
          Exercise deleted
        </p>
      )}

      {/* Error message if exercise couldn´t be deleted */}
      {exerciseDeleteError && (
        <p className="text-lg text-red-500">Couldn´t delete exercise</p>
      )}

      {/* Error message if the workouts can´t be fetched */}
      {errorMessage && <p className="text-lg text-red-500">{errorMessage}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="h-96 overflow-y-scroll">
          {workoutProgram.map((workout, index) => {
            return (
              <ShowWorkout
                workout={workout}
                index={index}
                setSuccess={setSuccess}
                key={workout._id}
                setWorkoutProgram={setWorkoutProgram}
                workoutProgram={workoutProgram}
                setExerciseDeleteMessage={setExerciseDeleteMessage}
                setExerciseDeleteError={setExerciseDeleteError}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Workouts;
