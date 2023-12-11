import { Post } from "./post/Post";
import searchIcon from "../assets/search.svg";
import { useContext, useEffect, useMemo, useState } from "react";
import PostContext from "../context/PostContext";
import ClipLoader from "react-spinners/ClipLoader";
import Paginate from "../components/Common/Paginate";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import toast from "react-hot-toast";

export const Home = () => {
  const { posts, retrievePosts, isLoading, isError, paginateData } =
    useContext(PostContext);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    retrievePosts(currentPage);
    setTotalPages(paginateData.meta.last_page);
    // console.log(token);
  }, [currentPage, token]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const filteredPosts = useMemo(() => {
    return posts.filter((item) => {
      return (
        search.toLowerCase() === "" ||
        item.post.title.toLowerCase().includes(search.toLowerCase())
      );
    });
  }, [posts, search]);

  const http = axios.create({
    baseURL: "http://127.0.0.1:8000/",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });

  return (
    <div className="flex px-10 py-5 space-x-4">
      <div className="flex flex-col items-center w-3/4 space-y-5">
        {isError ? (
          <div className="blog-error">
            <p>Error loading data</p>
          </div>
        ) : isLoading ? (
          <div className="loader">
            <ClipLoader
              color={"#000000"}
              loading={isLoading}
              size={25}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
            <p>Loading...</p>
          </div>
        ) : posts.length > 0 ? (
          filteredPosts.length > 0 ? (
            filteredPosts.map(({ post, relationships }: any) => (
              <Post
                key={post.id}
                id={post.id}
                title={post.title}
                thumbnail={post.thumbnail}
                category={post.category}
                body={post.body}
                author={relationships.author}
                profile={relationships.author_pf}
              />
            ))
          ) : (
            <div className="blog-none">No matching post for "{search}"</div>
          )
        ) : (
          <div className="blog-none">No Data</div>
        )}

        {/* Pagination controls */}
        <Paginate
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      </div>

      {/* Side Bar */}
      <div className="shadow-lg border border-gray-200 rounded-lg w-3/12 p-5">
        <div className="flex justify-between relative">
          <input
            className="border w-full pl-4 py-2"
            name="search"
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            placeholder="Search..."
          />
          <img
            className="absolute right-4 mt-3 w-4"
            src={searchIcon}
            alt="search"
          />
        </div>
        <button
          onClick={() => {
            toast.promise(
              http
                .get("http://127.0.0.1:8000/api/v1/user")
                .then((res) => console.log(res.data)),
              {
                loading: "Loading...",
                success: "Got the data",
                error: "Oops something went wrong!",
              }
            );
          }}
        >
          Click for user info
        </button>
      </div>
    </div>
  );
};
