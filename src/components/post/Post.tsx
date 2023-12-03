import { useNavigate, Link } from "react-router-dom";
import placeholder from "../../assets/placeholder.jpg";
import pfPlaceholder from "../../assets/pf.png";
import { useContext, useState } from "react";
import PostContext from "../../Context/PostContext";

interface Props {
  id: number;
  title: string;
  slug: string;
  author: number;
}

export const Post = (props: Props) => {
  const { deletePost } = useContext(PostContext);
  const navigate = useNavigate();
  const [isHover, setIsHover] = useState(false);
  const [isToggle, setIsToggle] = useState(false);

  return (
    <div
      onMouseEnter={() => {
        setIsHover(true);
      }}
      onMouseLeave={() => {
        setIsHover(false);
      }}
      className="flex flex-col w-11/12 space-y-4 p-4 shadow-xl border border-gray-200 rounded-md relative hover:-translate-y-1 transition-all ease-in-out"
    >
      <div
        onClick={() => navigate("/post/"+props.id)}
        className="flex space-x-4 hover:cursor-pointer"
      >
        <img className="w-1/5 h-40" src={placeholder} alt="img" />
        <div className="w-4/5">
          <div className="flex items-center">
            <img
              className="w-10 rounded-full mr-4"
              src={pfPlaceholder}
              alt="profile"
            />
            <p>{props.author}</p>
          </div>
          <h1 className="text-lg font-bold mt-2">{props.title}</h1>
          <p className="text-gray-700">{props.slug}</p>
        </div>
      </div>
      <div
        onClick={() => {
          setIsToggle(!isToggle);
        }}
        className={
          !isHover ? "hidden" : "absolute right-3 top-0 hover:cursor-pointer"
        }
      >
        <div className="relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 hover:bg-gray-200 rounded-full"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
            />
          </svg>
          <div
            className={
              !isToggle ? "hidden" : "absolute block right-3 border shadow-md"
            }
          >
            <Link to={`post/${props.id}/edit`}>
              <div className="w-full py-2 pl-4 pr-12 hover:bg-green-600 hover:text-white">
                Edit
              </div>
            </Link>
            <button
              onClick={() => deletePost(String(props.id))}
              className="w-full py-2 pl-4 pr-12 hover:bg-red-500 hover:text-white"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
