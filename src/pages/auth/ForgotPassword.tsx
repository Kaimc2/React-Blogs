import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { axiosClient } from "../../utils/axios.client";
import { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

export const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const schema = yup.object().shape({
    email: yup.string().email().required("Email is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    setLoading(true);
    axiosClient
      .post("/api/forgot-password", data)
      .then((res) => {
        console.log(res);
        setMessage(res.data.status);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  return (
    <div className="h-[31rem] md:h-[47.5rem] flex justify-center items-center">
      <form
        className="w-full flex flex-col border md:w-2/5 p-10 border-gray-200 shadow-lg"
        onSubmit={handleSubmit(onSubmit)}
      >
        {message && <div className="w-full bg-blue-500 p-2 rounded text-white mb-5">{message}</div>}
        <h1 className="text-2xl text-center font-semibold">
          Forgot your password
        </h1>
        <p className="mt-8">
          Please enter the email address you'd like your password reset
          information sent to
        </p>

        <input
          className="form-field"
          type="email"
          id="email"
          placeholder="Email"
          {...register("email")}
        />
        <p className="error-field">{errors.email?.message}</p>

        <button disabled={loading} className="mt-6 submit-btn" type="submit">
          {loading ? (
            <ClipLoader size={17} color="white" />
          ) : (
            "Request reset link"
          )}
        </button>
        <div className="flex mt-6 justify-center items-center">
          <Link
            to={"/login"}
            className={"text-blue-500 hover:text-blue-700 hover:underline"}
          >
            Back to login
          </Link>
        </div>
      </form>
    </div>
  );
};
