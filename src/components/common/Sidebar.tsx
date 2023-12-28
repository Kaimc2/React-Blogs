import { Search } from "./Search";
import { CategoryType } from "../../context/PostContext";

interface Props {
  search: string;
  updateSearch: (newString: string) => void;
  categories: CategoryType[];
  category: string;
  updateSelectedCategory: (newCategory: string) => void;
}

export const Sidebar = ({
  search,
  updateSearch,
  categories,
  category,
  updateSelectedCategory,
}: Props) => {
  return (
    <div className="hidden md:block h-fit sticky top-24 shadow-lg border border-gray-200 rounded-lg w-3/12 p-5 transition ease-in-out">
      <Search search={search} updateSearch={updateSearch} />

      {/* Divider */}
      <div className="h-[0.3rem] mx-1 my-4 rounded-md bg-gray-300 shadow-md" />

      <div className="ml-1">
        <h1 className="text-xl my-5">Categories</h1>
        <ul className="space-y-3 max-h-[20rem] overflow-y-scroll">
          {categories.length > 0 &&
            categories.map(({ id, name }) => {
              return (
                <button
                  className="category-content"
                  onClick={() => {
                    category === name
                      ? updateSelectedCategory("")
                      : updateSelectedCategory(name);
                  }}
                  key={id}
                >
                  <p className={`${category === name && "active"}`}>{name}</p>
                </button>
              );
            })}
        </ul>
      </div>
    </div>
  );
};
