import { Dispatch, SetStateAction } from "react";
import { Link, useLocation } from "react-router-dom";

interface Props {
  url: string,
  name: string,
  onBtnClick?: Dispatch<SetStateAction<boolean>>
}

export const NavLink = (props: Props) => {
  const location = useLocation();

  return (
    <li
      onClick={() => {
        props.onBtnClick ? props.onBtnClick(false) : {};
      }}
      className={
        location.pathname === props.url
          ? "navbar-btn after:scale-100"
          : "navbar-btn"
      }
    >
      <Link to={props.url}>{props.name}</Link>
    </li>
  );
};
