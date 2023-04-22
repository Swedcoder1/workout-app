import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { ExerciseSchema } from "./exerciseSchema";
import { WorkoutTitle } from "./exerciseSchema";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { capitalizeFirst } from "./capitalizeFirstLetter";

//checked and commented

const CreateWorkout = ({ setOpenModal }) => {
  const [exercises, setExercises] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const deleteExercise = (index) => {
    //This will log an error message to the console if the index is out of range and prevent the function from trying to delete an element that doesn't exist.
    if (index < 0 || index >= exercises.length) {
      console.error("Index out of range");
      return;
    }

    setExercises((oldValues) => oldValues.filter((_, i) => i !== index));
  };

  //Create workout by sending the exercise value to the backend. Then navigate to the dashboard again and reload the page after 1500ms.
  const createProgram = (values) => {
    //Gets user to add the new created workout for the right user.
    const user = JSON.parse(sessionStorage.getItem("user"));
    const username = user.username;
    const workoutName = values;

    axios({
      method: "post",
      url: "https://workout-app-beige.vercel.app/createprogram",
      headers: {
        "content-type": "application/json",
      },
      data: { username, workoutName, exercises },
    })
      .then((response) => {
        setSuccessMessage(response.data.message);
        setTimeout(() => {
          navigate("/dashboard");
          window.location.reload();
        }, 1500);
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  return (
    <div>
      <Link to="/dashboard" className="ml-3 mt-2 inline-block text-lg">
        Back
      </Link>
      <h1 className="mt-10 text-center text-3xl font-semibold">
        Create Workout
      </h1>
      {successMessage && (
        <p className="m-auto w-1/4 rounded-md bg-green-500 p-2 text-center text-xl text-white ">
          {successMessage}
        </p>
      )}
      {errorMessage && (
        <p className="text-center text-red-500">Oops couldn´t save program</p>
      )}
      <div className="mt-4 sm:mt-10">
        {/* Exercise form, to add the excercises in the workout */}
        <Formik
          initialValues={{
            exercisename: "",
            repetition: "",
            sets: "",
          }}
          validationSchema={ExerciseSchema}
          onSubmit={(values, { resetForm }) => {
            setExercises((exercises) => [...exercises, values]);
            resetForm();
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="flex flex-wrap justify-center text-center sm:flex-row">
                <div>
                  <p>Exercise name</p>

                  <Field
                    name="exercisename"
                    type="text"
                    className="rounded-md border-blue-500 bg-white py-2 pl-2 text-start placeholder-gray-600 outline outline-1 outline-blue-600 focus:outline-2 sm:py-3"
                  />
                  {errors.exercisename && touched.exercisename ? (
                    <div>{errors.exercisename}</div>
                  ) : null}
                </div>

                <div>
                  <p>Repetitions</p>

                  <Field
                    name="repetition"
                    type="number"
                    className="mx-2 rounded-md border-blue-500 bg-white py-2 pl-2 text-center placeholder-gray-600 outline outline-1 outline-blue-600 focus:outline-2  sm:py-3"
                  />
                  {errors.repetition && touched.repetition ? (
                    <div>{errors.repetition}</div>
                  ) : null}
                </div>
                <div>
                  <p>Sets</p>
                  <Field
                    name="sets"
                    type="number"
                    className="rounded-md border-blue-500 bg-white py-2 pl-2 text-center placeholder-gray-600 outline outline-1 outline-blue-600 focus:outline-2 sm:py-3"
                  />
                  {errors.sets && touched.sets ? (
                    <div>{errors.sets}</div>
                  ) : null}
                </div>
              </div>
              <div className="mt-2 flex justify-center sm:mt-4">
                <button
                  type="submit"
                  className="w-4/12 rounded-md border border-transparent bg-indigo-600 py-3 text-white  hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-2/12 "
                >
                  Add
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <div className="mt-10 sm:mt-12">
        <div className="m-auto mt-4 flex w-11/12 items-end justify-between pb-4 sm:w-3/4 lg:w-2/4 lg:pr-4">
          <div>
            {exercises.length > 0 && <p>{exercises.length} exercise(s)</p>}
          </div>
          {exercises.length >= 1 && (
            <div className="flex">
              {/* Form to add a workouttitle */}
              <Formik
                initialValues={{
                  workoutTitle: "",
                }}
                validationSchema={WorkoutTitle}
                onSubmit={(values) => {
                  createProgram(values.workoutTitle);
                }}
              >
                {({ errors, touched, values }) => (
                  <Form>
                    <Field
                      name="workoutTitle"
                      type="text"
                      className="rounded-md border-blue-500 py-2 pl-2 placeholder-gray-500 outline outline-1 outline-blue-600 focus:outline-2 sm:py-3 "
                    />
                    {errors.workoutTitle && touched.workoutTitle ? (
                      <div>{errors.workoutTitle}</div>
                    ) : null}
                    {values.workoutTitle && (
                      <button
                        type="submit"
                        className="ml-2 rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        Save
                      </button>
                    )}
                  </Form>
                )}
              </Formik>
            </div>
          )}
        </div>

        {/* Maping over the exercises in the workout and displaying them */}
        <div className="max-h-52 overflow-y-scroll md:max-h-64 lg:max-h-64">
          {exercises.map((exercise, index) => (
            <div
              key={index}
              className="m-auto mt-4 w-11/12 rounded-md bg-gray-50 py-4 shadow-md sm:w-3/4 lg:w-2/4"
            >
              <div className="flex justify-around">
                <div className="w-1/3">
                  <p className="text-gray-400">Exercise name</p>
                  <p className="text-lg">
                    {capitalizeFirst(exercise.exercisename)}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400">Repetitions</p>
                  <p className="text-center">{exercise.repetition}</p>
                </div>
                <div>
                  <p className="text-gray-400">Sets</p>
                  <p className="text-center">{exercise.sets}</p>
                </div>
                <button
                  onClick={() => deleteExercise(index)}
                  className="text-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreateWorkout;
