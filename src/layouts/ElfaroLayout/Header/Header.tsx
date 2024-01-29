import { Container, Hidden } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import constants from "@src/constants/constants";
import ProfileMenu from "@src/layouts/HomePage/components/TopBar/components/ProfileMenu";
import useAppSelector from "@src/hooks/useAppSelector";
import AuthorizedElfaro from "@src/layouts/HomePage/components/TopBar/components/ProfileMenu/AuthorizedElfaro";
import NotAuthorized from "@src/layouts/HomePage/components/TopBar/components/ProfileMenu/NotAuthorized";
import clsx from "clsx";
import { NavLink } from "react-router-dom";
import { useStyles as useSearchBarStyles } from "@src/views/elfaro/Search/SearchBar/searchBarStyles";
import SearchSuggestion from "@src/layouts/HomePage/components/TopBar/components/SearchSuggestion/SearchSuggestion";
import TrySearchPn from "@src/components/TrySearchPn/TrySearchPn";
import CartBlock from "@src/components/CartBlock/CartBlock";
import { partNumbers } from "@src/layouts/HomePage/components/TopBar/TopBar";
import MobileMenu from "../Menu/MobileMenu/MobileMenu";
import { useStyles } from "./headerStyles";

const logo_img = `/${constants.logos.distPath}/${constants.logos.mainLogoDarkBack}`;

const Header = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.token !== null && !state.auth.loading);
  const { partNumberExamples } = useAppSelector((state) => state.search);
  const classes = useStyles() as any;
  const searchBarStyles = useSearchBarStyles() as any;

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
        <img src={logo_img} className={classes.logo} alt="ChipOnline logo"></img>
      </NavLink>
    </div>
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
              <CartBlock />
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
              <CartBlock />
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
      <div id="search-filters-bar-portal" style={{ position: "absolute", top: "100%", color: "#263238" }}></div>
    </header>
  );
};

export default Header;
