import { Link } from "react-router-dom";
import reactLogo from "../../assets/react.svg";
import { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";
import { NavLink } from "./NavLink";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import PostContext from "../../context/PostContext";
import { Search } from "./Search";
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";

export const Navbar = () => {
  const { token, logout, toggleDarkMode, isDarkMode } = useContext(AuthContext);
  const { updateSearch } = useContext(PostContext);
  const [showNavbar, setShowNavbar] = useState(false);

  return (
    <>
      <nav className="flex sticky bg-white top-0 z-10 text-lg justify-between items-center py-6 px-8 shadow-lg overflow-x-clip dark:bg-slate-800 dark:text-slate-300">
        <div>
          <Link className="flex items-center space-x-3" to="/">
            <img src={reactLogo} alt="logo" />
            <h1>React-Blog</h1>
          </Link>
        </div>
        <ul className="hidden md:flex space-x-10">
          <button
            onClick={() => {
              toggleDarkMode();
            }}
          >
            {isDarkMode ? (
              <MdOutlineLightMode size={25} title="Light Mode" />
            ) : (
              <MdOutlineDarkMode size={25} title="Dark Mode" />
            )}
          </button>
          <NavLink url="/" name="Home" />
          <NavLink url="/about" name="About" />
          {token !== "" ? (
            <>
              <NavLink url="/post/create" name="Create" />
              <NavLink url="/dashboard" name="Dashboard" />
              <button className="navbar-btn" onClick={() => logout()}>
                Logout
              </button>
            </>
          ) : (
            <NavLink url="/login" name="Login" />
          )}
        </ul>

        {/* Responsive Navbar */}
        <div className="flex items-center space-x-4 md:hidden">
          <button onClick={() => toggleDarkMode()}>
            {isDarkMode ? (
              <MdOutlineLightMode size={25} title="Light Mode" />
            ) : (
              <MdOutlineDarkMode size={25} title="Dark Mode" />
            )}
          </button>

          <div
            onClick={() => setShowNavbar(!showNavbar)}
            className="block md:hidden hover:cursor-pointer"
          >
            {showNavbar ? (
              <AiOutlineClose className="hover:scale-125 transition ease-in-out duration-300" />
            ) : (
              <AiOutlineMenu className="hover:scale-125 transition ease-in-out duration-300" />
            )}
          </div>
        </div>

        {/* Dropdown List */}
        <ul
          className={`
          absolute px-8 py-5 space-y-3 transition-all duration-300 ease-in-out mt-[4rem] shadow-lg bg-white z-10 w-full dark:bg-slate-900
            ${showNavbar ? "block -top-1 left-0" : "left-[100%] -top-1"}`}
        >
          <div className="bg-gray-300 w-full h-1 rounded-md shadow-md dark:bg-slate-700" />
          <Search updateSearch={updateSearch} />

          <NavLink onBtnClick={setShowNavbar} url="/" name="Home" />
          <NavLink onBtnClick={setShowNavbar} url="/about" name="About" />
          {token && (
            <NavLink
              onBtnClick={setShowNavbar}
              url="/post/create"
              name="Create"
            />
          )}
          {token ? (
            <>
              <NavLink
                onBtnClick={setShowNavbar}
                url="/dashboard"
                name="Dashboard"
              />
              <li className="navbar-btn">
                <button onClick={() => logout()}>Logout</button>
              </li>
            </>
          ) : (
            <NavLink onBtnClick={setShowNavbar} url="/login" name="Login" />
          )}
        </ul>
      </nav>
    </>
  );
};
