import { Link } from "react-router-dom";
import reactLogo from "../assets/react.svg";
import { useContext } from "react";
import AuthContext from "../Context/AuthContext";
import axios from "axios";
import { NavLink } from "./NavLink";

export const Navbar = () => {
  const { token, setUser, setToken, initialToken, initialUser } =
    useContext(AuthContext);

  const http = axios.create({
    baseURL: "http://127.0.0.1:8000/",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });

  const onLogout = () => {
    http
      .post("api/v1/logout")
      .then((res) => {
        console.log(res.data);
        setUser(initialUser);
        localStorage.removeItem("ACCESS_TOKEN");
        setToken(String(initialToken));
      })
      .catch((err) => console.log(err));
  };

  return (
    <header className="flex text-lg justify-between py-6 px-8 shadow-lg">
      <div>
        <Link className="flex items-center space-x-3" to="/">
          <img src={reactLogo} alt="logo" />
          <h1>React-Blog</h1>
        </Link>
      </div>
      <ul className="flex space-x-5">
        <NavLink url="/" name="Home" />
        <NavLink url="/about" name="About" />
        {token && <NavLink url="/post/create" name="Create" />}
        {token ? (
          <>
            <NavLink url="/dashboard" name="Dashboard" />
            <li className="hover:bg-blue-500 hover:text-white rounded-md px-3 py-1">
              <button onClick={() => onLogout()}>Logout</button>
            </li>
          </>
        ) : (
          <NavLink url="/login" name="Login" />
        )}
      </ul>
    </header>
  );
};
