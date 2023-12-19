import { Layout, theme } from "antd";
import { DashboardLayout } from "../components/Layout/DashboardLayout";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { axiosClient } from "../utils/axios.client";

export const Account = () => {
  const { Content } = Layout;
  const { user, token, setUser } = useContext(AuthContext);
  const [isEdit, setIsEdit] = useState(false);
  const [previewProfile, setPreviewProfile] = useState("");

  const {
    token: { colorBgContainer },
  } = theme.useToken();

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
    <DashboardLayout>
      <Content
        style={{
          margin: "24px 16px",
          padding: 24,
          minHeight: 280,
          background: colorBgContainer,
        }}
      >
        {isEdit ? (
          <div className="flex justify-between items-center">
            <form
              className="flex items-center space-x-5"
              onSubmit={handleSubmit(onSubmit)}
            >
              <label htmlFor="thumbnail">
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
                  className="hover:cursor-pointer"
                  onClick={() => document.getElementById("profile")?.click()}
                >
                  <img
                    src={
                      previewProfile
                        ? previewProfile
                        : import.meta.env.VITE_BACKEND_URL + user.profile
                    }
                    className="relative w-[5rem] h-[5rem] rounded-full border"
                  />
                  <div className="absolute border mt-1 p-1">Change Profile</div>
                </span>
              </label>
              <p className="error-field">{errors.profile?.message}</p>

              <input
                className="input-field"
                placeholder="Name..."
                {...register("name")}
                // required
              ></input>
              <p className="error-field">{errors.name?.message}</p>

              <button type="submit">Update</button>
            </form>

            <button
              onClick={() => {
                setPreviewProfile("");
                setIsEdit(!isEdit);
              }}
              className="text-xl border border-gray-300 shadow-sm hover:shadow-lg h-[3rem] w-[6rem] rounded-md"
            >
              Cancel
            </button>
          </div>
        ) : (
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-5">
              <img
                className="w-[5rem] h-[5rem] border rounded-full"
                src={import.meta.env.VITE_BACKEND_URL + user.profile}
                alt="profile_picture"
              />
              <h1 className="text-xl font-bold">{user.name}</h1>
            </div>

            <button
              onClick={() => setIsEdit(!isEdit)}
              className="text-xl border border-gray-300 shadow-sm hover:shadow-lg h-[3rem] w-[6rem] rounded-md"
            >
              Edit
            </button>
          </div>
        )}
      </Content>
    </DashboardLayout>
  );
};
