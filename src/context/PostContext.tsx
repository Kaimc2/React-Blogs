import axios from "axios";
import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { axiosClient } from "../utils/axios.client";
import AuthContext from "./AuthContext";

export interface PostItem {
  post: {
    id: number;
    title: string;
    thumbnail: string;
    category: string;
    category_id: string;
    body: string;
  };
  relationships: {
    author_id: number;
    author: string;
    author_pf: string;
  };
}

export interface formField {
  title: string;
  thumbnail: string;
  body: string;
  category_id: string;
  author_id: number;
}

export interface PaginateType {
  links: {};
  meta: any;
}

export interface CategoryType {
  id: string;
  name: string;
}

interface PostContextType {
  posts: PostItem[];
  post: PostItem;
  isLoading: boolean;
  isError: boolean;
  paginateData: PaginateType;
  retrievePosts: (currentPage: number) => void;
  retrievePost: (id: string) => Promise<void>;
  storePost: (data: any) => Promise<void>;
  updatePost: (id: string, data: any) => Promise<void>;
  deletePost: (id: string) => Promise<void>;
  getCategories: () => void;
}

const PostContext = createContext<PostContextType>({
  posts: [],
  post: {
    post: {
      id: 0,
      title: "",
      thumbnail: "",
      category: "",
      category_id: "",
      body: "",
    },
    relationships: { author_id: 0, author: "", author_pf: "" },
  },
  isLoading: false,
  isError: false,
  paginateData: { links: {}, meta: {} },
  retrievePosts: async () => {},
  retrievePost: async () => {},
  storePost: async () => {},
  updatePost: async () => {},
  deletePost: async () => {},
  getCategories: async () => {},
});

export const PostProvider = ({ children }: any) => {
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  const [posts, setPosts] = useState<PostItem[]>([]);
  const [post, setPost] = useState<PostItem>({
    post: {
      id: 0,
      title: "",
      thumbnail: "",
      category: "",
      category_id: "",
      body: "",
    },
    relationships: { author_id: 0, author: "", author_pf: "" },
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [paginateData, setPaginateData] = useState<PaginateType>({
    links: {},
    meta: {},
  });

  const retrievePosts = async (currentPage: number) => {
    setIsLoading(true);

    await axios
      .get(`http://127.0.0.1:8000/api/v1/posts?page=${currentPage}`)
      .then((res) => {
        setPosts(res.data.data);
        setPaginateData({ links: res.data.links, meta: res.data.meta });

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

  const storePost = async (data: FormData) => {
    await axios.post("http://127.0.0.1:8000/api/v1/posts", data).then(() => {
      retrievePosts(1);
      navigate("/");
    });
  };

  const updatePost = async (id: string, data: FormData) => {
    await axios
      .post(`http://127.0.0.1:8000/api/v1/posts/${id}`, data)
      .then(() => {
        retrievePosts(1);
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
            retrievePosts(1);
            navigate("/dashboard");
            toast.success("Post deleted successfully");
          });
      }
    });
  };

  const getCategories = async () => {
    const categories: CategoryType[] = await axiosClient.get(
      "http://127.0.0.1:8000/api/v1/categories",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return categories;
  };

  return (
    <PostContext.Provider
      value={{
        posts,
        post,
        isLoading,
        isError,
        paginateData,
        retrievePosts,
        retrievePost,
        storePost,
        updatePost,
        deletePost,
        getCategories,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export default PostContext;
