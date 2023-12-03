import { Link } from "react-router-dom";

export const NavLink = (props: any) => {
  return (
    <li className="hover:bg-blue-500 hover:text-white rounded-md px-3 py-1">
      <Link to={props.url}>{props.name}</Link>
    </li>
  );
};
