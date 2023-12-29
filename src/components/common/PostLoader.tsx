import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const PostLoader = () => {
  return (
    <div className="flex flex-col items-center w-full h-full md:h-[77vh] space-y-5">
      <div className="post">
        <div className="md:flex space-y-4 md:space-y-0 md:space-x-4 md:max-h-[10rem] overflow-hidden hover:cursor-pointer">
          <div className="w-full h-[18rem] md:w-1/5 md:h-40">
            <Skeleton className="h-full md:h-40 dark:bg-slate-700 opacity-20" />
          </div>

          <div className="md:w-4/5">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-10 rounded-full mr-4">
                  <Skeleton className="h-10 dark:bg-slate-700 opacity-20" circle />
                </div>

                <div className="w-20">
                  <Skeleton className="dark:bg-slate-700 opacity-20" />
                </div>
              </div>

              <div className="w-20 rounded-full overflow-hidden">
                <Skeleton className="px-4 py-2 dark:bg-slate-700 opacity-20" />
              </div>
            </div>

            <h1 className="w-36 my-2">
              <Skeleton className="dark:bg-slate-700 opacity-20" />
            </h1>
            <div className="mt-2 md:mt-0 text-gray-700">
              <Skeleton className="dark:bg-slate-700 opacity-20" count={3} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
