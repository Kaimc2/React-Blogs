import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import PostContext, {
  CategoryType,
  formField,
} from "../../../context/PostContext";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { TextEditor } from "../../../components/common/TextEditor";

interface Props {
  postId: string;
  post: formField;
  categories: CategoryType[];
}

export const EditForm = (props: Props) => {
  // console.log(props);
  const navigate = useNavigate();
  const { updatePost } = useContext(PostContext);
  const [previewThumbnail, setPreviewThumbnail] = useState<string>("");

  const schema = yup.object().shape({
    title: yup.string().required(),
    category: yup.string().required(),
    body: yup.string().required().min(3),
    thumbnail: yup.mixed().required(),
  });

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList) return;

    // Create preview for selected thumbnail
    const previewUrl = URL.createObjectURL(fileList[0]);
    setPreviewThumbnail(previewUrl);
  };

  const {
    control,
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    setValue("title", props.post.title);
    setValue("category", props.post.category_id);
    setValue("body", props.post.body);
    setPreviewThumbnail(props.post.thumbnail);
  }, [setValue]);

  const onSubmit = (data: any) => {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("body", data.body);
    formData.append("category_id", data.category);
    formData.append("thumbnail", data.thumbnail[0]);
    formData.append("author_id", String(props.post.author_id));
    formData.append("_method", "PUT");
    // console.log(data);

    updatePost(props.postId, formData)
      .then(() => {
        toast.success("Post successfully updated");
      })
      .catch((error) => {
        if (error.response.status === 403) {
          navigate("/forbidden");
        }
        const errors = error.response.data.errors;
        // console.log(errors);
        setError("category", { message: errors.category_id });
        setError("title", { message: errors.title });
        // setError("title", { message: "Title must be unique" });
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
        className="input-field"
        type="text"
        placeholder="Title..."
        {...register("title")}
      />
      <p className="error-field">{errors.title?.message}</p>

      <select className="form-field" {...register("category")}>
        <option value="">Pick a category</option>
        {props.categories &&
          props.categories.map((category) => {
            return (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            );
          })}
      </select>
      <p className="error-field">{errors.category?.message}</p>

      {/* <textarea
        className=" min-h-[3rem] input-field"
        placeholder="Body..."
        {...register("body")}
      />
      <p className="error-field">{errors.body?.message}</p> */}

      <Controller
        control={control}
        name="body"
        render={({ field: { onChange } }) => (
          <TextEditor
            body={props.post.body}
            onChange={onChange}
            setError={setError}
            clearErrors={clearErrors}
          />
        )}
      />
      <p className="error-field">{errors.body?.message}</p>

      {/* Thumbnail Input */}
      <label htmlFor="thumbnail" className="mt-3">
        {previewThumbnail && (
          <div className="flex items-center space-x-3">
            <p>Preview:</p>
            <img
              className=" max-h-[4rem]"
              src={
                previewThumbnail === props.post.thumbnail
                  ? import.meta.env.VITE_BACKEND_URL + previewThumbnail
                  : previewThumbnail
              }
              alt="preview"
            />
          </div>
        )}
        <input
          type="file"
          id="thumbnail"
          className="hidden"
          accept="image/png, image/jpeg, image/jpg"
          {...register("thumbnail", {
            onChange: (e) => handleThumbnailChange(e),
          })}
        />
        <button
          type="button"
          className="text-center p-1 shadow-lg border border-gray-300 rounded w-full my-3"
          onClick={() => document.getElementById("thumbnail")?.click()}
        >
          Upload Thumbnail
        </button>
      </label>
      <p className="error-field">{errors.thumbnail?.message}</p>

      {/* Action */}
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
