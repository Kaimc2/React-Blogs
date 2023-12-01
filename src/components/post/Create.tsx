import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext } from "react";
import PostContext from "../../Context/PostContext";

export const Create = () => {
  const navigate = useNavigate();
  const { storePost } = useContext(PostContext);

  const schema = yup.object().shape({
    title: yup.string().required(),
    slug: yup.string().required(),
    body: yup.string().required().max(2000),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data: any) => {
    storePost({ ...data, user_id: 1 });
  };

  return (
    <div className="h-3/4 flex justify-center items-center px-10 py-5">
      <div className=" w-2/5 border rounded-lg shadow-md p-5">
        <form
          className="flex flex-col"
          onSubmit={handleSubmit(onSubmit)}
          method="post"
        >
          <h1 className="text-2xl text-center font-semibold">Create Post</h1>
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
            {errors.slug?.message}
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
