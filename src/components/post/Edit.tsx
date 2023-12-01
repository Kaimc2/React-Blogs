import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext, useEffect, useMemo } from "react";
import PostContext from "../../Context/PostContext";
import { AxiosError } from "axios";

export const Edit = () => {
  const navigate = useNavigate();
  const { post, retrievePost, updatePost, formValues } =
    useContext(PostContext);
  const { id } = useParams();

  const schema = yup.object().shape({
    title: yup.string().required(),
    slug: yup.string().required(),
    body: yup.string().required().max(2000),
  });

  useEffect(() => {
    retrievePost(parseInt(id!));
  }, []);

  const {
    setError,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: useMemo(() => {
      return formValues;
      console.log(formValues);
    }, [formValues]),
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    try {
      updatePost(post.id, { ...data, user_id: 1 }).catch((error) => {
        console.log(error);
        setError("root.serverError", {
          type: "manual",
          message: error instanceof AxiosError && error.response?.data.message,
        });
      });
    } catch (error) {
      console.log(error);
      setError("root.serverError", {
        type: "manual",
        message: error instanceof AxiosError && error.response?.data.message,
      });
    }
  };

  return (
    <div className="h-3/4 flex justify-center items-center px-10 py-5">
      <div className=" w-2/5 border rounded-lg shadow-md p-5">
        <form
          className="flex flex-col"
          onSubmit={handleSubmit(onSubmit)}
          method="post"
        >
          <h1 className="text-2xl text-center font-semibold">Edit Post</h1>
          <input
            className="border border-gray-300 p-2 rounded-lg shadow-md mt-3"
            type="text"
            placeholder="Title..."
            {...register("title")}
          />
          <p className="mt-3 text-sm text-red-500 ml-2">
            {errors.title?.message}
          </p>
          <input
            className="border border-gray-300 p-2 rounded-lg shadow-md mt-3"
            type="text"
            placeholder="Slug..."
            {...register("slug")}
          />
          <p className="mt-3 text-sm text-red-500 ml-2">
            {errors.slug?.message || errors?.root?.serverError.message}
          </p>
          <textarea
            className=" min-h-[3rem] border border-gray-300 p-2 rounded-lg shadow-md mt-3"
            placeholder="Body..."
            {...register("body")}
          />
          <p className="mt-3 text-sm text-red-500 ml-2">
            {errors.body?.message}
          </p>
          <div className="flex justify-end space-x-2">
            <button
              className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700"
              onClick={() => navigate("/")}
            >
              Go Back
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700"
            >
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
