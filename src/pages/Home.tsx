import { Post } from "../components/common/Post";
import { useContext, useEffect, useState } from "react";
import PostContext, { CategoryType } from "../context/PostContext";
import ClipLoader from "react-spinners/ClipLoader";
import Paginate from "../components/common/Paginate";
import { Sidebar } from "../components/common/Sidebar";

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
        className={`
        flex flex-col items-center w-full h-full md:w-3/4 space-y-5
          ${posts.length <= 3 && "h-screen md:h-[77vh]"}`
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
          <div className="blog-none">
            {search === "" && category !== ""
              ? `No posts in ${category} category`
              : `No matching post for "${search}"`}
          </div>
        )}

        {/* Pagination controls */}
        <Paginate
          currentPage={currentPage}
          totalPages={paginateData.meta.last_page}
          handlePageChange={handlePageChange}
        />
      </div>

      {/* Side Bar */}
      <Sidebar
        search={search}
        updateSearch={updateSearch}
        categories={categories}
        category={category}
        updateSelectedCategory={updateSelectedCategory}
      />
    </div>
  );
};
