import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { LoginSchema } from "./schema";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";

const Login = ({ setUser }) => {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or
            <Link
              to="/sign-up"
              className="ml-1 font-medium text-indigo-600 hover:text-indigo-500"
            >
              Register here!
            </Link>
          </p>
        </div>
        <Formik
          initialValues={{
            username: "",
            password: "",
          }}
          validationSchema={LoginSchema}
          onSubmit={(values) => {
            axios({
              method: "post",
              url: "https://workout-app-beige.vercel.app/login",
              headers: {
                "content-type": "application/json",
              },
              data: values,
            })
              .then((response) => {
                //Get token and set as a cookie to get the user access to login.
                cookies.set("Token", response.data.token, {
                  path: "/",
                });
                const userDetail = JSON.stringify({
                  username: response.data.username,
                  email: response.data.email,
                });
                sessionStorage.setItem("user", userDetail);
                navigate("/dashboard");
                window.location.reload();
              })
              .catch((error) => {
                console.log(error);
                console.log(error.response.data);
                setErrorMessage(error.response.data);
              });
          }}
        >
          {({ errors, touched }) => (
            <Form>
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
                name="password"
                type="password"
                placeholder="Password"
                autoComplete="current-password"
                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              />
              {errors.password && touched.password ? (
                <div>{errors.password}</div>
              ) : null}
              <button
                type="submit"
                className="group relative mt-4 flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Login
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
