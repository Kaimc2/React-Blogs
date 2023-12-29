import { useForm } from "react-hook-form";
import { FormLayout } from "../../components/layout/FormLayout";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router-dom";
import { axiosClient } from "../../utils/axios.client";
import toast from "react-hot-toast";
import { useContext, useEffect } from "react";
import AuthContext from "../../context/AuthContext";

export const Edit = () => {
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const schema = yup.object().shape({
    name: yup.string().required("category is a required field"),
  });

  useEffect(() => {
    axiosClient.get(`api/v1/categories/${id}`).then((res) => {
      setValue("name", res.data.data.name);
    });
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data: any) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("_method", "PUT");
    axiosClient
      .post(`api/v1/dashboard/categories/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        navigate("/dashboard/categories");
        toast.success("Category successfully updated");
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
          <h1 className="text-2xl text-center font-semibold">Edit Category</h1>

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
