import * as yup from "yup";

const registerValidationSchema = yup.object({
  body: yup.object({
    name: yup
      .string()
      .required("Name is required"),

    email: yup
      .string()
      .email("Invalid email address")
      .required("Email is required"),

    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  }),
});

export const AuthValidation = {
  registerValidationSchema,
};