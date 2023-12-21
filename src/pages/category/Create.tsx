import { useForm } from "react-hook-form";
import { FormLayout } from "../../components/layout/FormLayout";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { axiosClient } from "../../utils/axios.client";
import toast from "react-hot-toast";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";

export const Create = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const schema = yup.object().shape({
    name: yup.string().required("category is a required field"),
  });

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data: any) => {
    axiosClient
      .post("api/v1/dashboard/categories/create", data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        navigate("/dashboard/categories");
        toast.success("Category successfully added");
      })
      .catch((error) => {
        setError("name", { message: error.response.data.errors.name[0] });
      });
  };

  return (
    <div className="dashboard">
      <FormLayout>
        <form
          className="flex flex-col"
          onSubmit={handleSubmit(onSubmit)}
          method="post"
        >
          <h1 className="text-2xl text-center font-semibold">Add Category</h1>

          <input
            className="form-field"
            type="text"
            placeholder="Category..."
            {...register("name")}
          />
          <p className="error-field">{errors.name?.message}</p>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700"
              onClick={() => navigate("/dashboard/categories")}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700"
            >
              Add
            </button>
          </div>
        </form>
      </FormLayout>
    </div>
  );
};
