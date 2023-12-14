import React, { useEffect, useRef } from "react";
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
import { staticI18n, useI18n } from "@src/services/I18nProvider/I18nProvider.tsx";
// import Feedback from "@src/views/chipassist/Feedback/Feedback";
import { Hidden, Paper, Tooltip, Zoom } from "@material-ui/core";
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
import { showHint } from "@src/store/rfqList/rfqListActions";
import { useTheme, withStyles } from "@material-ui/core/styles";
import { triggerReloadPage } from "@src/store/chat/chatActions";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useStyles } from "./topMenuStyles";

const { t: _t } = staticI18n("menu");
export const chipAssistMenuList = [
  { name: "home", url: "/", label: _t("home") },
  { name: "parts", url: "/parts", label: _t("parts") },
  { name: "bom-create", url: "/bom/create-file", label: _t("bom") },
  { name: "rfq", url: "/rfq-list-quotes", label: "RFQ List" },
  { name: "messages", url: "/messages", label: _t("chat") },
  { name: "general", url: "/profile/general", label: _t("profile") },
  { name: "blog", url: "/blog", label: _t("blog") },
];

const HtmlTooltip = withStyles(() => ({
  tooltip: {
    backgroundColor: `transparent`,
    borderRadius: "10px",
    padding: 0,
    color: `black`,
    transition: "all 250ms ease",
    pointerEvents: "all",
    width: "250px",
    margin: "4px 0!important",
    // border: `2px solid ${theme.palette.app.blue800}`,
  },
  arrow: {
    fontSize: "10px",
    color: `white`,
  },
}))(Tooltip);

const TopMenu = ({ isMobile }) => {
  const classes = useStyles();
  const { t } = useI18n("menu");
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isXsChat = useMediaQuery(theme.breakpoints.down(880));

  const hintCloseTimeout = useRef(null);

  const isAuthenticated = useAppSelector((state) => state.auth.token !== null);
  const isShowHint = useAppSelector((state) => state.rfqList.showHint);
  // const isCollapseHint = useAppSelector((state) => state.rfqList.collapseHint);
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

  useEffect(() => {
    if (isShowHint) {
      if (!hintCloseTimeout.current) {
        hintCloseTimeout.current = setTimeout(() => {
          dispatch(showHint(false));
        }, 20000);
      }
    }
  }, [isShowHint]);

  const isChipAssist = [ID_CHIPASSIST, ID_MASTER].includes(constants.id);

  const reloadChatPage = () => {
    if (isXsChat) dispatch(triggerReloadPage());
  };

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
      <HtmlTooltip
        title={
          <Paper
            elevation={10}
            style={{ display: "flex", justifyContent: "center", flexDirection: "column", padding: "1.5em" }}
          >
            <span style={{ width: "100%", textAlign: "center", fontSize: "1.7em", marginTop: "10px" }}>
              You can create group RFQ here
            </span>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", marginTop: "6px" }}>
              <p onClick={() => dispatch(showHint(false))} className={classes.gotItButton}>
                Got it!
              </p>
            </div>
          </Paper>
        }
        disableFocusListener
        disableTouchListener
        open={!isMobile && isShowHint}
        // open={true}
        arrow
        TransitionComponent={Zoom}
      >
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
      </HtmlTooltip>
      <div className={itemClasses}>
        <NavLink
          className={clsx(classes.topMenuItemLink, {
            [classes.active]: window.location.pathname.includes("/messages"),
          })}
          to={`/messages`}
          onClick={reloadChatPage}
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
