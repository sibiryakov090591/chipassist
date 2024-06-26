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
import { ID_CHIPASSIST, ID_ICSEARCH, ID_MASTER } from "@src/constants/server_constants";
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
import LangMenu from "@src/layouts/HomePage/components/TopBar/components/LangMenu/LangMenu";
import { MemoryOutlined } from "@material-ui/icons";
import { useStyles } from "./topMenuStyles";

const isChipAssist = [ID_CHIPASSIST, ID_MASTER].includes(constants.id);
const isICSearch = constants.id === ID_ICSEARCH;
const { t: _t } = staticI18n("menu");
export const chipAssistMenuList = [
  { name: "home", url: "/", label: _t("home") },
  { name: "parts", url: "/parts", label: _t("parts") },
  { name: "bom-create", url: "/bom/create-file", label: _t("bom") },
  { name: "rfq", url: "/rfq-list-quotes", label: _t("rfq_list") },
  ...(isICSearch && { name: "pcb", url: "/pcb", label: _t("pcb") }),
  ...(isChipAssist && { name: "messages", url: "/messages", label: _t("chat") }),
  { name: "general", url: "/profile/general", label: _t("profile") },
  ...(isChipAssist && { name: "blog", url: "/blog", label: _t("blog") }),
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

  const reloadChatPage = () => {
    if (isXsChat) dispatch(triggerReloadPage());
    navigateHandler();
  };

  const navigateHandler = () => {
    window.scrollTo({ top: 0 });
  };

  return (
    <div className={`${classes.topMenu} ${isMobile ? classes.topMenuMobile : ""}`}>
      <div className={itemClasses}>
        <NavLink
          className={clsx(classes.topMenuItemLink, { [classes.active]: window.location.pathname === "/" })}
          to={`/`}
          onClick={navigateHandler}
        >
          {isMobile && <HomeIcon className={`${classes.topMenuItemIcon}`} />}
          {t("home")}
        </NavLink>
      </div>
      <div className={itemClasses}>
        <NavLink
          className={clsx(classes.topMenuItemLink, { [classes.active]: window.location.pathname.includes("/parts") })}
          to={`/parts`}
          onClick={navigateHandler}
        >
          {isMobile && <ListAltIcon className={`${classes.topMenuItemIcon}`} />}
          {t("parts")}
        </NavLink>
      </div>
      <Hidden smDown>
        <div className={itemClasses}>
          <NavLink
            className={clsx(classes.topMenuItemLink, { [classes.active]: window.location.pathname.includes("/bom/") })}
            to={`/bom/create-file`}
            onClick={navigateHandler}
          >
            {isMobile && <DescriptionOutlinedIcon className={`${classes.topMenuItemIcon}`} />}
            {t("bom")}
          </NavLink>
        </div>
      </Hidden>
      <HtmlTooltip
        title={
          <Paper
            elevation={10}
            style={{ display: "flex", justifyContent: "center", flexDirection: "column", padding: "1.5em" }}
          >
            <span style={{ width: "100%", textAlign: "center", fontSize: "1.7em", marginTop: "10px" }}>
              {t("hint.title")}
            </span>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", marginTop: "6px" }}>
              <p onClick={() => dispatch(showHint(false))} className={classes.gotItButton}>
                {t("hint.button")}
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
            onClick={navigateHandler}
          >
            {isMobile && <DescriptionOutlinedIcon className={`${classes.topMenuItemIcon}`} />}
            {t("rfq_list")}
          </NavLink>
        </div>
      </HtmlTooltip>
      {!isChipAssist && (
        <div className={itemClasses}>
          <NavLink
            className={clsx(classes.topMenuItemLink, { [classes.active]: window.location.pathname.includes("/pcb") })}
            to={`/pcb`}
            onClick={navigateHandler}
          >
            {isMobile && <MemoryOutlined className={`${classes.topMenuItemIcon}`} />}
            {t("pcb")}
          </NavLink>
        </div>
      )}
      {isChipAssist && (
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
      )}
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
              onClick={navigateHandler}
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
            onClick={navigateHandler}
          >
            {isMobile && <ReceiptIcon className={`${classes.topMenuItemIcon}`} />}
            {t("blog")}
          </NavLink>
        </div>
      )}
      {constants.SHOW_LANG_SWITCHER && <LangMenu />}
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
