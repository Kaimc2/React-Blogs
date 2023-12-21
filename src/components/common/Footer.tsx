import reactLogo from "../../assets/react.svg";
import { RiGithubFill } from "react-icons/ri";

export const Footer = () => {
  return (
    <footer className="flex bg-white border p-8 shadow-inner justify-between border-gray-300">
      <a className="flex items-center space-x-3" href="#home">
        <img src={reactLogo} alt="logo" />
        <h1>React-Blog</h1>
      </a>

      <a
        href="https://github.com/Kaimc2/React-Blogs"
        className="flex items-center space-x-2 hover:opacity-75"
      >
        <RiGithubFill size={25} />
        <p>Github</p>
      </a>
    </footer>
  );
};
