/* eslint-disable prettier/prettier */
import * as yup from 'yup';

export const LoginSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Please enter your email")
  //   .matches(
  //     /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  //     "Invalid email format"
  // )
  ,

  password: yup
    .string()
    .required("Please enter your password")
});