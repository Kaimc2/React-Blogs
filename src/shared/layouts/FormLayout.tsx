export const FormLayout = ({ children }: any) => {
  return (
    <div className="h-3/4 flex justify-center items-center px-10 py-5">
      <div className=" w-2/5 border rounded-lg shadow-md p-5">{children}</div>
    </div>
  );
};
