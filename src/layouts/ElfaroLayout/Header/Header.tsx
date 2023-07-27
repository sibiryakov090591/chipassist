import { Container, Hidden } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import constants from "@src/constants/constants";
import ProfileMenu from "@src/layouts/HomePage/components/TopBar/components/ProfileMenu";
import useAppSelector from "@src/hooks/useAppSelector";
import AuthorizedElfaro from "@src/layouts/HomePage/components/TopBar/components/ProfileMenu/AuthorizedElfaro";
import NotAuthorized from "@src/layouts/HomePage/components/TopBar/components/ProfileMenu/NotAuthorized";
import checkIsAuthenticated from "@src/utils/auth";
import { isCartEnabled } from "@src/constants/common";
import { useStyles as topbarUseStyles } from "@src/layouts/HomePage/components/TopBar/topbarStyles";
import clsx from "clsx";
import { NavLink } from "react-router-dom";
import { useStyles as useSearchBarStyles } from "@src/views/elfaro/Search/SearchBar/searchBarStyles";
import SearchSuggestion from "@src/layouts/HomePage/components/TopBar/components/SearchSuggestion/SearchSuggestion";
import TrySearchPn from "@src/components/TrySearchPn/TrySearchPn";
import list_icon from "@src/images/Icons/list.svg";
import MobileMenu from "../Menu/MobileMenu/MobileMenu";
import { useStyles } from "./headerStyles";

const partNumbers = [
  "MAX32",
  "MSP430",
  "AM29LV",
  "RC1206",
  "STM81",
  "SM712",
  "LM7805",
  "LM809",
  "BZX84C1",
  "TXS0104E",
  "HEDS Broadcom",
  "LM358",
];

const logo_img = `/${constants.logos.distPath}/${constants.logos.mainLogoDarkBack}`;

const Header = () => {
  const isCartShow =
    (constants.closedRegistration && checkIsAuthenticated()) || (!constants.closedRegistration && isCartEnabled);
  const isAuthenticated = useAppSelector((state) => state.auth.token !== null && !state.auth.loading);
  const cart = useAppSelector((state) => state.cart);
  const { partNumberExamples } = useAppSelector((state) => state.search);
  const classes = useStyles() as any;
  const searchBarStyles = useSearchBarStyles() as any;
  const topbarClasses = topbarUseStyles() as any;

  const [borderBottom, setBorderBottom] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", listener);
    return () => {
      window.removeEventListener("scroll", listener);
    };
  }, [borderBottom]);

  const listener = () => {
    if (window.pageYOffset > 280) {
      if (!borderBottom) setBorderBottom(true);
    } else if (borderBottom) {
      setBorderBottom(false);
    }
  };

  const logoLink = (
    <div className={classes.logoContainer}>
      <NavLink to={"/"} style={{ color: "#ffffff" }}>
        <img src={logo_img} className={classes.logo} alt="ELFARO Logo"></img>
      </NavLink>
    </div>
  );

  const cartBlock = (
    <NavLink to={"/cart"} className={topbarClasses.cartBlock}>
      <div className={topbarClasses.cartImageCont}>
        <img className={topbarClasses.listIcon} src={list_icon} alt="rfq list" />
        {cart.count > 0 && <div className={clsx(topbarClasses.cartCount, "cart-count")}>{cart.count}</div>}
      </div>
    </NavLink>
  );

  return (
    <header className={classes.header} style={borderBottom ? { borderBottom: "1px solid #ffffff" } : {}}>
      <Container maxWidth="xl">
        <Hidden only={["xs", "sm"]}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignSelf: "center" }}>
              <MobileMenu logo={logo_img} />
            </div>
            {logoLink}
            <div className={classes.searchSuggestionContainer}>
              <SearchSuggestion
                searchInputClass={classes.searchInput}
                searchButtonClass={clsx(searchBarStyles.searchIconButton, classes.searchIconButton)}
                searchIconClass={searchBarStyles.searchIcon}
                searchClearClass={searchBarStyles.clearSearchIcon}
              />
              <div className={classes.trySearchPn}>
                <TrySearchPn
                  partNumbers={partNumberExamples || partNumbers}
                  pnClassName={searchBarStyles.tryPn}
                  textClassName={searchBarStyles.tryText}
                />
              </div>
            </div>

            <div style={{ display: "flex", maxHeight: "50px" }}>
              <ProfileMenu>{isAuthenticated ? <AuthorizedElfaro /> : <NotAuthorized />}</ProfileMenu>
              {isCartShow && cartBlock}
            </div>
          </div>
        </Hidden>

        <Hidden only={["md", "lg", "xl"]}>
          <div className={classes.mobileTopBar}>
            <div style={{ display: "flex", alignSelf: "center" }}>
              <MobileMenu logo={logo_img} />
            </div>
            <div style={{ display: "flex", alignSelf: "center" }}>{logoLink}</div>
            <div style={{ display: "flex", alignSelf: "center" }}>
              <ProfileMenu>{!isAuthenticated && <NotAuthorized />}</ProfileMenu>
              {isCartShow && cartBlock}
            </div>
          </div>
          <div className={classes.searchSuggestionContainer}>
            <SearchSuggestion
              searchInputClass={classes.searchInput}
              searchButtonClass={clsx(searchBarStyles.searchIconButton, classes.searchIconButton)}
              searchIconClass={searchBarStyles.searchIcon}
              searchClearClass={searchBarStyles.clearSearchIcon}
            />
          </div>
        </Hidden>
      </Container>
    </header>
  );
};

export default Header;
