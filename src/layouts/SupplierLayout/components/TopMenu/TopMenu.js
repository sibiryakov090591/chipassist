import React from "react";
import { NavLink } from "react-router-dom";
import HomeIcon from "@material-ui/icons/HomeOutlined";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import PublishIcon from "@material-ui/icons/Publish";
import ChatOutlinedIcon from "@material-ui/icons/ChatOutlined";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import constants from "@src/constants/constants";
import { ID_MASTER, ID_SUPPLIER_RESPONSE } from "@src/constants/server_constants";
import ChatUnreadTotalCount from "@src/components/ChatUnreadTotalCount/ChatUnreadTotalCount";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";
import useAppSelector from "@src/hooks/useAppSelector";
import { logout } from "@src/store/authentication/authActions";
import useAppDispatch from "@src/hooks/useAppDispatch";
import { useStyles } from "./topMenuStyles";

const TopMenu = ({ isMobile }) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const isSupplierResponse = constants.id === ID_SUPPLIER_RESPONSE;
  const isAuthenticated = useAppSelector((state) => state.auth.token !== null);

  const linkStyleClass = isSupplierResponse ? classes.supplierTopMenuItemLink : classes.topMenuItemLink;

  const itemClasses = [classes.topMenuItem, isMobile ? classes.topMenuItemMobile : ""].join(" ");

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <div className={`${classes.topMenu} ${isMobile ? classes.topMenuMobile : ""}`}>
      <div className={itemClasses}>
        <NavLink className={`${linkStyleClass}`} to={`/supplier-response`}>
          {isMobile && <HomeIcon className={`${classes.topMenuItemIcon}`} />}
          Requests
        </NavLink>
      </div>
      <div className={itemClasses}>
        <NavLink className={`${linkStyleClass}`} to={`/statistics`}>
          {isMobile && <EqualizerIcon className={`${classes.topMenuItemIcon}`} />}
          Statistics
        </NavLink>
      </div>
      {constants.id === ID_MASTER && (
        <div className={itemClasses}>
          <NavLink className={`${linkStyleClass}`} to={`/file-upload`}>
            {isMobile && <PublishIcon className={`${classes.topMenuItemIcon}`} />}
            Data File Upload
          </NavLink>
        </div>
      )}
      <div className={itemClasses}>
        <NavLink className={`${linkStyleClass}`} to={`/messages`}>
          {isMobile && <ChatOutlinedIcon className={`${classes.topMenuItemIcon}`} />}
          <span style={{ position: "relative" }}>
            Messages
            <ChatUnreadTotalCount className={classes.chatUnreadCount} />
          </span>
        </NavLink>
      </div>
      <div className={itemClasses}>
        <NavLink className={`${linkStyleClass}`} to={`/help`}>
          {isMobile && <HelpOutlineIcon className={`${classes.topMenuItemIcon}`} />}
          Help
        </NavLink>
      </div>
      {isMobile && isAuthenticated && (
        <div className={itemClasses}>
          <div className={`${linkStyleClass} top-menu-logout`} onClick={logoutHandler}>
            <ExitToAppOutlinedIcon className={`${classes.topMenuItemIcon}`} />
            Logout
          </div>
        </div>
      )}
    </div>
  );
};

export default TopMenu;
