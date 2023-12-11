import BarLoader from "react-spinners/BarLoader";

export const Loader = () => {
  return (
    <div className="h-4/5 flex justify-center items-center">
      <BarLoader
        color={"#000000"}
        loading={true}
        aria-label="Loading Spinner"
        data-testid="loader"
        speedMultiplier={2}
      />
    </div>
  );
};
