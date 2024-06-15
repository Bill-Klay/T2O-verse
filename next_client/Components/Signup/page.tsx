import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { signupFormValidation } from "@/utils/FormValidation";
import { toast } from "react-toastify";

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
      try {
        const res = await fetch("http://192.168.100.123:5000/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            first_name: values.firstName,
            last_name: values.lastName,
            username: values.username,
            email: values.email,
            password: values.password,
          }),
        });

        if (!res.ok) {
          const errorData = await res.json();
          let errorMessage = "Something Went Wrong!";
          if (errorData) {
            errorMessage = errorData.message;
          }
          throw new Error(errorMessage);
        }

        const data = await res.json();

        toast.success(`${data.message}`, {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } catch (error: any) {
        let errorMessage = "An error Occured";
        if (error.message) {
          errorMessage = error.message;
        }
        toast.error(`${errorMessage}`, {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
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
        <h1 className="font-bold size-8 text-2xl mb-4 w-full text-primary">
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
