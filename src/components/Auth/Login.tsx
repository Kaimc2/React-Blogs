import { yupResolver } from "@hookform/resolvers/yup";
import axios, { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";

export const Login = () => {
  const navigate = useNavigate();
  const schema = yup.object().shape({
    email: yup.string().email().required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
  });

  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const http = axios.create({
    baseURL: "http://127.0.0.1:8000/",
    headers: {
      "X-Requested-With": "XMLHttpRequest",
    },
    withCredentials: true,
  });

  const onLogin = async (data: any) => {
    try {
      let user = await http.post("api/v1/login", {
        email: data.email,
        password: data.password,
      });
      // navigate("/");
      console.log(user);
    } catch (error) {
      setError("root.serverError", {
        type: "manual",
        message: error instanceof AxiosError && error.response?.data.message,
      });
    }
  };

  return (
    <div className="h-3/4 flex justify-center items-center">
      <form
        className="flex flex-col border w-2/5 p-10 border-gray-200 shadow-lg"
        onSubmit={handleSubmit(onLogin)}
      >
        <h1 className="text-2xl text-center font-semibold">Login</h1>
        <input
          className="mt-6 py-2 border border-gray-300 pl-4 shadow-lg rounded-md"
          type="email"
          id="email"
          placeholder="Email"
          {...register("email")}
        />
        <p className="mt-2 text-sm text-red-500 ml-2">
          {errors.email?.message || errors.root?.serverError.message}
        </p>
        <input
          className="mt-6 py-2 border border-gray-300 pl-4 shadow-lg rounded-md"
          type="password"
          id="password"
          placeholder="Password"
          {...register("password")}
        />
        <p className="mt-2 text-sm text-red-500 ml-2">
          {errors.password?.message}
        </p>
        <button
          className="mt-6 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700"
          type="submit"
        >
          Sign In
        </button>
        <div className="flex space-x-2 mt-6 items-center">
          <p className="text-sm">Not sign up yet?</p>
          <Link
            to={"/register"}
            className={"text-blue-500 hover:text-blue-700"}
          >
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
};
