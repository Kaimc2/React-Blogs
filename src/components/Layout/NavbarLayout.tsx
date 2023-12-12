import { Outlet } from "react-router-dom";
import { Navbar } from "../Common/Navbar";

export const NavbarLayout = () => {
  return (
    <div className="h-screen">
      <Navbar />
      <Outlet />
    </div>
  );
};