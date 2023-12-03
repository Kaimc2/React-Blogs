import { Post } from "./post/Post";
import searchIcon from "../assets/search.svg";
import { useContext, useEffect, useState } from "react";
import PostContext from "../Context/PostContext";
import ClipLoader from "react-spinners/ClipLoader";
// import axios from "axios";
// import AuthContext from "../Context/AuthContext";

export const Home = () => {
  const { posts, retrievePosts, isLoading, isError } = useContext(PostContext);
  // const { token } = useContext(AuthContext);
  const [search, setSearch] = useState("");

  useEffect(() => {
    retrievePosts();
  }, []);

  // const http = axios.create({
  //   baseURL: "http://127.0.0.1:8000/",
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  //   withCredentials: true,
  // });

  // const getUserInfo = () => {
  //   http
  //     .get("api/v1/user")
  //     .then((res) => {
  //       console.log("User Info: " + JSON.stringify(res.data));
  //     })
  //     .catch((err) => console.log(err));
  // };

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
          posts
            .filter((item) => {
              return search.toLowerCase() === ""
                ? item
                : item.title.toLowerCase().includes(search.toLowerCase());
            })
            .map((post: any) => {
              return (
                <Post
                  key={post.id}
                  id={post.id}
                  title={post.title}
                  slug={post.slug}
                  author={post.author}
                />
              );
            })
        ) : (
          <div className="blog-none">No Data</div>
        )}
      </div>
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
        {/* <button
          onClick={() => {
            getUserInfo();
          }}
        >
          Get User
        </button> */}
      </div>
    </div>
  );
};
