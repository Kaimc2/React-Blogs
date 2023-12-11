import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import AuthContext from "../../context/AuthContext";

export const Register = () => {
  const navigate = useNavigate();
  const { setToken, setUser } = useContext(AuthContext);

  const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().email().required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
    confirmPassword: yup
      .string()
      .required("Confirm Password is required")
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

  const onRegister = async (data: any) => {
    await axios
      .post("http://127.0.0.1:8000/api/v1/register", {
        name: data.name,
        email: data.email,
        password: data.password,
        password_confirmation: data.confirmPassword,
      })
      .then((res) => {
        // console.log("user: " + JSON.stringify(res.data));
        setToken(res.data.token);
        setUser(res.data.user);
        localStorage.setItem("ACCESS_TOKEN", res.data.token);
        navigate("/");
      })
      .catch((error) => {
        const errors = error.response.data;
        setError("email", { message: errors.message });
      });
  };

  return (
    <div className="h-3/4 flex justify-center items-center">
      <form
        className="flex flex-col border w-2/5 p-10 border-gray-200 shadow-lg"
        onSubmit={handleSubmit(onRegister)}
      >
        <h1 className="text-2xl text-center font-semibold">Register</h1>
        <input
          className="formField"
          type="text"
          id="name"
          placeholder="Name"
          {...register("name")}
        />
        <p className="errorField">{errors.name?.message}</p>
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
        <input
          className="formField"
          type="password"
          id="confirmPassword"
          placeholder="Confirm Password"
          {...register("confirmPassword")}
        />
        <p className="errorField">{errors.confirmPassword?.message}</p>
        <button className="mt-6 submitBtn" type="submit">
          Register
        </button>
        <div className="flex justify-center space-x-2 mt-6 items-center">
          <p>Have an account?</p>
          <Link to={"/login"} className={"text-blue-500 hover:text-blue-700"}>
            Sign In
          </Link>
        </div>
      </form>
    </div>
  );
};
