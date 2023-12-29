import { useContext } from "react";
import BarLoader from "react-spinners/BarLoader";
import AuthContext from "../../context/AuthContext";

export const Loader = () => {
  const { isDarkMode } = useContext(AuthContext);

  return (
    <div className="h-[80vh] flex justify-center items-center dark:bg-slate-900">
      <BarLoader
        color={isDarkMode ? "#FFFFFF" : "#000000"}
        loading={true}
        aria-label="Loading Spinner"
        data-testid="loader"
        speedMultiplier={2}
      />
    </div>
  );
};
