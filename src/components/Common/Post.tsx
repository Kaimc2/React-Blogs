import { useNavigate } from "react-router-dom";

interface Props {
  id: number;
  title: string;
  thumbnail: string;
  body: string;
  category: string;
  author: number;
  profile: string;
}

const ENV = import.meta.env.VITE_BACKEND_URL;

export const Post = (props: Props) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col w-11/12 space-y-4 p-4 shadow-xl border border-gray-200 rounded-md relative hover:-translate-y-1 transition-all ease-in-out">
      <div
        onClick={() => navigate("/post/" + props.id)}
        className="flex space-x-4 hover:cursor-pointer"
      >
        <img className="w-1/5 h-40" src={ENV + props.thumbnail} alt="img" />
        <div className="w-4/5">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <img
                className="w-10 h-10 rounded-full mr-4"
                src={ENV + props.profile}
                alt="profile"
              />
              <p>{props.author}</p>
            </div>
            <p className="border border-gray-300 shadow-md rounded-full px-3 py-1">
              {props.category}
            </p>
          </div>
          <h1 className="text-lg font-bold mt-2">{props.title}</h1>
          <p className="text-gray-700">
            {props.body.length > 50
              ? props.body.slice(0, 300) + "..."
              : props.body}
          </p>
        </div>
      </div>
    </div>
  );
};
