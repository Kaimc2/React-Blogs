import { Post } from "../components/Common/Post";
import searchIcon from "../assets/search.svg";
import { useContext, useEffect, useState } from "react";
import PostContext, { CategoryType } from "../context/PostContext";
import ClipLoader from "react-spinners/ClipLoader";
import Paginate from "../components/Common/Paginate";
import { DebounceInput } from "react-debounce-input";

export const Home = () => {
  const {
    posts,
    isLoading,
    isError,
    paginateData,
    search,
    category,
    retrievePosts,
    updateSearch,
    updateSelectedCategory,
    getCategories,
  } = useContext(PostContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const token = localStorage.getItem("ACCESS_TOKEN");

  useEffect(() => {
    retrievePosts(currentPage, search, category);
    const fetchCategories = async () => {
      const res: any = await getCategories();
      setCategories(res.data.data);
    };

    fetchCategories();
    // console.log(token);
  }, [currentPage, token, search, category]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="flex md:px-10 py-5 space-x-4">
      <div
        className={
          posts.length > 3
            ? "flex flex-col items-center w-full md:w-3/4 space-y-5"
            : "h-full md:h-[77vh] flex flex-col items-center w-full md:w-3/4 space-y-5"
        }
      >
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
          posts.map(({ post, relationships }: any) => (
            <Post
              key={post.id}
              id={post.id}
              title={post.title}
              thumbnail={post.thumbnail}
              category={post.category}
              body={post.body}
              author={relationships.author}
              profile={relationships.author_pf}
              setCategory={updateSelectedCategory}
              selectedCategory={category}
            />
          ))
        ) : (
          <div className="blog-none">No matching post for "{search}"</div>
        )}

        {/* Pagination controls */}
        <Paginate
          currentPage={currentPage}
          totalPages={paginateData.meta.last_page}
          handlePageChange={handlePageChange}
        />
      </div>

      {/* Side Bar */}
      <div className="hidden md:block h-fit sticky top-24 shadow-lg border border-gray-200 rounded-lg w-3/12 p-5 transition ease-in-out">
        <div className="flex justify-between relative">
          <DebounceInput
            className="border border-gray-300 w-full pl-4 py-2 shadow-md focus:outline-none"
            name="search"
            type="text"
            value={search}
            minLength={1}
            debounceTimeout={500}
            onChange={(e) => {
              updateSearch(e.target.value);
            }}
            placeholder="Search..."
          />
          <img
            className="absolute right-4 mt-3 w-4"
            src={searchIcon}
            alt="search"
          />
        </div>

        {/* Divider */}
        <div className="h-[0.3rem] mx-1 my-4 rounded-md bg-gray-300 shadow-md" />

        <div className="ml-1">
          <h1 className="text-xl my-5">Categories</h1>
          <ul className="space-y-2">
            {categories.length > 0 &&
              categories.map(({ id, name }) => {
                return (
                  <button
                    className="flex space-x-2 hover:underline ml-4"
                    onClick={() => {
                      category === name
                        ? updateSelectedCategory("")
                        : updateSelectedCategory(name);
                    }}
                    key={id}
                  >
                    <p>{name}</p>
                    {category === name && <p>X</p>}
                  </button>
                );
              })}
          </ul>
        </div>
      </div>
    </div>
  );
};
