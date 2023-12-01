import { Link } from "react-router-dom";
import reactLogo from "../assets/react.svg";

export const Navbar = () => {
  return (
    <header className="flex text-lg justify-between py-6 px-8 shadow-lg">
      <div>
        <Link className="flex items-center space-x-3" to="/">
          <img src={reactLogo} alt="logo" />
          <h1>React-Blog</h1>
        </Link>
      </div>
      <div className="space-x-10">
        <Link className={"hover:underline hover:font-bold"} to="/">
          Home
        </Link>
        <Link className={"hover:underline hover:font-bold"} to="/about">
          About
        </Link>
        <Link className={"hover:underline hover:font-bold"} to="/post/create">
          Create
        </Link>
        <Link className={"hover:underline hover:font-bold"} to="/login">
          Login
        </Link>
      </div>
    </header>
  );
};
