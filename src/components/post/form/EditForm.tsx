import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import PostContext from "../../../Context/PostContext";
import { useContext, useEffect } from "react";
import AuthContext from "../../../Context/AuthContext";

export const EditForm = (props: any) => {
  const navigate = useNavigate();
  const { updatePost } = useContext(PostContext);
  const { user } = useContext(AuthContext);

  const schema = yup.object().shape({
    title: yup.string().required(),
    slug: yup.string().required(),
    body: yup.string().required().max(2000),
  });

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    setValue("title", props.post.title);
    setValue("slug", props.post.slug);
    setValue("body", props.post.body);
  }, [setValue]);

  const onSubmit = (data: any) => {
    updatePost(props.postId, { ...data, user_id: user.id }).catch((error) => {
      const errors = error.response.data.errors;
      setError("slug", { message: errors.slug });
      setError("title", { message: errors.title });
    });
  };

  return (
    <form
      className="flex flex-col"
      onSubmit={handleSubmit(onSubmit)}
      method="post"
    >
      <h1 className="text-2xl text-center font-semibold">Edit Post</h1>

      <input
        className="inputField"
        type="text"
        placeholder="Title..."
        {...register("title")}
      />
      <p className="errorField">{errors.title?.message}</p>

      <input
        className="inputField"
        type="text"
        placeholder="Slug..."
        {...register("slug")}
      />
      <p className="errorField">{errors.slug?.message}</p>

      <textarea
        className=" min-h-[3rem] inputField"
        placeholder="Body..."
        {...register("body")}
      />
      <p className="errorField">{errors.body?.message}</p>

      <div className="flex justify-end space-x-2 mt-3">
        <button
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700"
          type="button"
          onClick={() => navigate("/dashboard")}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700"
        >
          Update
        </button>
      </div>
    </form>
  );
};
