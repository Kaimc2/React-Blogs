import { Outlet } from "react-router-dom";
import { Navbar } from "../common/Navbar";
import { Footer } from "../common/Footer";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";

export const NavbarLayout = () => {
  const { isDarkMode } = useContext(AuthContext);

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};
