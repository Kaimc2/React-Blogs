import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import PostContext from "../../context/PostContext";
import { Loader } from "../../components/common/Loading";
import { useForm } from "react-hook-form";
import { Comment } from "../../components/common/Comment";
import AuthContext from "../../context/AuthContext";
import toast from "react-hot-toast";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import parse from "html-react-parser";
import DOMPurify from "dompurify";

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

  if (isLoading) return <Loader />;

  return (
    <div className="flex justify-center sm:px-10 py-5 space-x-4">
      <div className="flex flex-col items-center w-full md:w-3/4 space-y-5">
        {/* Main Content */}
        <div className="w-full md:w-3/4 space-y-4 p-4 shadow-xl rounded-md border border-gray-300">
          <h1 className="text-3xl font-bold">{post.post.title}</h1>
          <div className="flex items-center space-x-3">
            <img
              className="profile-picture"
              src={
                import.meta.env.VITE_BACKEND_URL + post.relationships.author_pf
              }
              alt="profile"
            />
            <span>
              <p>{post.relationships.author} </p>
              <p>Published on {post.post.createdAt}</p>
            </span>
          </div>

          <img
            className="w-full max-h-[40rem]"
            src={import.meta.env.VITE_BACKEND_URL + post.post.thumbnail}
            alt="thumbnail"
          />
          <div className="text-editor">
            {parse(DOMPurify.sanitize(post.post.body))}
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
                user.profile
                  ? import.meta.env.VITE_BACKEND_URL + user.profile
                  : import.meta.env.VITE_BACKEND_URL + "storage/profiles/pf.png"
              }
              alt="profile"
            />
            {user.id !== 0 ? (
              user.isVerified ? (
                <form className="w-full" onSubmit={handleSubmit(onComment)}>
                  <textarea
                    className="w-full p-2 max-h-[3rem] rounded-md shadow-lg border border-gray-300"
                    placeholder="Add a comment..."
                    onFocus={() => setEditable(true)}
                    {...register("comment")}
                  ></textarea>
                  <p className="error-field">{errors.comment?.message}</p>

                  {editable && (
                    <div className="flex justify-end space-x-3">
                      <button
                        className="submit-btn"
                        type="button"
                        onClick={() => {
                          setEditable(false);
                          resetField("comment");
                        }}
                      >
                        Cancel
                      </button>
                      <button className="submit-btn" type="submit">
                        Comment
                      </button>
                    </div>
                  )}
                </form>
              ) : (
                <button
                  onClick={() => navigate("/verify-email")}
                  className="my-1 border border-gray-300 rounded-md shadow-md hover:bg-gray-50 w-full"
                >
                  Verify your email to comment
                </button>
              )
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
                likes,
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
                    likeCount={likes}
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
