import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { axiosClient } from "../../axios.client";
import { useContext } from "react";
import AuthContext from "../../Context/AuthContext";

export const Login = () => {
  const navigate = useNavigate();
  const { setToken, setUser } = useContext(AuthContext);

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
    axiosClient.get("sanctum/csrf-cookie").then(() => {
      axiosClient
        .post("api/v1/login", {
          email: data.email,
          password: data.password,
        })
        .then((res) => {
          setToken(res.data.token);
          setUser(res.data.user);
          localStorage.setItem("ACCESS_TOKEN", res.data.token);
          navigate("/");
        })
        .catch((error) => {
          const errors = error.response.data;
          setError("password", { message: errors.message });
        });
    });
  };

  return (
    <div className="h-3/4 flex justify-center items-center">
      <form
        className="flex flex-col border w-2/5 p-10 border-gray-200 shadow-lg"
        onSubmit={handleSubmit(onLogin)}
      >
        <h1 className="text-2xl text-center font-semibold">Login</h1>

        <input
          className="formField"
          type="email"
          id="email"
          placeholder="Email"
          {...register("email")}
        />
        <p className="errorField">{errors.email?.message}</p>

        <input
          className="formField"
          type="password"
          id="password"
          placeholder="Password"
          {...register("password")}
        />
        <p className="errorField">{errors.password?.message}</p>

        <button className="mt-6 submitBtn" type="submit">
          Sign In
        </button>
        <div className="flex space-x-2 mt-6 justify-center items-center">
          <p>Not sign up yet?</p>
          <Link
            to={"/register"}
            className={"text-blue-500 hover:text-blue-700"}
          >
            Create an account
          </Link>
        </div>
      </form>
    </div>
  );
};
