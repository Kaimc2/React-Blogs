import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import { axiosClient } from "../../utils/axios.client";
import { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import toast from "react-hot-toast";

export const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const schema = yup.object().shape({
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
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    console.log(data);
    setLoading(true);
    const formData = new FormData()

    formData.append('email', data.email);
    formData.append('password', data.password);
    formData.append('password_confirmation', data.confirmPassword)
    formData.append('token', String(token));

    axiosClient
      .post("/api/reset-password", formData)
      .then((res) => {
        console.log(res);
        toast.success(res.data.status);
        setLoading(false);
        navigate('/login');
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  return (
    <div className="h-[31rem] md:h-[47.5rem] flex justify-center items-center dark:bg-slate-900 dark:text-slate-300">
      <form
        className="w-full flex flex-col border md:w-2/5 p-10 border-gray-200 shadow-lg dark:bg-slate-800 dark:border-none"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-2xl text-center font-semibold">Reset password</h1>

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
        <input
          className="form-field"
          type="password"
          id="confirmPassword"
          placeholder="Confirm Password"
          {...register("confirmPassword")}
        />
        <p className="error-field">{errors.confirmPassword?.message}</p>

        <button disabled={loading} className="mt-6 submit-btn" type="submit">
          {loading ? (
            <ClipLoader size={17} color="white" />
          ) : (
            "Reset Password"
          )}
        </button>
      </form>
    </div>
  );
};
