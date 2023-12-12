import { useState } from "react";

interface Props {
  commenterProfilePicture: string;
  commenter: string;
  content: string;
  createdAt: string;
}

export const Comment = (props: Props) => {
  const [readMore, setReadMore] = useState(false);

  return (
    <div className="flex my-5">
      <img
        className="profile-picture"
        src={import.meta.env.VITE_BACKEND_URL + props.commenterProfilePicture}
        alt="profile_picture"
      />
      <div className="ml-5 w-full shadow-lg p-1">
        <div className="flex text-sm space-x-2 mb-2">
          <p className="font-bold">{props.commenter}</p>
          <p className="text-gray-600">{props.createdAt}</p>
        </div>

        {props.content.length > 250 ? (
          readMore ? (
            <div>
              <p>{props.content}</p>
              <button
                onClick={() => setReadMore(false)}
                className="text-sm mt-2 font-semibold hover:underline"
              >
                Read less
              </button>
            </div>
          ) : (
            <div>
              <p>
                {props.content.length > 250
                  ? props.content.slice(0, 250) + "..."
                  : props.content}
              </p>
              <button
                onClick={() => setReadMore(true)}
                className="text-sm mt-2 font-semibold hover:underline"
              >
                Read more
              </button>
            </div>
          )
        ) : (
          <div>{props.content}</div>
        )}
      </div>
    </div>
  );
};
