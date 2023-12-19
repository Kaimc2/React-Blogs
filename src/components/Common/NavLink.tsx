import { Link, useLocation } from "react-router-dom";

export const NavLink = (props: any) => {
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
