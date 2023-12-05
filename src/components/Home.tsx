import { Post } from "./post/Post";
import searchIcon from "../assets/search.svg";
import { useContext, useEffect, useMemo, useState } from "react";
import PostContext from "../Context/PostContext";
import ClipLoader from "react-spinners/ClipLoader";

export const Home = () => {
  const { posts, retrievePosts, isLoading, isError } = useContext(PostContext);
  const [search, setSearch] = useState("");

  useEffect(() => {
    retrievePosts();
    // console.log("Session Token: "+String(sessionStorage.getItem('ACCESS_TOKEN')))
  }, []);

  const filteredPosts = useMemo(() => {
    return posts.filter((item) => {
      return (
        search.toLowerCase() === "" ||
        item.title.toLowerCase().includes(search.toLowerCase())
      );
    });
  }, [posts, search]);

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
            filteredPosts.map(({ id, title, slug, author }: any) => (
              <Post
                key={id}
                id={id}
                title={title}
                slug={slug}
                author={author}
              />
            ))
          ) : (
            <div className="blog-none">No matching post for "{search}"</div>
          )
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
      </div>
    </div>
  );
};
