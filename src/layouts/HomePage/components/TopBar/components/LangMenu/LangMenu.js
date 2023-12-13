import React from "react";
import useAppDispatch from "@src/hooks/useAppDispatch";
import MenuItem from "@material-ui/core/MenuItem";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuList from "@material-ui/core/MenuList";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import flag_ru from "@src/images/lang_ru.svg";
import flag_en from "@src/images/lang_en.svg";
import flag_de from "@src/images/lang_de.svg";
import flag_es from "@src/images/lang_es.svg";
import flag_zh from "@src/images/lang_zh.svg";
import flag_fr from "@src/images/lang_fr.svg";
import { locales } from "@src/constants/defaults";
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

  const CurrentImage = () => {
    switch (i18n.language) {
      case "en":
        return <img className={classes.langFlag} src={flag_en} alt="flag_en" />;
      case "ru":
        return <img className={classes.langFlag} src={flag_ru} alt="flag_ru" />;
      case "es":
        return <img className={classes.langFlag} src={flag_es} alt="flag_es" />;
      case "fr":
        return <img className={classes.langFlag} src={flag_fr} alt="flag_fr" />;
      case "de":
        return <img className={classes.langFlag} src={flag_de} alt="flag_de" />;
      case "ch":
        return <img className={classes.langFlag} src={flag_zh} alt="flag_zh" />;
      default:
        return <img className={classes.langFlag} src={flag_en} alt="flag_en" />;
    }
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
      {
        <div
          style={{ display: "flex", alignItems: "center", height: "100%", cursor: "pointer" }}
          onClick={handleToggle}
        >
          <div ref={anchorRef} aria-haspopup="true">
            <div style={{ display: "flex", alignItems: "center" }}>
              <CurrentImage />
              <span style={{ fontSize: "1rem", fontWeight: 500, paddingLeft: "0.5em" }}>{i18n.language}</span>
              <ArrowDropDownIcon />
            </div>
          </div>
        </div>
      }
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
                  defaultValue={i18n.language}
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
