import axios from "axios";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

interface PostItem {
  id: number;
  title: string;
  slug: string;
  body: string;
  user_id: number;
  author: string;
}

interface formField {
  title: string;
  slug: string;
  body: string;
}

interface PostContextType {
  posts: PostItem[];
  post: PostItem;
  isLoading: boolean;
  isError: boolean;
  formValues: formField;
  retrievePosts: () => void;
  retrievePost: (id: number) => Promise<void>;
  storePost: (data: PostItem) => Promise<void>;
  updatePost: (id: number, data: PostItem) => Promise<void>;
  deletePost: (id: number) => Promise<void>;
}

const PostContext = createContext<PostContextType>({
  posts: [],
  post: { id: 0, title: "", slug: "", body: "", user_id: 0, author: '' },
  isLoading: false,
  isError: false,
  formValues: {
    title: "",
    slug: "",
    body: "",
  },
  retrievePosts: async () => {},
  retrievePost: async () => {},
  storePost: async () => {},
  updatePost: async () => {},
  deletePost: async () => {},
});

const initialValues: any = {
  title: "",
  slug: "",
  body: "",
};

export const PostProvider = ({ children }: any) => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<PostItem[]>([]);
  const [post, setPost] = useState<PostItem>({
    id: 0,
    title: "",
    slug: "",
    body: "",
    user_id: 0,
    author: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [formValues, setFormValues] = useState<formField>(initialValues);

  const retrievePosts = async () => {
    setIsLoading(true);
    try {
      await axios.get("http://127.0.0.1:8000/api/v1/posts").then((res) => {
        setPosts(res.data.data);
        setIsLoading(false);
        setIsError(false);
      });
    } catch (errs) {
      setIsError(true);
      setIsLoading(false);
      console.log(errs);
    }
  };

  const retrievePost = async (id: number) => {
    setIsLoading(true);
    const response = await axios.get(
      `http://127.0.0.1:8000/api/v1/posts/${id}`
    );
    const apiPost = response.data.data;
    setPost(apiPost);
    setFormValues({
      title: apiPost.title,
      slug: apiPost.slug,
      body: apiPost.body,
    });
    setIsLoading(false);
    setIsError(false);
  };

  const storePost = async (data: PostItem) => {
    try {
      await axios.post("http://127.0.0.1:8000/api/v1/posts", data);
      retrievePosts();
      setFormValues(initialValues);
      navigate("/");
    } catch (errs) {
      setIsError(true);
    }
  };

  const updatePost = async (id: number, data: PostItem) => {
    try {
      await axios.put(`http://127.0.0.1:8000/api/v1/posts/${id}`, data);
      retrievePosts();
      setFormValues(initialValues);
      navigate("/");
    } catch (errs) {
      setIsError(true);
    }
  };

  const deletePost = async (id: number) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      confirmButtonColor: "#d33",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://127.0.0.1:8000/api/v1/posts/${id}`);
          retrievePosts();
          navigate("/");
        } catch (errs) {
          alert("Bad Request");
        }
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
        formValues,
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
