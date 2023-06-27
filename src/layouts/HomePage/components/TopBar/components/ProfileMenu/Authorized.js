import React from "react";
import { Link } from "react-router-dom";
import { Box, MenuList, Popper, Paper, Grow, ClickAwayListener, MenuItem, Button, Hidden } from "@material-ui/core";
import clsx from "clsx";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { useI18n } from "@src/services/I18nProvider/I18nProvider.tsx";
import useAppTheme from "@src/theme/useAppTheme";
import useAppSelector from "@src/hooks/useAppSelector";
import { logout } from "@src/store/authentication/authActions";
import useAppDispatch from "@src/hooks/useAppDispatch";
import { ID_SUPPLIER_RESPONSE } from "@src/constants/server_constants";
import constants from "@src/constants/constants";
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

const Authorized = () => {
  const appTheme = useAppTheme();
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState(localStorage.getItem("email"));
  const anchorRef = React.useRef(null);
  const { t } = useI18n("menu");

  const ordersPage = useAppSelector((state) => state.orders.orders.page);
  const selectedPartner = useAppSelector((state) => state.profile.selectedPartner);
  const email = useAppSelector((state) => state.profile.profileInfo?.email);
  const avatar = useAppSelector((state) => state.profile.profileInfo?.avatar);

  React.useEffect(() => {
    let value = localStorage.getItem("email") || email;
    if (value) {
      if (value.length > 23) value = `${value.slice(0, 23)}...`;
      setTitle(value);
    }
  }, [email]);

  const listItems = React.useMemo(() => {
    if (constants.id === ID_SUPPLIER_RESPONSE) {
      return [
        { to: `/supplier-response`, title: "Requests" },
        { to: `/help`, title: "Help" },
      ];
    }
    return [
      { to: `/profile/general`, title: t("general") },
      { to: `/profile/company/addresses`, title: t("profile.company.address") },
      { to: `/profile/orders?page=${ordersPage || 1}`, title: t("orders") },
      // {to: `/profile/notifications`, title: t("notifications")},
      { to: `/profile/requests`, title: t("rfqs") },
      { to: `/pcb`, title: t("pcb") },
      { to: `/bom/bom-list`, title: t("bom") },
      // {to: `/auth/feedback`, title: t("feedback")},
    ];
  }, []);

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
    <Box className={classes.showBy} display="flex">
      <Box display="flex" style={{ position: "relative" }}>
        <Button
          className={clsx(classes.authButton, appTheme.topBarProfileButton)}
          id="profilebutton"
          ref={anchorRef}
          aria-controls={open ? "profile-list-authorized" : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          {title && (
            <Hidden mdDown>
              <span className="profile-email">{title}</span>
            </Hidden>
          )}
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
                    {constants.id === ID_SUPPLIER_RESPONSE && selectedPartner && (
                      <div style={{ borderBottom: "1px solid #eee", padding: "0 16px 6px", fontWeight: "bold" }}>
                        {selectedPartner.name}
                      </div>
                    )}
                    {listItems.map((link, index) => (
                      <ProfileMenuItem key={index} to={link.to} title={link.title} />
                    ))}
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

export default Authorized;
