import React from "react";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuList from "@material-ui/core/MenuList";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { useI18n } from "@src/services/I18nProvider/I18nProvider.tsx";
import useAppTheme from "@src/theme/useAppTheme";
import { useLocation, useNavigate } from "react-router-dom";
import { ID_SUPPLIER_RESPONSE } from "@src/constants/server_constants";
import constants from "@src/constants/constants";
import { showRegisterModalAction } from "@src/store/alerts/alertsActions";
import useAppDispatch from "@src/hooks/useAppDispatch";
import { useStyles } from "./styles";

const NotAuthorized = () => {
  const appTheme = useAppTheme();
  const classes = useStyles();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const isSupplierResponse = constants.id === ID_SUPPLIER_RESPONSE;

  const navigate = useNavigate();
  const { t } = useI18n("menu");

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleSignIn = () => {
    setOpen(false);
    navigate("/auth/login", { state: { background: location } });
  };

  const handleSignUp = () => {
    if (constants.id === ID_SUPPLIER_RESPONSE) {
      dispatch(showRegisterModalAction());
    } else {
      setOpen(false);
      navigate("/auth/registration", { state: { background: location } });
    }
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
    <div className={classes.showBy}>
      <div style={{ position: "relative" }}>
        <Button
          className={classes.notAuthButton}
          ref={anchorRef}
          aria-controls={open ? "profile-list-not-authorized" : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          <div style={{ display: "flex" }}>
            <div>
              <span className={isSupplierResponse ? classes.supplierAccSpan1 : classes.accountSpan1}>{t("hello")}</span>
              <br />
              <span className={isSupplierResponse ? classes.supplierAccSpan2 : classes.accountSpan2}>
                {t("account")}
              </span>
            </div>
            <div>
              <ArrowDropDownIcon className={classes.dropIcon} />
            </div>
          </div>
        </Button>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement={"bottom-start"}
          transition
          disablePortal
          style={{ zIndex: 300, minWidth: "50%" }}
        >
          {({ TransitionProps }) => (
            <Grow {...TransitionProps}>
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open} id="profile-list-not-authorized" onKeyDown={handleListKeyDown}>
                    <MenuItem className={appTheme.selectMenuItem} value={1} onClick={handleSignIn}>
                      {t("sign_in")}
                    </MenuItem>
                    <MenuItem className={appTheme.selectMenuItem} value={2} onClick={handleSignUp}>
                      {t("sign_up")}
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

export default NotAuthorized;
