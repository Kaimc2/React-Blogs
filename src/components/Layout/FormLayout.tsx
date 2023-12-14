export const FormLayout = ({ children }: any) => {
  return (
    <div className="w-full h-3/4 flex justify-center items-center md:px-10 md:py-5">
      <div className="w-full lg:w-1/2 border rounded-lg shadow-md p-5">
        {children}
      </div>
    </div>
  );
};
