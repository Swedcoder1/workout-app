import * as Yup from "yup";

export const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, "Too Short!")
    .max(20, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(5, "Too Short! Must be atleast 5 characters")
    .max(20, "Too Long! Must be under 20 characters")
    .required("Required"),
});

export const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, "Too Short!")
    .max(20, "Too Long!")
    .required("Required"),
  password: Yup.string()
    .min(5, "Too Short! Must be atleast 5 characters")
    .max(20, "Too Long! Must be under 20 characters")
    .required("Required"),
});
