import { Post } from "./post/Post";
import searchIcon from "../assets/search.svg";
import { useContext, useEffect, useState } from "react";
import PostContext from "../Context/PostContext";

export const Home = () => {
  const { posts, retrievePosts, isLoading, isError } = useContext(PostContext);
  const [search, setSearch] = useState("");

  useEffect(() => {
    retrievePosts();
  }, []);

  if (isError) {
    return <p>Error loading data.</p>;
  }

  return (
    <div className="flex px-10 py-5 space-x-4">
      <div className="flex flex-col items-center w-3/4 space-y-5">
        {isLoading ? (
          <div className="flex flex-col w-11/12 space-y-4 p-4 shadow-xl border border-gray-200 rounded-md">
            Loading...
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
          <div className="flex items-center min-h-[5rem] font-semibold w-11/12 space-y-4 p-4 shadow-xl border border-gray-200 rounded-md">
            No Data
          </div>
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
      </div>
    </div>
  );
};
