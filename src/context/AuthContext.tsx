import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosClient } from "../utils/axios.client";
import axios from "axios";
import toast from "react-hot-toast";

interface AuthField {
  user: { id: number; name: string; profile: string };
  token: string;
  setToken: (token: string) => void;
  setUser: (user: { id: number; name: string; profile: string }) => void;
  authorize: (userId: number, authorId: number) => void;
  login: (data: any) => Promise<void>;
  logout: () => void;
  initialUser: { id: number; name: string; profile: string };
  initialToken: string;
}

const AuthContext = createContext<AuthField>({
  user: { id: 1, name: "", profile: "" },
  token: "",
  setToken: () => {},
  setUser: () => {},
  authorize: () => {},
  login: async () => {},
  logout: () => {},
  initialUser: { id: 0, name: "", profile: "" },
  initialToken: "",
});

export const initialToken = localStorage.getItem("ACCESS_TOKEN")
  ? String(localStorage.getItem("ACCESS_TOKEN"))
  : "";
export const initialUser = { id: 0, name: "", profile: "" };

export const AuthProvider = ({ children }: any) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(initialUser);
  const [token, setToken] = useState(initialToken);

  // Get set the current user from token and set it
  useEffect(() => {
    const fetchUser = async () => {
      // Check if token exist
      if (token === "") return;

      const { data } = await axiosClient.get("api/v1/user", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUser(data.data);
    };

    fetchUser();
  }, [token]);

  const http = axios.create({
    baseURL: "http://127.0.0.1:8000/",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });

  const login = async (data: any) => {
    await axiosClient
      .post("api/v1/login", {
        email: data.email,
        password: data.password,
      })
      .then((res) => {
        setToken(res.data.token);
        setUser(res.data.user);
        localStorage.setItem("ACCESS_TOKEN", res.data.token);
        navigate("/");
        toast.success("Login Successfully");
      });
  };

  const logout = () => {
    toast.promise(
      http
        .post("api/v1/logout")
        .then((res) => {
          console.log(res.data);
          localStorage.removeItem("ACCESS_TOKEN");
          setUser(initialUser);
          setToken(String(initialToken));
        })
        .catch((err) => console.log(err)),
      {
        loading: "Loading...",
        success: "Logout Successfully",
        error: "Logout Failed",
      }
    );
  };

  const authorize = (userId: number, authorId: number) => {
    if (userId !== authorId) {
      navigate("/forbidden");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        setToken,
        setUser,
        authorize,
        login,
        logout,
        initialToken,
        initialUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
