import React from "react";
import { NavLink } from "react-router-dom";
import HomeIcon from "@material-ui/icons/HomeOutlined";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import PublishIcon from "@material-ui/icons/Publish";
import ChatOutlinedIcon from "@material-ui/icons/ChatOutlined";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import constants from "@src/constants/constants";
import ChatUnreadTotalCount from "@src/components/ChatUnreadTotalCount/ChatUnreadTotalCount";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";
import useAppSelector from "@src/hooks/useAppSelector";
import { logout } from "@src/store/authentication/authActions";
import useAppDispatch from "@src/hooks/useAppDispatch";
import SettingsIcon from "@material-ui/icons/Settings";
import clsx from "clsx";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { triggerReloadPage } from "@src/store/chat/chatActions";
import { useStyles } from "./topMenuStyles";

const TopMenu = ({ isMobile }) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.auth.token !== null);

  const itemClasses = clsx(classes.topMenuItem, { [classes.topMenuItemMobile]: isMobile });

  const theme = useTheme();
  const isXsChat = useMediaQuery(theme.breakpoints.down(880));

  const reloadChatPage = () => {
    if (isXsChat) dispatch(triggerReloadPage());
  };
  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <div className={`${classes.topMenu} ${isMobile ? classes.topMenuMobile : ""}`}>
      <div className={itemClasses}>
        <NavLink className={classes.topMenuItemLink} to={`/home`}>
          {isMobile && <HelpOutlineIcon className={`${classes.topMenuItemIcon}`} />}
          Home
        </NavLink>
      </div>
      <div className={itemClasses}>
        <NavLink className={classes.topMenuItemLink} to={`/supplier-response`}>
          {isMobile && <HomeIcon className={`${classes.topMenuItemIcon}`} />}
          Requests
        </NavLink>
      </div>
      <div className={itemClasses}>
        <NavLink className={classes.topMenuItemLink} to={`/statistics`}>
          {isMobile && <EqualizerIcon className={`${classes.topMenuItemIcon}`} />}
          Statistics
        </NavLink>
      </div>
      {constants.title === "Master" && (
        <div className={itemClasses}>
          <NavLink className={classes.topMenuItemLink} to={`/adapter/upload`}>
            {isMobile && <PublishIcon className={`${classes.topMenuItemIcon}`} />}
            Data File Upload
          </NavLink>
        </div>
      )}
      <div className={itemClasses}>
        <NavLink className={classes.topMenuItemLink} to={`/messages`} onClick={reloadChatPage}>
          {isMobile && <ChatOutlinedIcon className={`${classes.topMenuItemIcon}`} />}
          <span style={{ position: "relative" }}>
            Messages
            <ChatUnreadTotalCount className={classes.chatUnreadCount} />
          </span>
        </NavLink>
      </div>
      <div className={itemClasses}>
        <NavLink
          className={clsx(classes.topMenuItemLink, {
            active: window.location.pathname.includes("/profile/"),
          })}
          to={`/profile/general`}
        >
          {isMobile && <SettingsIcon className={`${classes.topMenuItemIcon}`} />}
          Profile
        </NavLink>
      </div>
      {isMobile && isAuthenticated && (
        <div className={itemClasses}>
          <div className={`${classes.topMenuItemLink} top-menu-logout`} onClick={logoutHandler}>
            <ExitToAppOutlinedIcon className={`${classes.topMenuItemIcon}`} />
            Logout
          </div>
        </div>
      )}
    </div>
  );
};

export default TopMenu;
