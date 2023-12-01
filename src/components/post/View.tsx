import searchIcon from "../../assets/search.svg";
import placeholder from "../../assets/placeholder.jpg";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import PostContext from "../../Context/PostContext";

export const View = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { post, retrievePost } = useContext(PostContext);

  useEffect(() => {
    retrievePost(parseInt(id!));
  }, []);

  return (
    <div className="flex px-10 py-5 space-x-4">
      <div className="flex flex-col items-center w-3/4 space-y-5">
        <div className="w-3/4 space-y-4 p-4 shadow-xl rounded-md">
          <img className="w-full" src={placeholder} alt="img" />
          <h1 className="text-3xl">{post.title}</h1>
          <p>
            {post.body}
          </p>
          <div className="flex justify-between items-center">
            <p>Author: {post.author}</p>
            <button
              onClick={() => navigate("/")}
              className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700 hover:-translate-y-1 transition ease-in-out duration-300 hover:scale-105 hover:shadow-lg"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
      <div className="shadow-lg border border-gray-200 rounded-lg w-3/12 p-5">
        <div className="flex justify-between relative">
          <input
            className="border w-full pl-4 py-2"
            type="text"
            placeholder="Search..."
          />
          <img
            className="absolute right-4 mt-3 w-4"
            src={searchIcon}
            alt="search"
          />
        </div>
      </div>
    </div>
  );
};
