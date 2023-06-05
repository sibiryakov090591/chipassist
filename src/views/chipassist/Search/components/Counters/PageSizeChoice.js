import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuList from "@material-ui/core/MenuList";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import { setUrlWithFilters } from "@src/utils/setUrl";
import useAppTheme from "@src/theme/useAppTheme";
import { orderByValues } from "@src/components/FiltersBar/FilterOrderByBar";
import useURLSearchParams from "@src/components/ProductCard/useURLSearchParams";
import useAppSelector from "@src/hooks/useAppSelector";
import { useStyles } from "../../searchResultsStyles";

const PageSizeChoice = () => {
  const appTheme = useAppTheme();
  const classes = useStyles();
  const navigate = useNavigate();
  const { t } = useI18n("search");

  // eslint-disable-next-line no-underscore-dangle
  const _pageSize = useAppSelector((state) => state.search.pageSize);
  const query = useAppSelector((state) => state.search.query);
  const filtersValues = useAppSelector((state) => state.search.filtersValues);
  const baseFilters = useAppSelector((state) => state.search.baseFilters);

  const pageSize = useURLSearchParams("page_size", false, localStorage.getItem("searchShowBy") || _pageSize, false);
  const orderBy = useURLSearchParams(
    "order_by",
    false,
    localStorage.getItem("mainOrderBy") || orderByValues[0].value,
    false,
  );

  const [open, setOpen] = useState(false);

  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    console.log("SEARCH PAGE_SIZE_CLICK", event);
    if (event.target.value > 0) {
      localStorage.setItem("searchShowBy", event.target.value);
      setUrlWithFilters("/search", navigate, query, 1, event.target.value, orderBy, filtersValues, baseFilters);
    }

    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div className={classes.showBy}>
      <div>
        <Button
          className={classes.showButton}
          ref={anchorRef}
          aria-controls={open ? "menu-list-grow" : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          {pageSize === -1 ? t("common.show_all") : `${t("common.show_by")} ${parseInt(pageSize) || 15}`}
          <KeyboardArrowDownIcon className={classes.viewsFIcon} />
        </Button>
        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin: placement === "bottom" ? "center top" : "center bottom",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                    <MenuItem
                      className={appTheme.selectMenuItem}
                      selected={pageSize === 15}
                      value={15}
                      onClick={handleClose}
                    >
                      {t("common.show_by")} 15
                    </MenuItem>
                    <MenuItem
                      className={appTheme.selectMenuItem}
                      selected={pageSize === 25}
                      value={25}
                      onClick={handleClose}
                    >
                      {t("common.show_by")} 25
                    </MenuItem>
                    <MenuItem
                      className={appTheme.selectMenuItem}
                      selected={pageSize === 100}
                      value={100}
                      onClick={handleClose}
                    >
                      {t("common.show_by")} 100
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </div>
  );
};

export default PageSizeChoice;
