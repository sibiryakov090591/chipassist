/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
// import { withBaseIcon } from "react-icons-kit";
// import { shopping_cart } from "react-icons-kit/ikons/shopping_cart";
import clsx from "clsx";
import { AppBar, Collapse, Container, Hidden, Toolbar } from "@material-ui/core";
// import list_icon from "@src/images/Icons/list.svg";
// import checkIsAuthenticated from "@src/utils/auth";
import constants from "@src/constants/constants";
import useAppTheme from "@src/theme/useAppTheme";
import useAppSelector from "@src/hooks/useAppSelector";
import TrySearchPn from "@src/components/TrySearchPn/TrySearchPn";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useStyles as useHomePageStyles } from "@src/views/chipassist/ChipassistHomePage/styles";
import { useTheme } from "@material-ui/core/styles";
import CartBlock from "@src/components/CartBlock/CartBlock";
import { ID_CHIPASSIST, ID_MASTER } from "@src/constants/server_constants";
import useAppDispatch from "@src/hooks/useAppDispatch";
import { showHint } from "@src/store/rfqList/rfqListActions";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import ManufacturerSearchSelect from "@src/layouts/HomePage/components/TopBar/components/ManufacturerSearchSelect/ManufacturerSearchSelect";
import Box from "@material-ui/core/Box";
import { useStyles } from "./topbarStyles";
// import LangMenu from "./components/LangMenu/LangMenu";
import ProfileMenu from "./components/ProfileMenu";
import TopMenu from "./components/TopMenu/TopMenu";
import MobileMenu from "./components/MobileMenu/MobileMenu";
import SearchSuggestion from "./components/SearchSuggestion/SearchSuggestion";
import Authorized from "./components/ProfileMenu/Authorized";
import NotAuthorized from "./components/ProfileMenu/NotAuthorized";

const logo_img = `/${constants.logos.distPath}/${constants.logos.mainLogoDarkBack}`;

export const partNumbers = [
  "MAX32",
  "MSP430",
  "AM29LV",
  "RC1206",
  "KNP100",
  "STM81",
  "TMDSEMU",
  "SM712",
  "LM7805",
  "LM809",
  "M39006",
  "BZX84C1",
  "AD130",
  "RLD65",
  "TXS0104E",
  "HEDS Broadcom",
  "KBPC250",
  "PBC200",
  "TXL025",
  "LM358",
];

const TopBar = (props) => {
  const { className, ...rest } = props;
  const isChipAssist = [ID_CHIPASSIST, ID_MASTER].includes(constants.id);
  const homePageTopOffset = 500;
  const topOffset = 60;
  const appTheme = useAppTheme();
  const { t } = useI18n("menu");
  const classes = useStyles();
  const homePageClasses = useHomePageStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const is1180Down = useMediaQuery(theme.breakpoints.down(1180));
  const dispatch = useAppDispatch();
  const preventCollapseRef = React.useRef(false);
  const isHomePage = window.location.pathname === "/";
  // const Icon = withBaseIcon();
  const isAuthenticated = useAppSelector((state) => state.auth.token !== null && !state.auth.loading);
  const { partNumberExamples } = useAppSelector((state) => state.search);
  // const cart = useAppSelector((state) => state.cart);

  const isShowHint = useAppSelector((state) => state.rfqList.showHint);

  const [collapse, setCollapse] = useState(false);
  const [isShowHeader, setIsShowHeader] = useState(false);

  useEffect(() => {
    let hidden = false;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let showHeader = false;
    let lastScrollTop = 0;

    if (isHomePage && window.pageYOffset <= homePageTopOffset) {
      setIsShowHeader(false);
    }
    setTimeout(() => {
      if (!isHomePage && window.pageYOffset <= topOffset) {
        setIsShowHeader(true);
        setCollapse(false);
      }
    }, 1);

    const listener = () => {
      const currentPosition = window.pageYOffset;

      if (isHomePage && currentPosition > homePageTopOffset) {
        showHeader = true;
        setIsShowHeader(true);
      } else if (isHomePage && currentPosition <= homePageTopOffset) {
        showHeader = false;
        setIsShowHeader(false);
      }

      if (currentPosition > (isHomePage ? homePageTopOffset : topOffset)) {
        if (!hidden && currentPosition > lastScrollTop) {
          hidden = !preventCollapseRef.current; // true is !preventCollapse
          setCollapse(!preventCollapseRef.current); // true is !preventCollapse
          dispatch(showHint(false));
        } else if (lastScrollTop - currentPosition > 5) {
          hidden = false;
          setCollapse(false);
        }
      } else if (hidden) {
        hidden = false;
        setCollapse(false);
      }
      lastScrollTop = currentPosition <= 0 ? 0 : currentPosition;
    };

    if (isMdUp || isHomePage) {
      window.removeEventListener("scroll", listener);
      window.addEventListener("scroll", listener);
    }
    return () => {
      if (isHomePage && collapse) setCollapse(false);
      window.removeEventListener("scroll", listener);
    };
  }, [isMdUp, location]);

  useEffect(() => {
    if (isShowHint) {
      if (collapse) {
        dispatch(showHint(false));
      }
    }
  }, [isShowHint]);

  const logoLink = (
    <div className={classes.logoCont}>
      <Link
        to="/"
        onClick={() => {
          window.scrollTo({ top: 0 });
          if (window.location.pathname === "/") navigate(0);
        }}
      >
        <img alt="Logo" className={classes.logoImg} src={logo_img} />
      </Link>
    </div>
  );

  // const cartBlock = (
  //   <Link to="/cart" className={classes.cartBlock}>
  //     <div className={classes.cartImageCont}>
  //       {!constants.isNewSearchPage && <Icon size={35} icon={shopping_cart} />}
  //       {constants.isNewSearchPage && <img className={classes.listIcon} src={list_icon} alt="rfq list" />}
  //
  //       {cart.count > 0 && (
  //         <div className={clsx(classes.cartCount, appTheme.topBarCartCount, "cart-count")}>{cart.count}</div>
  //       )}
  //     </div>
  //   </Link>
  // );

  const setPreventHeaderCollapse = (isPrevent) => {
    preventCollapseRef.current = isPrevent;
  };

  return (
    <div>
      <AppBar
        {...rest}
        className={clsx({
          [classes.root]: true,
          [classes.homePageTopBar]: isMdUp && isHomePage && !isShowHeader,
          [className]: true,
          collapse,
        })}
        position="static"
      >
        <Hidden only={["xs", "sm"]}>
          <Collapse in={!collapse}>
            <section style={{ padding: "8px 0" }} className={homePageClasses.header}>
              <Container maxWidth="xl" className={homePageClasses.headerContainer}>
                <div style={{ width: isChipAssist ? (is1180Down ? 145 : 250) : is1180Down ? 30 : 200 }}>
                  {isChipAssist && (
                    <NavLink to="/sell-excess-inventory" className={homePageClasses.headerButtonLink}>
                      {t("sell_on")} <span className={homePageClasses.redColor}>ChipAssist</span>
                    </NavLink>
                  )}
                </div>
                <div>
                  <TopMenu />
                </div>
                <div
                  style={{ width: isChipAssist ? (is1180Down ? 145 : 250) : is1180Down ? 80 : 200, textAlign: "end" }}
                >
                  <a
                    href={`mailto:${isChipAssist ? "info@chipassist.com" : "info@icsearch.ru"}`}
                    className={clsx({
                      [homePageClasses.headerLink]: isChipAssist,
                      [classes.icSearchLink]: !isChipAssist,
                    })}
                  >
                    {isChipAssist ? "info@chipassist.com" : "info@icsearch.ru"}
                  </a>
                  {!is1180Down && isChipAssist && (
                    <a
                      href={`tel:${isChipAssist ? "+41797137881" : "+78126280016"}`}
                      style={{ marginLeft: 18 }}
                      className={clsx({
                        [homePageClasses.headerLink]: isChipAssist,
                        [classes.icSearchLink]: !isChipAssist,
                      })}
                    >
                      {isChipAssist ? "+41 79 713 7881" : "+7 812 628 0016"}
                    </a>
                  )}
                </div>
              </Container>
            </section>
          </Collapse>
          <Toolbar
            className={clsx({
              [classes.toolbar]: true,
              [appTheme.toolbar]: true,
              collapse,
            })}
          >
            <div
              className={clsx({
                [classes.leftMain]: true,
                collapse,
              })}
            >
              {logoLink}
            </div>

            <div className={classes.leftCenter}>
              <div className={classes.searchRow}>
                <div style={{ flexGrow: 1 }}>
                  <SearchSuggestion
                    searchInputClass={homePageClasses.searchInput}
                    searchButtonClass={clsx(homePageClasses.searchIconButton, appTheme.topBarSearchButton)}
                    searchIconClass={homePageClasses.searchIcon}
                    searchClearClass={homePageClasses.clearSearchIcon}
                    isHomePageSuggestions={true}
                  />
                  <Collapse in={!collapse}>
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                      <TrySearchPn
                        partNumbers={partNumberExamples || partNumbers}
                        textClassName={classes.tryP}
                        pnClassName={classes.trySpan}
                      />
                      <ManufacturerSearchSelect setSelectIsOpen={setPreventHeaderCollapse} />
                    </Box>
                  </Collapse>
                </div>
                <Box display="flex" style={{ transition: "250ms all ease", marginTop: collapse ? 0 : -6 }}>
                  {/* {locales.length > 1 && <LangMenu />} */}
                  <ProfileMenu>{isAuthenticated ? <Authorized /> : <NotAuthorized />}</ProfileMenu>
                  {/* {isCartShow && cartBlock} */}
                  <CartBlock />
                </Box>
              </div>
            </div>
          </Toolbar>
        </Hidden>
        <Hidden only={["md", "lg", "xl"]}>
          <div className={clsx(classes.toolbar, appTheme.toolbar)}>
            <div className={classes.mobileTopBar}>
              <div className={classes.mobileTopBarItem} style={{ display: "flex", alignSelf: "center" }}>
                <MobileMenu logo={logo_img} />
              </div>
              <div style={{ display: "flex", alignSelf: "center" }}>{logoLink}</div>
              <div
                className={classes.mobileTopBarItem}
                style={{ display: "flex", alignSelf: "center", justifyContent: "flex-end" }}
              >
                <ProfileMenu>{!isAuthenticated && <NotAuthorized />}</ProfileMenu>
                <CartBlock />
              </div>
            </div>
            <Collapse in={isHomePage ? collapse : true}>
              <div className={classes.searchContainer}>
                <SearchSuggestion
                  searchInputClass={homePageClasses.searchInput}
                  searchButtonClass={clsx(homePageClasses.searchIconButton, appTheme.topBarSearchButton)}
                  searchIconClass={homePageClasses.searchIcon}
                  searchClearClass={homePageClasses.clearSearchIcon}
                  isHomePageSuggestions={true}
                />
                {/* {!isChipAssist && ( */}
                {/*  <TrySearchPn */}
                {/*    partNumbers={partNumberExamples || partNumbers} */}
                {/*    textClassName={classes.tryP} */}
                {/*    pnClassName={classes.trySpan} */}
                {/*  /> */}
                {/* )} */}
              </div>
            </Collapse>
          </div>
        </Hidden>
        <div id="search-filters-bar-portal" style={{ position: "absolute", top: "100%", color: "#263238" }}></div>
      </AppBar>
    </div>
  );
};

export default TopBar;
