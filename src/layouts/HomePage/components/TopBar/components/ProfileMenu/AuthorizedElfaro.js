import React from "react";
import { Link } from "react-router-dom";
import { Box, MenuList, Popper, Paper, Grow, ClickAwayListener, MenuItem, Button, Hidden } from "@material-ui/core";
import clsx from "clsx";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { useI18n } from "@src/services/I18nProvider/I18nProvider.tsx";
import useAppSelector from "@src/hooks/useAppSelector";
import useAppTheme from "@src/theme/useAppTheme";
import { logout } from "@src/store/authentication/authActions";
import useAppDispatch from "@src/hooks/useAppDispatch";
import { useStyles } from "./styles";

const ProfileMenuItem = ({ to, title }) => {
  return (
    <li>
      <Link to={to}>
        <MenuItem component="div">{title}</MenuItem>
      </Link>
    </li>
  );
};

const AuthorizedElfaro = () => {
  const classes = useStyles();
  const appTheme = useAppTheme();
  const dispatch = useAppDispatch();

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const { t } = useI18n("menu");

  const email = useAppSelector((state) => state.auth.email);
  const avatar = useAppSelector((state) => state.profile.profileInfo?.avatar);

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

  const logoutHandler = () => dispatch(logout());

  return (
    <Box display="flex">
      <Box display="flex" style={{ position: "relative" }}>
        <Button
          className={clsx(classes.authButton, appTheme.topBarProfileButton)}
          id="profilebutton"
          ref={anchorRef}
          aria-controls={open ? "profile-list-authorized" : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          <Hidden mdDown>{email && <span className="profile-email">{email}</span>}</Hidden>
          {avatar ? (
            <div className={classes.avatarWrapper}>
              <img className={classes.avatarImg} src={avatar} alt="avatar" />
            </div>
          ) : (
            <AccountCircleIcon className={classes.accountIcon} />
          )}
          <ArrowDropDownIcon />
        </Button>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          placement={"bottom-start"}
          role={undefined}
          transition
          disablePortal
          style={{ zIndex: 300, minWidth: "50%" }}
        >
          {({ TransitionProps }) => (
            <Grow {...TransitionProps}>
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    className={classes.menuList}
                    autoFocusItem={open}
                    id="profile-list-authorized"
                    onKeyDown={handleListKeyDown}
                    onClick={handleClose}
                  >
                    <MenuItem>
                      <a href={"https://www.elfaro.ee"}>Home</a>
                    </MenuItem>
                    <ProfileMenuItem to={`/`} title="Products" />
                    <MenuItem component="div" onClick={logoutHandler}>
                      {t("logout")}
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </Box>
    </Box>
  );
};

export default AuthorizedElfaro;
