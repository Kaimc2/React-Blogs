import { Link } from "react-router-dom";
import reactLogo from "../../assets/react.svg";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { NavLink } from "./NavLink";

export const Navbar = () => {
  const { token, logout } = useContext(AuthContext);

  const onLogout = () => {
    logout();
  };

  return (
    <header className="flex text-lg justify-between py-6 px-8 shadow-lg">
      <div>
        <Link className="flex items-center space-x-3" to="/">
          <img src={reactLogo} alt="logo" />
          <h1>React-Blog</h1>
        </Link>
      </div>
      <ul className="flex space-x-10">
        <NavLink url="/" name="Home" />
        <NavLink url="/about" name="About" />
        {token && <NavLink url="/post/create" name="Create" />}
        {token ? (
          <>
            <NavLink url="/dashboard" name="Dashboard" />
            <li className="navbarBtn">
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
