import axios from "axios";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export interface PostItem {
  id: number;
  title: string;
  slug: string;
  body: string;
  user_id: number;
  author: string;
}

export interface formField {
  title: string;
  slug: string;
  body: string;
  author_id: number;
}

interface PostContextType {
  posts: PostItem[];
  post: PostItem;
  isLoading: boolean;
  isError: boolean;
  retrievePosts: () => void;
  retrievePost: (id: string) => Promise<void>;
  storePost: (data: PostItem) => Promise<void>;
  updatePost: (id: string, data: PostItem) => Promise<void>;
  deletePost: (id: string) => Promise<void>;
}

const PostContext = createContext<PostContextType>({
  posts: [],
  post: { id: 0, title: "", slug: "", body: "", user_id: 0, author: "" },
  isLoading: false,
  isError: false,
  retrievePosts: async () => {},
  retrievePost: async () => {},
  storePost: async () => {},
  updatePost: async () => {},
  deletePost: async () => {},
});

export const PostProvider = ({ children }: any) => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<PostItem[]>([]);
  const [post, setPost] = useState<PostItem>({
    id: 0,
    title: "",
    slug: "",
    body: "",
    user_id: 0,
    author: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const retrievePosts = async () => {
    setIsLoading(true);
    await axios.get("http://127.0.0.1:8000/api/v1/posts").then((res) => {
      setPosts(res.data.data);
      setIsLoading(false);
      setIsError(false);
    });
  };

  const retrievePost = async (id: string) => {
    setIsLoading(true);
    const response = await axios.get(
      `http://127.0.0.1:8000/api/v1/posts/${id}`
    );
    const data = response.data.data;
    setPost(data);
    setIsLoading(false);
    return data;
  };

  const storePost = async (data: PostItem) => {
    await axios.post("http://127.0.0.1:8000/api/v1/posts", data).then(() => {
      retrievePosts();
      navigate("/");
    });
  };

  const updatePost = async (id: string, data: PostItem) => {
    await axios
      .put(`http://127.0.0.1:8000/api/v1/posts/${id}`, data)
      .then(() => {
        retrievePosts();
        // navigate("/");
        navigate("/dashboard");
      });
  };

  const deletePost = async (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      confirmButtonColor: "#d33",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios
          .delete(`http://127.0.0.1:8000/api/v1/posts/${id}`)
          .then(() => {
            retrievePosts();
            // navigate("/");
            navigate("/dashboard");
          });
      }
    });
  };

  return (
    <PostContext.Provider
      value={{
        posts,
        post,
        isLoading,
        isError,
        retrievePosts,
        retrievePost,
        storePost,
        updatePost,
        deletePost,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export default PostContext;
