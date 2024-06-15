import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { loginFormValidation } from "@/utils/FormValidation";
import { toast } from "react-toastify";

const LoginPage = () => {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, [isLoading]);

  const Formik = useFormik({
    initialValues: {
      username_or_email: "",
      password: "",
    },
    validationSchema: loginFormValidation,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("username_or_email", values.username_or_email);
      formData.append("password", values.password);
      formData.append("token", "");
      try {
        const res = await fetch("http://192.168.100.123:5000/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: formData,
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
    <form onSubmit={Formik.handleSubmit} noValidate>
      <div
        className={`flex flex-col transition-opacity duration-1000 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
      >
        <h1 className="font-bold size-8 text-2xl mb-4 text-primary">
          Welcome!
        </h1>
        <label htmlFor="username_or_email">Username/Email:</label>
        <input
          id="username_or_email"
          name="username_or_email"
          placeholder=" Enter Username or Email"
          className="text-center border-primary border-2 rounded-md w-80 h-8"
          onChange={Formik.handleChange}
          value={Formik.values.username_or_email}
        />
        {Formik.errors.username_or_email && Formik.touched.username_or_email ? (
          <span className="text-speciale">
            {Formik.errors.username_or_email}
          </span>
        ) : null}
        <label htmlFor="password" className="mt-2">
          Password:
        </label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Enter Password"
          className="text-center border-primary border-2 rounded-md w-80 h-8"
          onChange={Formik.handleChange}
          value={Formik.values.password}
        />
        {Formik.errors.password && Formik.touched.password ? (
          <span className="text-speciale max-w-80">
            {Formik.errors.password}
          </span>
        ) : null}
        <button
          type="submit"
          className="mt-5 w-full h-8 text-lg bg-primary rounded-md hover:bg-secondary hover:text-black transition duration-1000 text-normal-1"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Login"}
        </button>
      </div>
    </form>
  );
};

export default LoginPage;
