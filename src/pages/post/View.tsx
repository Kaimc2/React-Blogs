import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import PostContext from "../../context/PostContext";
import { Loader } from "../../components/Common/Loading";

export const View = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { post, retrievePost } = useContext(PostContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    retrievePost(id!).then(() => setIsLoading(false));
  }, [id]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="flex justify-center px-10 py-5 space-x-4">
      <div className="flex flex-col items-center w-3/4 space-y-5">
        <div className="w-3/4 space-y-4 p-4 shadow-xl rounded-md">
          <img
            className="w-full"
            src={import.meta.env.VITE_BACKEND_URL + post.post.thumbnail}
            alt="img"
          />
          <h1 className="text-3xl">{post.post.title}</h1>
          <p>{post.post.body}</p>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <img
                className="border w-[3rem] h-[3rem] rounded-full"
                src={
                  import.meta.env.VITE_BACKEND_URL +
                  post.relationships.author_pf
                }
                alt="profile"
              />
              <p>{post.relationships.author}</p>
            </div>
            <button
              onClick={() => navigate("/")}
              className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700 hover:-translate-y-1 transition ease-in-out duration-300 hover:scale-105 hover:shadow-lg"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
