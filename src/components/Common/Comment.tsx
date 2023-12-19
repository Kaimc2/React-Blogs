import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import PostContext from "../../context/PostContext";
import toast from "react-hot-toast";
import { VscTrash, VscEdit } from "react-icons/vsc";
import { RiMore2Fill, RiThumbDownLine, RiThumbUpLine } from "react-icons/ri";

interface Props {
  post_id: string;
  comment_id: string;
  commenterProfilePicture: string;
  commenter_id: number;
  commenter: string;
  content: string;
  createdAt: string;
}

export const Comment = (props: Props) => {
  const [readMore, setReadMore] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isToggle, setIsToggle] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { user } = useContext(AuthContext);
  const { updateComment, retrievePost, deleteComment } =
    useContext(PostContext);

  const schema = yup.object().shape({
    comment: yup.string().required(),
  });

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  useEffect(() => {
    setValue("comment", props.content);
  }, [setIsEdit, isEdit]);

  const onSubmit = (data: any) => {
    const formData = new FormData();

    formData.append("content", data.comment);
    formData.append("user_id", String(user.id));
    formData.append("post_id", props.post_id);
    formData.append("_method", "PUT");

    updateComment(props.comment_id, formData)
      .then(() => {
        toast.success("Comment successfully updated.");
        retrievePost(props.post_id);
        setIsEdit(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsToggle(false);
      }}
      className="flex my-2 py-5"
    >
      <img
        className="profile-picture"
        src={import.meta.env.VITE_BACKEND_URL + props.commenterProfilePicture}
        alt="profile_picture"
      />
      <div className="ml-5 w-full">
        <div className="relative flex justify-between">
          <div className="flex text-sm space-x-2 mb-2">
            <p className="font-bold">{props.commenter}</p>
            <p className="text-gray-600">{props.createdAt}</p>
          </div>

          {props.commenter_id === user.id && (
            <div
              onClick={() => {
                setIsToggle(!isToggle);
              }}
              className={
                !isHovered
                  ? "md:hidden"
                  : "absolute right-0 top-0 hover:cursor-pointer"
              }
            >
              <div className="relative">
                <RiMore2Fill />
                <div
                  className={
                    !isToggle
                      ? "hidden"
                      : "absolute bg-white block right-3 border border-gray-300 rounded-md shadow-md"
                  }
                >
                  <button
                    className="flex items-center w-full py-2 pl-4 pr-12 text-left hover:bg-green-600 hover:text-white"
                    onClick={() => setIsEdit(true)}
                  >
                    <VscEdit />
                    <p className="ml-2">Edit</p>
                  </button>
                  <button
                    onClick={() =>
                      deleteComment(props.comment_id, props.post_id)
                    }
                    className="flex items-center w-full py-2 pl-4 pr-12 text-left hover:bg-red-500 hover:text-white"
                  >
                    <VscTrash />
                    <p className="ml-2">Delete</p>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {!isEdit ? (
          props.content.length > 250 ? (
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
          )
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <textarea
              className="w-full p-2 max-h-[4rem] rounded-md shadow-lg border border-gray-300"
              placeholder="Add a comment..."
              id="comment"
              {...register("comment")}
            ></textarea>
            <p className="error-field">{errors.comment?.message}</p>

            <div className="flex justify-end space-x-2">
              <button
                className="submit-btn"
                type="button"
                onClick={() => {
                  setIsEdit(false);
                  setValue("comment", props.content);
                }}
              >
                Cancel
              </button>
              <button className="submit-btn" type="submit">
                Update
              </button>
            </div>
          </form>
        )}

        <div className="flex mt-3 space-x-3">
          <button className="flex items-center space-x-1" title="Like">
            <RiThumbUpLine />
            <p className="text-sm">10</p>
          </button>
          <button title="Dislike">
            <RiThumbDownLine />
          </button>
        </div>
      </div>
    </div>
  );
};
