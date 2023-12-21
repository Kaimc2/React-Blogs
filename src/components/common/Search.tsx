import { DebounceInput } from "react-debounce-input";
import searchIcon from "../../assets/search.svg";
import { Dispatch, SetStateAction } from "react";

interface Props {
    search?: string,
    updateSearch: Dispatch<SetStateAction<string>> | ((newString: string) => void)
}

export const Search = ({search, updateSearch}: Props) => {
  return (
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
  );
};
