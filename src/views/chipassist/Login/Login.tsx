import React, { useEffect } from "react";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent, CardMedia, Typography, Divider, Link, Box } from "@material-ui/core";
import LockIcon from "@material-ui/icons/Lock";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import { Page } from "@src/components";
import checkIsAuthenticated, { isAuthPage } from "@src/utils/auth";
import useAppTheme from "@src/theme/useAppTheme";
import { title } from "@src/constants/defaults";
import constants from "@src/constants/constants";
import { ID_ICSEARCH, ID_ELFARO, ID_SUPPLIER_RESPONSE } from "@src/constants/server_constants";
import logo from "@src/images/logos/en/logo_darkback.png";
import chiponline from "@src/images/logos/elfaro/logo_darkback.png";
import { showRegisterModalAction } from "@src/store/alerts/alertsActions";
import useAppDispatch from "@src/hooks/useAppDispatch";
import { useStyles } from "./styles";
import LoginForm from "./components/LoginForm/LoginForm";

const Login: React.FC<{ isExample?: boolean }> = ({ isExample }) => {
  const classes = useStyles();
  const appTheme = useAppTheme();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { t } = useI18n("login");

  useEffect(() => {
    if (!isExample) {
      if (checkIsAuthenticated()) {
        const previousLocation = localStorage.getItem("previousLocation");
        if (previousLocation && !isAuthPage(previousLocation)) {
          navigate(previousLocation);
        } else {
          navigate("/");
        }
      }
    }
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const onSignUpHandler = (e: any) => {
    if (!isExample) {
      if (constants.id === ID_SUPPLIER_RESPONSE) {
        e.preventDefault();
        dispatch(showRegisterModalAction());
      }
    }
  };

  return (
    <Page className={classes.root} title={t("title")} description={t("description")}>
      <Card className={classes.card}>
        <CardContent className={classes.content}>
          <LockIcon className={classes.icon} />
          <Typography gutterBottom variant="h3">
            {t("sign_in")}
          </Typography>
          <Typography variant="subtitle2">{t("sign_in_description")}</Typography>
          {isExample ? (
            <LoginForm className={classes.loginForm} isExample={true} />
          ) : (
            <LoginForm className={classes.loginForm} />
          )}
          <Divider className={classes.divider} />
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Link
              onClick={onSignUpHandler}
              align="center"
              component={RouterLink}
              to={"/auth/registration"}
              state={{ background: location.state?.background || location }}
              underline="always"
              variant="subtitle2"
              className={appTheme.hyperlink}
            >
              {t("dont_have_account")}
            </Link>
            <Link
              align="center"
              component={RouterLink}
              to={"/auth/reset"}
              state={{ background: location.state?.background || location }}
              underline="always"
              variant="subtitle2"
              className={appTheme.hyperlink}
            >
              {t("forgot_password")}
            </Link>
          </Box>
        </CardContent>
        <CardMedia
          className={classes.media}
          // eslint-disable-next-line global-require
          image={constants.id === ID_ICSEARCH ? require("@src/components/Authentication/auth.png") : ""}
        >
          {constants.id === ID_ELFARO ? (
            <>
              <a target="_blank" rel="noreferrer" href="https://chiponline.tech/">
                <img style={{ marginBottom: 0 }} className={classes.logo} src={chiponline} alt="ChipOnline logo" />
              </a>
            </>
          ) : (
            <>
              {constants.id !== ID_ICSEARCH && <img className={classes.logo} src={logo} alt="Chipassist logo" />}
              <Typography color="inherit" variant="subtitle1">
                {t("cover_text", { title })}
              </Typography>
            </>
          )}
        </CardMedia>
      </Card>
    </Page>
  );
};

export default Login;
