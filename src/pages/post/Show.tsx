import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import PostContext from "../../context/PostContext";
import { Loader } from "../../components/Common/Loading";
import { useForm } from "react-hook-form";
import { Comment } from "../../components/Common/Comment";
import AuthContext from "../../context/AuthContext";
import toast from "react-hot-toast";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export const View = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { post, retrievePost, storeComment } = useContext(PostContext);
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [editable, setEditable] = useState(false);

  useEffect(() => {
    retrievePost(id!).then(() => setIsLoading(false));
  }, [id, editable]);

  const schema = yup.object().shape({
    comment: yup.string().required(),
  });

  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onComment = (data: any) => {
    // console.log(data);
    const formData = new FormData();

    formData.append("content", data.comment);
    formData.append("user_id", String(user.id));
    formData.append("post_id", String(post.post.id));

    storeComment(formData)
      .then(() => {
        toast.success("Comment successfully created");
        setEditable(false);
        resetField("comment");
      })
      .catch((error) => console.log(error));
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="flex justify-center sm:px-10 py-5 space-x-4">
      <div className="flex flex-col items-center w-full md:w-3/4 space-y-5">
        <div className="w-full md:w-3/4 space-y-4 p-4 shadow-xl rounded-md border border-gray-300">
          <img
            className="w-full max-h-[40rem]"
            src={import.meta.env.VITE_BACKEND_URL + post.post.thumbnail}
            alt="thumbnail"
          />
          <h1 className="text-3xl">{post.post.title}</h1>
          <div>{post.post.body}</div>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <img
                className="profile-picture"
                src={
                  import.meta.env.VITE_BACKEND_URL +
                  post.relationships.author_pf
                }
                alt="profile"
              />
              <span>
                <p className="text-sm">Author</p>
                <p>{post.relationships.author}</p>
              </span>
            </div>
            <button
              onClick={() => navigate("/")}
              className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700 hover:-translate-y-1 transition ease-in-out duration-300 hover:scale-105 hover:shadow-lg"
            >
              Go Back
            </button>
          </div>
        </div>

        {/* Comment Section */}
        <div className="w-full md:w-3/4 p-4 bg-white border shadow-lg rounded-md border-gray-300">
          <h1 className="mb-5 text-xl">
            {post.relationships.comments!.length > 0
              ? post.relationships.comments?.length + " Comments"
              : "No Comments"}
          </h1>
          <div className="flex">
            <img
              className="profile-picture mr-5"
              src={
                import.meta.env.VITE_BACKEND_URL + post.relationships.author_pf
              }
              alt="profile"
            />
            {user.id !== 0 ? (
              <form className="w-full" onSubmit={handleSubmit(onComment)}>
                <textarea
                  className="w-full p-2 max-h-[3rem] rounded-md shadow-lg border border-gray-300"
                  placeholder="Add a comment..."
                  onFocus={() => setEditable(true)}
                  {...register("comment")}
                ></textarea>
                <p className="errorField">{errors.comment?.message}</p>

                {editable && (
                  <div className="flex justify-end space-x-3">
                    <button
                      className="submitBtn"
                      type="button"
                      onClick={() => {
                        setEditable(false);
                        resetField("comment");
                      }}
                    >
                      Cancel
                    </button>
                    <button className="submitBtn" type="submit">
                      Comment
                    </button>
                  </div>
                )}
              </form>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="hover:underline"
              >
                Sign in to comment
              </button>
            )}
          </div>

          {post.relationships.comments!.length > 0 ? (
            post.relationships.comments!.map(
              ({
                comment_id,
                comment,
                commenter_id,
                commenter,
                commenter_pf,
                created_at,
              }) => {
                return (
                  <Comment
                    key={comment_id}
                    post_id={String(id)}
                    comment_id={comment_id}
                    content={comment}
                    commenter_id={commenter_id}
                    commenter={commenter}
                    commenterProfilePicture={commenter_pf}
                    createdAt={created_at}
                  />
                );
              }
            )
          ) : (
            <div className="mt-3 border border-gray-300 rounded-md shadow-lg w-full p-2 text-lg">
              Be the first one!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
