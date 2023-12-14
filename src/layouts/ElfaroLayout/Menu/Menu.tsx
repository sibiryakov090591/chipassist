import React from "react";
import { NavLink } from "react-router-dom";
import HomeIcon from "@material-ui/icons/HomeOutlined";
import SearchIcon from "@material-ui/icons/Search";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";
import useAppSelector from "@src/hooks/useAppSelector";
import { logout } from "@src/store/authentication/authActions";
import useAppDispatch from "@src/hooks/useAppDispatch";
import { useStyles } from "./styles";

interface Props {
  isMobile: boolean;
  linkClassName?: string;
}

const Menu: React.FC<Props> = ({ isMobile, linkClassName }) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.auth.token !== null && !state.auth.loading);

  const logoutHandler = (e: any) => {
    e.preventDefault();
    dispatch(logout());
  };

  return (
    <div className={`${classes.container} ${isMobile ? classes.mobile : ""}`}>
      <a className={linkClassName || classes.link} href={"https://chiponline.tech/"}>
        {isMobile && <HomeIcon className={`${classes.icon}`} />}
        Home
      </a>
      {!isMobile && <div className={classes.verticalLine}>|</div>}
      <NavLink className={linkClassName || classes.link} to="/">
        {isMobile && <SearchIcon className={`${classes.icon}`} />}
        Components
      </NavLink>
      {!isMobile && <div className={classes.verticalLine}>|</div>}
      {/* <NavLink className={linkClassName || classes.link} to="/order-pcb"> */}
      {/*  {isMobile && <MemoryOutlinedIcon className={`${classes.icon}`} />} */}
      {/*  Printed Boards */}
      {/* </NavLink> */}
      {isMobile && isAuthenticated && (
        <NavLink className={linkClassName || classes.link} to={`/logout`} onClick={logoutHandler}>
          <ExitToAppOutlinedIcon className={`${classes.icon}`} />
          Logout
        </NavLink>
      )}
    </div>
  );
};

export default Menu;
