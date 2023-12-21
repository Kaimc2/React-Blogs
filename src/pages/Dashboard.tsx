import { Account } from "./dashboard/Account";
import { Post } from "./dashboard/Post";

export const Dashboard = () => {
  return (
    <div className="dashboard">
      {/* Sidebar */}
      <Account />

      <Post />
    </div>
  );
};
