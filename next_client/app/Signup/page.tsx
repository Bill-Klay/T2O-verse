import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { signupFormValidation } from "@/utils/FormValidation";

const SignupPage = () => {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  const Formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      password: "",
    },
    validationSchema: signupFormValidation,
    onSubmit: async (values) => {
      console.log("Values:", JSON.stringify(values, null, 4));
      // Add your form submission logic here (e.g., API call)
    },
  });

  return (
    <div>
      <form
        onSubmit={Formik.handleSubmit}
        noValidate
        className={`flex flex-col transition-opacity duration-1000 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
      >
        <h1 className="font-bold size-8 text-2xl mb-4 w-full">
          Create Account:
        </h1>
        <div className="flex justify-between">
          <div className="flex flex-col">
            <label htmlFor="firstName">First Name:</label>
            <input
              id="firstName"
              name="firstName"
              placeholder="Enter First Name"
              className="text-center border-primary border-2 rounded-md h-8"
              onChange={Formik.handleChange}
              value={Formik.values.firstName}
            />
            {Formik.touched.firstName && Formik.errors.firstName ? (
              <div className="text-red-500">{Formik.errors.firstName}</div>
            ) : null}
          </div>
          <div className="flex flex-col">
            <label htmlFor="lastName">Last Name:</label>
            <input
              id="lastName"
              name="lastName"
              placeholder="Enter Last Name"
              className="text-center border-primary border-2 rounded-md h-8"
              onChange={Formik.handleChange}
              value={Formik.values.lastName}
            />
            {Formik.touched.lastName && Formik.errors.lastName ? (
              <div className="text-red-500">{Formik.errors.lastName}</div>
            ) : null}
          </div>
        </div>
        <div className="flex flex-col mt-2">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            name="email"
            placeholder="Enter Email"
            className="text-center border-primary border-2 rounded-md w-96 h-8"
            onChange={Formik.handleChange}
            value={Formik.values.email}
          />
          {Formik.touched.email && Formik.errors.email ? (
            <div className="text-red-500">{Formik.errors.email}</div>
          ) : null}
          <label htmlFor="username" className="mt-2">
            Username:
          </label>
          <input
            id="username"
            name="username"
            placeholder="Enter Username"
            className="text-center border-primary border-2 rounded-md w-96 h-8"
            onChange={Formik.handleChange}
            value={Formik.values.username}
          />
          {Formik.touched.username && Formik.errors.username ? (
            <div className="text-red-500">{Formik.errors.username}</div>
          ) : null}
          <label htmlFor="password" className="mt-2">
            Password:
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Enter Password"
            className="text-center border-primary border-2 rounded-md w-96 h-8"
            onChange={Formik.handleChange}
            value={Formik.values.password}
          />
          {Formik.touched.password && Formik.errors.password ? (
            <div className="text-red-500">{Formik.errors.password}</div>
          ) : null}
        </div>
        <button
          type="submit"
          className="mt-5 w-full h-8 text-lg bg-primary rounded-md hover:bg-secondary hover:text-black transition duration-1000 text-normal-1"
          disabled={isLoading} // Disable the button while loading
        >
          {isLoading ? "Loading..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default SignupPage;
