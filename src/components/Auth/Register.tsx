import { yupResolver } from "@hookform/resolvers/yup";
import axios, { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";

export const Register = () => {
  const navigate = useNavigate();
  const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().email().required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
    confirmPassword: yup
      .string()
      .required("Password is required")
      .oneOf([yup.ref("password")], "Password does not match")
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

  const http = axios.create({
    baseURL: "http://127.0.0.1:8000/",
    headers: {
      "X-Requested-With": "XMLHttpRequest",
    },
    withCredentials: true,
  });

  const onRegister = async (data: any) => {
    try {
      await http
        .post("http://127.0.0.1:8000/api/v1/register", {
          name: data.name,
          email: data.email,
          password: data.password,
          password_confirmation: data.confirmPassword,
        })
      navigate("/");
    } catch (error) {
      setError("root.serverError", {
        type: "manual",
        message:
          error instanceof AxiosError
            ? error.response?.data.message
            : "The email has already been taken.",
      });
    }
  };

  return (
    <div className="h-3/4 flex justify-center items-center">
      <form
        className="flex flex-col border w-2/5 p-10 border-gray-200 shadow-lg"
        onSubmit={handleSubmit(onRegister)}
      >
        <h1 className="text-2xl text-center font-semibold">Register</h1>
        <input
          className="mt-6 py-2 border border-gray-300 pl-4 shadow-lg rounded-md"
          type="text"
          id="name"
          placeholder="Name"
          {...register("name")}
        />
        <p className="mt-2 text-sm text-red-500 ml-2">{errors.name?.message}</p>
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
        <input
          className="mt-6 py-2 border border-gray-300 pl-4 shadow-lg rounded-md"
          type="password"
          id="confirmPassword"
          placeholder="Confirm Password"
          {...register("confirmPassword")}
        />
        <p className="mt-2 text-sm text-red-500 ml-2">
          {errors.confirmPassword?.message}
        </p>
        <input type="hidden" name="csrf-token" value="{{{ csrf_token() }}}" />
        <button
          className="mt-6 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700"
          type="submit"
        >
          Register
        </button>
        <div className="flex space-x-2 mt-6 items-center">
          <p className="text-sm">Already sign up?</p>
          <Link to={"/login"} className={"text-blue-500 hover:text-blue-700"}>
            Sign In
          </Link>
        </div>
      </form>
    </div>
  );
};
