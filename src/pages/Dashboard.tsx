import { useEffect } from "react";
import { Account } from "./dashboard/Account";
import { Post } from "./dashboard/Post";

export const Dashboard = () => {
  useEffect(() => {
    document.title = "Dashboard - React-Blog";
  }, []);

  return (
    <div className="dashboard">
      <Account />
      <Post />
    </div>
  );
};
