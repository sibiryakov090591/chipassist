import React from "react";
import { NavLink } from "react-router-dom";
import HomeIcon from "@material-ui/icons/HomeOutlined";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import PublishIcon from "@material-ui/icons/Publish";
import ChatOutlinedIcon from "@material-ui/icons/ChatOutlined";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import constants from "@src/constants/constants";
import { ID_MASTER } from "@src/constants/server_constants";
import ChatUnreadTotalCount from "@src/components/ChatUnreadTotalCount/ChatUnreadTotalCount";
import { useStyles } from "./topMenuStyles";

const TopMenu = ({ isMobile }) => {
  const classes = useStyles();

  const itemClasses = [classes.topMenuItem, isMobile ? classes.topMenuItemMobile : ""].join(" ");

  return (
    <div className={`${classes.topMenu} ${isMobile ? classes.topMenuMobile : ""}`}>
      <div className={itemClasses}>
        <NavLink className={`${classes.topMenuItemLink}`} to={`/supplier-response`}>
          {isMobile && <HomeIcon className={`${classes.topMenuItemIcon}`} />}
          Requests
        </NavLink>
      </div>
      <div className={itemClasses}>
        <NavLink className={`${classes.topMenuItemLink}`} to={`/statistics`}>
          {isMobile && <EqualizerIcon className={`${classes.topMenuItemIcon}`} />}
          Statistics
        </NavLink>
      </div>
      {constants.id === ID_MASTER && (
        <div className={itemClasses}>
          <NavLink className={`${classes.topMenuItemLink}`} to={`/file-upload`}>
            {isMobile && <PublishIcon className={`${classes.topMenuItemIcon}`} />}
            Data File Upload
          </NavLink>
        </div>
      )}
      <div className={itemClasses}>
        <NavLink className={`${classes.topMenuItemLink}`} to={`/messages`}>
          {isMobile && <ChatOutlinedIcon className={`${classes.topMenuItemIcon}`} />}
          Messages
          <ChatUnreadTotalCount className={classes.chatUnreadCount} />
        </NavLink>
      </div>
      <div className={itemClasses}>
        <NavLink className={`${classes.topMenuItemLink}`} to={`/help`}>
          {isMobile && <HelpOutlineIcon className={`${classes.topMenuItemIcon}`} />}
          Help
        </NavLink>
      </div>
    </div>
  );
};

export default TopMenu;
