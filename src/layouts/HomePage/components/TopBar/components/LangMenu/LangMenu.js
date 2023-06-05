import React from "react";
import useAppDispatch from "@src/hooks/useAppDispatch";
import MenuItem from "@material-ui/core/MenuItem";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuList from "@material-ui/core/MenuList";
import LanguageIcon from "@material-ui/icons/Language";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import flag_ru from "@src/images/lang_ru.svg";
import flag_en from "@src/images/lang_en.svg";
import { locales, showNewStyles } from "@src/constants/defaults";
import { useI18n } from "@src/services/I18nProvider/I18nProvider.tsx";
import { shouldUpdateBackend } from "@src/store/common/commonActions";
import useAppTheme from "@src/theme/useAppTheme";
import { useStyles } from "./styles";

const LangMenu = () => {
  const appTheme = useAppTheme();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const { i18n } = useI18n();
  const dispatch = useAppDispatch();

  const handleChangeLocale = (locale) => {
    if (i18n.language === locale) return;
    i18n.changeLanguage(locale, () => dispatch(shouldUpdateBackend()));
    localStorage.setItem("locale", locale);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div className={classes.langBlock}>
      {showNewStyles ? (
        <div
          style={{ display: "flex", alignItems: "center", height: "100%", cursor: "pointer" }}
          onClick={handleToggle}
        >
          <div ref={anchorRef} aria-haspopup="true">
            <div style={{ display: "flex", alignItems: "center" }}>
              {i18n.language === "en" ? (
                <img className={classes.langFlag} src={flag_en} alt="flag_en" />
              ) : (
                <img className={classes.langFlag} src={flag_ru} alt="flag_en" />
              )}
              <ArrowDropDownIcon />
            </div>
          </div>
        </div>
      ) : (
        <div style={{ cursor: "pointer" }}>
          <div ref={anchorRef} aria-haspopup="true" onClick={handleToggle}>
            <div style={{ display: "flex", alignItems: "center" }}>
              {i18n.language}
              <ArrowDropDownIcon />
            </div>
            <LanguageIcon className={classes.langIcon} />
          </div>
        </div>
      )}
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        placement={"bottom-start"}
        role={undefined}
        transition
        disablePortal
        style={{ zIndex: 300 }}
      >
        {({ TransitionProps }) => (
          <Grow {...TransitionProps}>
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  className={classes.menuList}
                  autoFocusItem={open}
                  id="lang-list"
                  onKeyDown={handleListKeyDown}
                  onClick={handleClose}
                >
                  {locales.map((val) => (
                    <MenuItem className={appTheme.selectMenuItem} key={val} onClick={() => handleChangeLocale(val)}>
                      {val}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
};

export default LangMenu;
