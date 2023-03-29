import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { SignupSchema } from "./schema";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div class="w-full max-w-md space-y-8">
          <div>
            <div>
              <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                Register your account
              </h2>
              <p className="mt-2 text-center text-sm text-gray-600">
                Already have a account?
                <Link
                  to="/"
                  className="ml-1 font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
          <Formik
            initialValues={{
              username: "",
              email: "",
              password: "",
            }}
            validationSchema={SignupSchema}
            onSubmit={(values) => {
              axios({
                method: "post",
                url: "http://localhost:5000/register",
                headers: {
                  "content-type": "application/json",
                },
                data: values,
              })
                .then((response) => {
                  setSuccess(true);

                  setTimeout(() => {
                    setSuccess(false);
                    navigate("/");
                  }, 1500);
                })
                .catch((error) => {
                  setErrorMessage(error.response.data);
                });
            }}
          >
            {({ errors, touched }) => (
              <Form>
                {success && (
                  <p className="rounded-md bg-green-500 p-2 text-center text-xl text-white ">
                    Registration successful
                  </p>
                )}
                {errorMessage && (
                  <p className="text-center text-lg text-red-500">
                    {errorMessage}
                  </p>
                )}
                <Field
                  name="username"
                  type="text"
                  placeholder="Username"
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                />
                {errors.username && touched.username ? (
                  <div>{errors.username}</div>
                ) : null}
                <Field
                  name="email"
                  type="email"
                  placeholder="Email"
                  autocomplete="email"
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                />
                {errors.email && touched.email ? (
                  <div>{errors.email}</div>
                ) : null}
                <Field
                  name="password"
                  type="password"
                  placeholder="Password"
                  autocomplete="current-password"
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                />
                {errors.password && touched.password ? (
                  <div>{errors.password}</div>
                ) : null}
                <button
                  type="submit"
                  className="group relative mt-4 flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Create account
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default SignUp;
