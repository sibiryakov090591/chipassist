import React from "react";
// import cart_icon from "@src/images/elfaro/cart_icon.svg";
import SearchSuggestion from "@src/layouts/HomePage/components/TopBar/components/SearchSuggestion/SearchSuggestion";
import clsx from "clsx";
import TrySearchPn from "@src/components/TrySearchPn/TrySearchPn";
import { useStyles } from "./searchBarStyles";

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

const SearchBar: React.FC = () => {
  const classes = useStyles();

  return (
    <section id="content-bar" className={classes.contentBar}>
      <div className={classes.contentBarLeft}></div>
      {/* <div className={classes.contentBarCenter}>
        <div className={classes.searchContainer}>
          <input type="text" className={classes.searchInput} placeholder="component part #" />
          <div className={classes.searchIconButton}>
            <img className={classes.searchIcon} src={search_icon} />
          </div>
        </div>
        <p className={classes.searchDescription}>Enter component part number and click Enter</p>
      </div> */}
      <div className={classes.contentBarCenter}>
        <div className={classes.searchContainer}>
          <SearchSuggestion
            searchInputClass={classes.searchInput}
            searchButtonClass={clsx(classes.searchIconButton)}
            searchIconClass={classes.searchIcon}
            searchClearClass={classes.clearSearchIcon}
          />
        </div>
        <TrySearchPn partNumbers={partNumbers} pnClassName={classes.tryPn} textClassName={classes.tryText} />
      </div>
      <div className={classes.contentBarRight}>
        {/* <div className={classes.cartButton}>
          <img className={classes.cartIcon} src={cart_icon} />
        </div> */}
      </div>
    </section>
  );
};

export default SearchBar;