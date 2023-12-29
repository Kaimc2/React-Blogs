import { DebounceInput } from "react-debounce-input";
import { RiSearch2Line } from "react-icons/ri";
import { Dispatch, SetStateAction } from "react";

interface Props {
  search?: string;
  updateSearch:
    | Dispatch<SetStateAction<string>>
    | ((newString: string) => void);
}

export const Search = ({ search, updateSearch }: Props) => {
  return (
    <div className="flex justify-between relative">
      <DebounceInput
        className="border border-gray-300 w-full pl-4 py-2 shadow-md focus:outline-none dark:bg-slate-700 dark:border-slate-900"
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

      <div className="absolute right-4 mt-3 w-4 dark:border-white">
        <RiSearch2Line />
      </div>
    </div>
  );
};
