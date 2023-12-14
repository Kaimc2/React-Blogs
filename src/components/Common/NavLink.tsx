import { Link, useLocation } from "react-router-dom";

export const NavLink = (props: any) => {
  const location = useLocation();

  return (
    <li
      onClick={() => props.onBtnClick(false)}
      className={
        location.pathname === props.url
          ? "navbarBtn after:scale-100"
          : "navbarBtn"
      }
    >
      <Link to={props.url}>{props.name}</Link>
    </li>
  );
};
