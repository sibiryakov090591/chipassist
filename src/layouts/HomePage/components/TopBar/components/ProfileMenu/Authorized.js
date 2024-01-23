import React from "react";
import { NavLink } from "react-router-dom";
import {
  Box,
  MenuList,
  Popper,
  Paper,
  Grow,
  ClickAwayListener,
  MenuItem,
  Button,
  Hidden,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";
import clsx from "clsx";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { useI18n } from "@src/services/I18nProvider/I18nProvider.tsx";
import useAppTheme from "@src/theme/useAppTheme";
import useAppSelector from "@src/hooks/useAppSelector";
import { logout } from "@src/store/authentication/authActions";
import useAppDispatch from "@src/hooks/useAppDispatch";
import { ID_CHIPASSIST, ID_MASTER, ID_SUPPLIER_RESPONSE } from "@src/constants/server_constants";
import constants from "@src/constants/constants";
import { useStyles } from "./styles";

const Authorized = () => {
  const appTheme = useAppTheme();
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));
  const isSupplierResponse = constants.id === ID_SUPPLIER_RESPONSE;
  const isChipAssist = [ID_CHIPASSIST, ID_MASTER].includes(constants.id);
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

  const ProfileMenuItem = ({ to, label }) => {
    return (
      <li>
        <NavLink end to={to} className={({ isActive }) => isActive && classes.activeMenuItem}>
          <MenuItem component="div">{label}</MenuItem>
        </NavLink>
      </li>
    );
  };

  const profileItems = React.useMemo(() => {
    if (isSupplierResponse) return [];

    return [
      { to: `/profile/general`, title: t("general") },
      { to: `/profile/company/addresses`, title: t("profile.company.address") },
      { to: `/profile/requests`, title: t("rfqs") },
      { to: `/profile/orders?page=${ordersPage || 1}`, title: t("orders") },
      isSmUp && { to: `/profile/bom-list`, title: t("bom") },
    ].filter((i) => !!i);
  }, []);

  const listItems = React.useMemo(() => {
    if (isSupplierResponse) {
      return [
        { to: `/supplier-response`, title: "Requests" },
        { to: `/help`, title: "Help" },
      ];
    }
    return [
      { to: `/`, title: t("home") },
      { to: `/parts`, title: t("parts") },
      { to: `/bom/bom-list`, title: t("bom") },
      { to: `/pcb`, title: t("pcb") },
      { to: `/rfq-list-quotes`, title: t("rfq_list") },
      isChipAssist && { to: `/messages`, title: t("chat") },
      isChipAssist && { to: `/blog`, title: t("blog") },
    ].filter((i) => !!i);
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
          className={clsx(
            isSupplierResponse ? classes.supplierAuthButton : classes.authButton,
            appTheme.topBarProfileButton,
          )}
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
                    {isSupplierResponse && (
                      <>
                        {selectedPartner && (
                          <div style={{ borderBottom: "1px solid #eee", padding: "0 16px 6px", fontWeight: "bold" }}>
                            {selectedPartner.name}
                          </div>
                        )}
                        {listItems.map((link, index) => (
                          <ProfileMenuItem key={index} to={link.to} label={link.title} />
                        ))}
                      </>
                    )}
                    {!isSupplierResponse && (
                      <>
                        {listItems.map((link, index) => (
                          <ProfileMenuItem key={index} to={link.to} label={link.title} />
                        ))}
                        <div
                          style={{
                            marginTop: 8,
                            borderTop: "1px solid #eee",
                            fontStyle: "italic",
                            padding: "6px 16px",
                            fontWeight: "bold",
                          }}
                        >
                          {t("profile_divider")}
                        </div>
                        {profileItems.map((link, index) => (
                          <ProfileMenuItem key={index} to={link.to} label={link.title} />
                        ))}
                      </>
                    )}
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
