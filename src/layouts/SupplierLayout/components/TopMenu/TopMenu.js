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

export const responsesMenuList = [
  { name: "about", url: "/about", label: "About", getIcon: (className) => <HelpOutlineIcon className={className} /> },
  {
    name: "requests",
    url: "/supplier-response",
    label: "Requests",
    getIcon: (className) => <HomeIcon className={className} />,
  },
  {
    name: "statistics",
    url: "/statistics",
    label: "Statistics",
    getIcon: (className) => <EqualizerIcon className={className} />,
  },
  {
    name: "messages",
    url: "/messages",
    label: "Messages",
    getIcon: (className) => <ChatOutlinedIcon className={className} />,
  },
  ...(constants.title === "Master" && [
    {
      name: "upload",
      url: "/adapter/upload",
      label: "Data File Upload",
      getIcon: (className) => <PublishIcon className={className} />,
    },
  ]),
  {
    name: "profile",
    url: "/profile/general",
    label: "Profile",
    getIcon: (className) => <SettingsIcon className={className} />,
  },
];

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
      {responsesMenuList.map((item) => {
        if (!item) return null;
        return (
          <div key={item.name} className={itemClasses}>
            <NavLink
              className={clsx(
                classes.topMenuItemLink,
                item.name === "profile" && {
                  active: window.location.pathname.includes("/profile/"),
                },
              )}
              to={item.url}
              onClick={item.name === "messages" && reloadChatPage}
            >
              {isMobile && item.getIcon(classes.topMenuItemIcon)}
              {item.label}
              {item.name === "messages" && <ChatUnreadTotalCount className={classes.chatUnreadCount} />}
            </NavLink>
          </div>
        );
      })}
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
