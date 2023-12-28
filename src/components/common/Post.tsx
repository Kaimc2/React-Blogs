import { useNavigate } from "react-router-dom";
import parse from "html-react-parser";
import DOMPurify from "dompurify";

interface Props {
  id: number;
  title: string;
  thumbnail: string;
  body: string;
  category: string;
  author: number;
  profile: string;
  selectedCategory: string;
  setCategory: (newCategory: string) => void;
}

const ENV = import.meta.env.VITE_BACKEND_URL;

export const Post = (props: Props) => {
  const navigate = useNavigate();

  return (
    <div className="post">
      <div
        title="Read more"
        onClick={() => navigate("/post/" + props.id)}
        className="md:flex space-y-4 md:space-y-0 md:space-x-4 md:max-h-[10rem] overflow-hidden hover:cursor-pointer"
      >
        <img
          className="w-full h-[18rem] md:w-1/5 md:h-40"
          src={ENV + props.thumbnail}
          alt="img"
        />

        <div className="md:w-4/5">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <img
                className="w-10 h-10 rounded-full mr-4"
                src={ENV + props.profile}
                alt="profile"
              />
              <p>{props.author}</p>
            </div>
            <p
              onClick={(e) => {
                e.stopPropagation();
                props.selectedCategory === props.category
                  ? props.setCategory("")
                  : props.setCategory(props.category);
              }}
              className="border border-gray-300 shadow-md rounded-full px-3 py-1 hover:bg-gray-100"
            >
              {props.selectedCategory === props.category ? (
                <span>
                  {props.category}
                  <span className="ml-2">X</span>
                </span>
              ) : (
                props.category
              )}
            </p>
          </div>

          <h1 className="text-lg font-bold my-2">{props.title}</h1>
          <div className="mt-2 md:mt-0 text-gray-700 line-clamp-3">
            {parse(DOMPurify.sanitize(props.body))}
          </div>
        </div>
      </div>
    </div>
  );
};
