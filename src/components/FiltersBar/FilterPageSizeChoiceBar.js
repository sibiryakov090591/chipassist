/* eslint no-underscore-dangle: 0 */
import React, { useEffect, useState, useRef } from "react";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuList from "@material-ui/core/MenuList";
import { useI18n } from "@src/services/I18nProvider/I18nProvider.tsx";
import useAppTheme from "@src/theme/useAppTheme";
import useAppSelector from "@src/hooks/useAppSelector";
import { useStyles } from "./styles";
import useURLSearchParams from "../ProductCard/useURLSearchParams";

const PageSizeChoice = (props) => {
  const { storageKey, action, disable } = props;

  const _pageSize = useAppSelector((state) => state.search.pageSize);
  const pageSize = +useURLSearchParams("page_size", false, localStorage.getItem(`${storageKey}`) || _pageSize, false);

  const appTheme = useAppTheme();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const { t } = useI18n("common");

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (event.target.value > 0) {
      let page = null;
      if (pageSize !== event.target.value) {
        page = 1;
      }
      localStorage.setItem(storageKey, event.target.value);
      if (action) action(event.target.value, page);
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
    <div>
      <Button
        className={classes.showButton}
        ref={anchorRef}
        aria-controls={open ? "menu-list-grow" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        disabled={disable}
      >
        {pageSize === -1 ? t("show_all") : `${t("show_by")} ${parseInt(pageSize) || 15}`}
        <KeyboardArrowDownIcon className={classes.viewsFIcon} />
      </Button>
      <Popper open={open} anchorEl={anchorRef.current} role={undefined} style={{ zIndex: 100 }} transition>
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
                    {t("show_by")} 15
                  </MenuItem>
                  <MenuItem
                    className={appTheme.selectMenuItem}
                    selected={pageSize === 25}
                    value={25}
                    onClick={handleClose}
                  >
                    {t("show_by")} 25
                  </MenuItem>
                  <MenuItem
                    className={appTheme.selectMenuItem}
                    selected={pageSize === 100}
                    value={100}
                    onClick={handleClose}
                  >
                    {t("show_by")} 100
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
};

export default PageSizeChoice;
