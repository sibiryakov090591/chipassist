import React from "react";
import { NavLink } from "react-router-dom";
import HomeIcon from "@material-ui/icons/HomeOutlined";
import SettingsIcon from "@material-ui/icons/SettingsOutlined";
// import PeopleIcon from "@material-ui/icons/PeopleOutlined";
// import LocalMallOutlinedIcon from "@material-ui/icons/LocalMallOutlined";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";
import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";
// import FindInPageOutlinedIcon from "@material-ui/icons/FindInPageOutlined";
// import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";
// import AccountBoxIcon from "@material-ui/icons/AccountBox";
import { useI18n } from "@src/services/I18nProvider/I18nProvider.tsx";
// import Feedback from "@src/views/chipassist/Feedback/Feedback";
import { Hidden } from "@material-ui/core";
import useAppSelector from "@src/hooks/useAppSelector";
import ListAltIcon from "@material-ui/icons/ListAlt";
import ReceiptIcon from "@material-ui/icons/Receipt";
import { ID_CHIPASSIST, ID_MASTER } from "@src/constants/server_constants";
import constants from "@src/constants/constants";
import clsx from "clsx";
import { logout } from "@src/store/authentication/authActions";
import useAppDispatch from "@src/hooks/useAppDispatch";
import ChatUnreadTotalCount from "@src/components/ChatUnreadTotalCount/ChatUnreadTotalCount";
import ChatOutlinedIcon from "@material-ui/icons/ChatOutlined";
import { useStyles } from "./topMenuStyles";

const TopMenu = ({ isMobile }) => {
  const classes = useStyles();
  const { t } = useI18n("menu");
  const dispatch = useAppDispatch();

  const isAuthenticated = useAppSelector((state) => state.auth.token !== null);
  // const ordersPage = useAppSelector((state) => state.orders.orders.page);

  // // Show feedback modal
  // const [openFeedback, setOpenFeedback] = useState(false);
  // const handleFeedback = () => {
  //   setOpenFeedback(!openFeedback);
  // };

  const itemClasses = [classes.topMenuItem, isMobile ? classes.topMenuItemMobile : ""].join(" ");

  const logoutHandler = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  const isChipAssist = [ID_CHIPASSIST, ID_MASTER].includes(constants.id);

  return (
    <div className={`${classes.topMenu} ${isMobile ? classes.topMenuMobile : ""}`}>
      <div className={itemClasses}>
        <NavLink
          className={clsx(classes.topMenuItemLink, { [classes.active]: window.location.pathname === "/" })}
          to={`/`}
        >
          {isMobile && <HomeIcon className={`${classes.topMenuItemIcon}`} />}
          {t("home")}
        </NavLink>
      </div>
      {isChipAssist && (
        <div className={itemClasses}>
          <NavLink
            className={clsx(classes.topMenuItemLink, { [classes.active]: window.location.pathname.includes("/parts") })}
            to={`/parts`}
          >
            {isMobile && <ListAltIcon className={`${classes.topMenuItemIcon}`} />}
            {t("parts")}
          </NavLink>
        </div>
      )}
      <Hidden smDown>
        <div className={itemClasses}>
          <NavLink
            className={clsx(classes.topMenuItemLink, { [classes.active]: window.location.pathname.includes("/bom/") })}
            to={`/bom/create-file`}
          >
            {isMobile && <DescriptionOutlinedIcon className={`${classes.topMenuItemIcon}`} />}
            {t("bom")}
          </NavLink>
        </div>
      </Hidden>
      {/* <div className={itemClasses}> */}
      {/*  <NavLink */}
      {/*    className={clsx(classes.topMenuItemLink, { [classes.active]: window.location.pathname.includes("/pcb") })} */}
      {/*    to={`/pcb`} */}
      {/*  > */}
      {/*    {isMobile && <MemoryOutlinedIcon className={`${classes.topMenuItemIcon}`} />} */}
      {/*    {t("pcb")} */}
      {/*  </NavLink> */}
      {/* </div> */}
      <div className={itemClasses}>
        <NavLink
          className={clsx(classes.topMenuItemLink, {
            [classes.active]: window.location.pathname.includes("/rfq-list-quotes"),
          })}
          to={`/rfq-list-quotes`}
        >
          {isMobile && <DescriptionOutlinedIcon className={`${classes.topMenuItemIcon}`} />}
          {"RFQ List"}
        </NavLink>
      </div>
      <div className={itemClasses}>
        <NavLink
          className={clsx(classes.topMenuItemLink, {
            [classes.active]: window.location.pathname.includes("/messages"),
          })}
          to={`/messages`}
        >
          {isMobile && <ChatOutlinedIcon className={`${classes.topMenuItemIcon}`} />}
          <span style={{ position: "relative" }}>
            {t("chat")}
            <ChatUnreadTotalCount className={classes.chatUnreadCount} />
          </span>
        </NavLink>
      </div>
      {isAuthenticated && (
        <>
          {/* <div className={itemClasses}> */}
          {/*  <NavLink className={`${classes.topMenuItemLink}`} to={`/orders?page=${ordersPage || 1}`}> */}
          {/*    {isMobile && <LocalMallOutlinedIcon className={`${classes.topMenuItemIcon}`} />} */}
          {/*    {t("orders")} */}
          {/*  </NavLink> */}
          {/* </div> */}
          {/* <div className={itemClasses}> */}
          {/*  <NavLink className={`${classes.topMenuItemLink}`} to={`/rfq`}> */}
          {/*    {isMobile && <FindInPageOutlinedIcon className={`${classes.topMenuItemIcon}`} />} */}
          {/*    {t("rfqs")} */}
          {/*  </NavLink> */}
          {/* </div> */}
          <div className={itemClasses}>
            <NavLink
              to={`/profile/general`}
              className={clsx(classes.topMenuItemLink, {
                [classes.active]: window.location.pathname.includes("/profile/"),
              })}
            >
              {isMobile && <SettingsIcon className={`${classes.topMenuItemIcon}`} />}
              {t("profile")}
            </NavLink>
          </div>
        </>
      )}
      {/* <div className={itemClasses}> */}
      {/*  <div className={classes.topMenuItemLink} onClick={handleFeedback}> */}
      {/*    {isMobile && <PeopleIcon className={`${classes.topMenuItemIcon}`} />} */}
      {/*    {t("feedback")} */}
      {/*  </div> */}
      {/*  <Feedback open={openFeedback} onClose={handleFeedback} /> */}
      {/* </div> */}
      {isChipAssist && (
        <div className={itemClasses}>
          <NavLink
            className={clsx(classes.topMenuItemLink, { [classes.active]: window.location.pathname.includes("/blog") })}
            to={`/blog`}
          >
            {isMobile && <ReceiptIcon className={`${classes.topMenuItemIcon}`} />}
            {t("blog")}
          </NavLink>
        </div>
      )}
      {isMobile && isAuthenticated && (
        <div className={itemClasses}>
          <NavLink className={`${classes.topMenuItemLink} top-menu-logout`} to={`/logout`} onClick={logoutHandler}>
            <ExitToAppOutlinedIcon className={`${classes.topMenuItemIcon}`} />
            {t("logout")}
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default TopMenu;
