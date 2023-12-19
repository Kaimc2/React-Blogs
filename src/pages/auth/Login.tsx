import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { axiosClient } from "../../utils/axios.client";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import toast from "react-hot-toast";

export const Login = () => {
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
    <div className="h-[47.5rem] flex justify-center items-center">
      <form
        className="flex flex-col border md:w-2/5 p-10 border-gray-200 shadow-lg"
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
        <div className="flex space-x-2 mt-6 justify-center items-center">
          <p>Not sign up yet?</p>
          <Link
            to={"/register"}
            className={"text-blue-500 hover:text-blue-700 hover:underline"}
          >
            Create an account
          </Link>
        </div>
      </form>
    </div>
  );
};
