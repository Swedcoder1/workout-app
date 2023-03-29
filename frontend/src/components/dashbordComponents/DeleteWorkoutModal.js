import React from "react";

const DeleteWorkoutModal = ({ deleteWorkout, workout, setDeleteToggle }) => {
  return (
    <div className="mt-6 text-lg">
      <p>Do you really want to delete the workout?</p>
      <button
        onClick={() => deleteWorkout(workout)}
        className="mr-4 rounded-md bg-red-500 py-1 px-2 text-white"
      >
        Delete
      </button>
      <button onClick={() => setDeleteToggle(false)}>Cancel</button>
    </div>
  );
};

export default DeleteWorkoutModal;
