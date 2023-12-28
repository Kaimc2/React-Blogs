import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { axiosClient } from "../../utils/axios.client";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import toast from "react-hot-toast";

export const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const schema = yup.object().shape({
    email: yup.string().email().required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
  });

  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onLogin = async (data: any) => {
    axiosClient
      .get("sanctum/csrf-cookie")
      .then(() => {
        login(data).catch((error) => {
          const errors = error.response.data;
          setError("password", { message: errors.message });
        });
      })
      .catch((error) => {
        console.log(error);
        toast.error("Login Failed");
      });
  };

  return (
    <div className="md:h-[47.5rem] my-5 md:my-0 flex justify-center items-center">
      <form
        className="w-full flex flex-col border md:w-2/5 p-10 border-gray-200 shadow-lg"
        onSubmit={handleSubmit(onLogin)}
      >
        <h1 className="text-2xl text-center font-semibold">Login</h1>

        <input
          className="form-field"
          type="email"
          id="email"
          placeholder="Email"
          {...register("email")}
        />
        <p className="error-field">{errors.email?.message}</p>

        <input
          className="form-field"
          type="password"
          id="password"
          placeholder="Password"
          {...register("password")}
        />
        <p className="error-field">{errors.password?.message}</p>

        <button className="mt-6 submit-btn" type="submit">
          Sign In
        </button>

        <div className="h-[0.3rem] mx-5 mt-4 rounded-md bg-gray-300 shadow-md" />

        <div className="flex flex-col md:flex-row md:space-x-2 mt-4 justify-evenly items-center">
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="border border-gray-300 p-2 w-full shadow-md rounded-md hover:bg-gray-100"
          >
            Create an account
          </button>

          <button
            type="button"
            onClick={() => navigate("/forgot-password")}
            className="mt-5 md:mt-0 border border-gray-300 p-2 w-full shadow-md rounded-md hover:bg-gray-100"
          >
            Reset password
          </button>
        </div>
      </form>
    </div>
  );
};
