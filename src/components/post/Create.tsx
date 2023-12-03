import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext } from "react";
import PostContext from "../../Context/PostContext";
import { FormLayout } from "../../shared/layouts/FormLayout";

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
    <FormLayout>
      <form
        className="flex flex-col"
        onSubmit={handleSubmit(onSubmit)}
        method="post"
      >
        <h1 className="text-2xl text-center font-semibold">Create Post</h1>

        <input
          className="formField"
          type="text"
          placeholder="Title..."
          {...register("title")}
        />
        <p className="errorField">{errors.title?.message}</p>

        <input
          className="formField"
          type="text"
          placeholder="Slug..."
          {...register("slug")}
        />
        <p className="errorField">{errors.slug?.message}</p>

        <textarea
          className=" min-h-[3rem] formField"
          placeholder="Body..."
          {...register("body")}
        />
        <p className="errorField">{errors.body?.message}</p>

        <div className="flex justify-end space-x-2">
          <button
            type="button"
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
    </FormLayout>
  );
};
