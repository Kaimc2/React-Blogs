import { Layout } from "antd";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { axiosClient } from "../../utils/axios.client";
import { useLocation, useNavigate } from "react-router-dom";

export const Account = () => {
  const { Content } = Layout;
  const navigate = useNavigate();
  const location = useLocation();
  const { user, token, setUser } = useContext(AuthContext);
  const [isEdit, setIsEdit] = useState(false);
  const [previewProfile, setPreviewProfile] = useState("");
  const isAdmin = user.id === 1;

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const previewPic = URL.createObjectURL(files[0]);
    setPreviewProfile(previewPic);
  };

  const schema = yup.object().shape({
    name: yup.string().required(),
    profile: yup.mixed().required(),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  useEffect(() => {
    setValue("name", user.name);
    setValue("profile", user.profile);
  }, [user]);

  const onSubmit = (data: any) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("profile", data.profile[0]);
    formData.append("_method", "PUT");

    axiosClient
      .post("api/v1/dashboard/account", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUser({
          id: user.id,
          name: data.name,
          profile: data.profile[0] ? res.data.profile : user.profile,
        });
        setIsEdit(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="border border-gray-300 rounded shadow-md md:w-[20%]">
      <Content className="m-5">
        {isEdit ? (
          <div className="">
            <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
              <label htmlFor="profilePicture">
                <input
                  type="file"
                  id="profile"
                  style={{ display: "none" }}
                  accept="image/png, image/jpeg, image/jpg"
                  {...register("profile", {
                    onChange: (e) => handleProfileChange(e),
                  })}
                />
                <span
                  className="hover:cursor-pointer relative flex justify-center"
                  onClick={() => document.getElementById("profile")?.click()}
                >
                  <img
                    src={
                      previewProfile
                        ? previewProfile
                        : user.profile
                        ? import.meta.env.VITE_BACKEND_URL + user.profile
                        : import.meta.env.VITE_BACKEND_URL +
                          "storage/profiles/pf.png"
                    }
                    className="w-[10rem] h-[10rem] border rounded-full"
                  />
                  <div className="absolute border border-gray-300 rounded bottom-2 right-16 bg-white px-3 py-1">
                    Edit
                  </div>
                </span>
              </label>
              <p className="error-field">{errors.profile?.message}</p>

              <input
                className="input-field w-full"
                placeholder="Name..."
                {...register("name")}
                required
              ></input>
              <p className="error-field">{errors.name?.message}</p>

              <div className="flex space-x-2">
                <button
                  type="submit"
                  className="bg-blue-500 text-white dashboard-btn"
                >
                  Update
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setPreviewProfile("");
                    setIsEdit(!isEdit);
                  }}
                  className="dashboard-btn"
                >
                  Cancel
                </button>
              </div>

              {/* Divider */}
              <div className="h-[0.3rem] mx-1 my-4 rounded-md bg-gray-300 shadow-md" />

              <button
                className={
                  location.pathname === "/dashboard"
                    ? "dashboard-active"
                    : "dashboard-btn"
                }
                onClick={() => navigate("/dashboard")}
              >
                Posts
              </button>
              {isAdmin && (
                <button
                  className={
                    location.pathname === "/dashboard/categories"
                      ? "dashboard-active"
                      : "dashboard-btn"
                  }
                  onClick={() => navigate("/dashboard/categories")}
                >
                  Categories
                </button>
              )}
            </form>
          </div>
        ) : (
          <div className="space-y-5">
            <div className="flex justify-center">
              <img
                className="w-[10rem] h-[10rem] border rounded-full"
                src={import.meta.env.VITE_BACKEND_URL + user.profile}
                alt="profile_picture"
              />
            </div>
            <h1 className="text-2xl font-bold text-left">{user.name}</h1>

            <button
              onClick={() => setIsEdit(!isEdit)}
              className="dashboard-btn"
            >
              Edit profile
            </button>

            {/* Divider */}
            <div className="h-[0.3rem] mx-1 my-4 rounded-md bg-gray-300 shadow-md" />

            <button
              className={
                location.pathname === "/dashboard"
                  ? "dashboard-active"
                  : "dashboard-btn"
              }
              onClick={() => navigate("/dashboard")}
            >
              Posts
            </button>

            {isAdmin && (
              <button
                className={
                  location.pathname === "/dashboard/categories"
                    ? "dashboard-active"
                    : "dashboard-btn"
                }
                onClick={() => navigate("/dashboard/categories")}
              >
                Categories
              </button>
            )}
          </div>
        )}
      </Content>
    </div>
  );
};
