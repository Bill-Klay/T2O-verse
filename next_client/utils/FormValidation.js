import * as Yup from "yup";

export const loginFormValidation = Yup.object({
  username_or_email: Yup.string()
    .test(
      "username_or_email",
      "Must be a valid email or username",
      function (value) {
        if (!value) return false;

        // Email regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValidEmail = emailRegex.test(value);

        // Username regex
        const usernameRegex = /^[a-zA-Z0-9_]{3,30}$/;
        const isValidUsername = usernameRegex.test(value);

        return isValidEmail || isValidUsername;
      }
    )
    .required("Username or email is required"),
  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$%*?&])[A-Za-z\d@$%*?&]{8,}$/,
      "Invalid Format"
    )
    .required("Password is required"),
});

export const signupFormValidation = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  username: Yup.string()
    .matches(
      /^[a-zA-Z0-9_]{3,30}$/,
      "Username must be 3-30 characters long and can only contain letters, numbers, and underscores"
    )
    .required("Username is required"),
  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$%*?&])[A-Za-z\d@$%*?&]{8,}$/,
      "Password must contain at least 8 characters, one uppercase, one lowercase, one number, and one special character"
    )
    .required("Password is required"),
});
