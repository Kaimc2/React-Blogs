import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext, useEffect, useState } from "react";
import PostContext, { CategoryType } from "../../context/PostContext";
import { FormLayout } from "../../components/Layout/FormLayout";
import AuthContext from "../../context/AuthContext";
import toast from "react-hot-toast";
import { TextEditor } from "../../components/Common/TextEditor";

export const Create = () => {
  const navigate = useNavigate();
  const { storePost, getCategories } = useContext(PostContext);
  const { user } = useContext(AuthContext);
  const [previewThumbnail, setPreviewThumbnail] = useState<string>("");
  const [categories, setCategories] = useState<CategoryType[]>([]);

  const schema = yup.object().shape({
    title: yup.string().required(),
    body: yup.string().required().max(2000),
    category: yup.string().required(),
    thumbnail: yup.mixed().required(),
  });

  const {
    control,
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  useEffect(() => {
    const fetchData = async () => {
      const response: any = await getCategories();
      setCategories(response.data.data);
    };

    fetchData();
  }, []);

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList) return;

    // Create preview for selected thumbnail
    const previewUrl = URL.createObjectURL(fileList[0]);
    setPreviewThumbnail(previewUrl);
  };

  const onSubmit = (data: any) => {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("body", data.body);
    formData.append("thumbnail", data.thumbnail[0]);
    formData.append("category_id", data.category);
    formData.append("author_id", String(user.id));

    // console.log(data);
    storePost(formData)
      .then(() => {
        toast.success("Post created successfully");
      })
      .catch((error) => {
        // console.log(error);
        const errors = error.response.data.errors;
        setError("title", { message: errors.title });
        setError("thumbnail", { message: errors.thumbnail[0] });
        setError("category", {
          message: errors.category_id && "Category is required",
        });
      });
  };

  if (!categories) {
    return <div>Loading...</div>;
  }

  return (
    <FormLayout>
      <form
        className="flex flex-col"
        onSubmit={handleSubmit(onSubmit)}
        method="post"
      >
        <h1 className="text-2xl text-center font-semibold">Create Post</h1>

        <input
          className="form-field"
          type="text"
          placeholder="Title..."
          {...register("title")}
        />
        <p className="error-field">{errors.title?.message}</p>

        <select className="form-field bg-white" {...register("category")}>
          <option value="">Pick a category</option>
          {categories &&
            categories.map((category) => {
              return (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              );
            })}
        </select>
        <p className="error-field">{errors.category?.message}</p>

        {/* <textarea
          className=" min-h-[3rem] form-field"
          placeholder="Body..."
          {...register("body")}
        />
        <p className="error-field">{errors.body?.message}</p> */}

        <Controller
          control={control}
          name="body"
          render={({ field: { onChange } }) => (
            <TextEditor body="" onChange={onChange} setError={setError} clearErrors={clearErrors} />
          )}
        />
        <p className="error-field">{errors.body?.message}</p>

        <label htmlFor="thumbnail" className="mt-3">
          {previewThumbnail && (
            <div className="flex items-center space-x-3">
              <p>Preview:</p>
              <img
                className=" max-h-[4rem]"
                src={previewThumbnail}
                alt="preview"
              />
            </div>
          )}
          <input
            type="file"
            id="thumbnail"
            style={{ display: "none" }}
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

        <div className="flex justify-end space-x-2">
          <button
            type="button"
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700"
            onClick={() => navigate("/")}
          >
            Cancel
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
