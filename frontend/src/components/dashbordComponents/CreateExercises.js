import React, { useState } from "react";
import ExerciseModal from "./ExerciseModal";
import Workouts from "./Workouts";
import { Link } from "react-router-dom";

const CreateExercises = () => {
  const [openModal, setOpenModal] = useState(false);
  const createExercise = () => {
    setOpenModal(true);
  };
  return (
    <div>
      <div className="mt-10 text-center">
        <h1 className="text-3xl font-semibold">Your workouts</h1>
        <Link
          to="/dashboard/create-program"
          className="mt-10 w-1/2 rounded-md bg-indigo-600 py-3 font-medium text-white hover:bg-indigo-700 sm:w-1/4"
        >
          Create exercise
        </Link>
        <Workouts />
      </div>
    </div>
  );
};

export default CreateExercises;
