import React, { useEffect } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { Card, CardContent, CardMedia, Typography, Divider, Link, Box } from "@material-ui/core";
import LockIcon from "@material-ui/icons/Lock";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import { Page } from "@src/components";
import useAppTheme from "@src/theme/useAppTheme";
import { title } from "@src/constants/defaults";
import constants from "@src/constants/constants";
import { ID_ICSEARCH, ID_ELFARO, ID_SUPPLIER_RESPONSE, ID_PCBONLINE } from "@src/constants/server_constants";
import { showRegisterModalAction } from "@src/store/alerts/alertsActions";
import useAppDispatch from "@src/hooks/useAppDispatch";
import { useStyles } from "./styles";
import LoginForm from "./components/LoginForm/LoginForm";

const logo_img = `/${constants.logos.distPath}/${constants.logos.mainLogoDarkBack}`;

const Login: React.FC<{ isExample?: boolean }> = ({ isExample }) => {
  const classes = useStyles();
  const appTheme = useAppTheme();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { t } = useI18n("login");
  const isICSearch = constants.id === ID_ICSEARCH;
  const isPCBOnline = constants.id === ID_PCBONLINE;

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const onSignUpHandler = (e: any) => {
    if (!isExample) {
      if ([ID_SUPPLIER_RESPONSE, ID_PCBONLINE].includes(constants.id)) {
        e.preventDefault();
        dispatch(showRegisterModalAction());
      }
    }
  };

  return (
    <Page className={classes.root} title={t("title")} description={t("description")}>
      <Card className={isICSearch ? classes.cardICS : classes.card}>
        <CardContent className={classes.content}>
          <LockIcon className={classes.icon} />
          <Typography gutterBottom variant="h3">
            {t("sign_in")}
          </Typography>
          {!isICSearch && <Typography variant="subtitle2">{t("sign_in_description")}</Typography>}
          {isExample ? (
            <LoginForm className={isICSearch ? classes.loginFormICS : classes.loginForm} isExample={true} />
          ) : (
            <LoginForm className={isICSearch ? classes.loginFormICS : classes.loginForm} />
          )}
          {!isPCBOnline && (
            <>
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
            </>
          )}
        </CardContent>
        <CardMedia
          className={classes.media}
          // eslint-disable-next-line global-require
          image={constants.id === ID_ICSEARCH ? require("@src/images/auth.png") : ""}
        >
          {constants.id === ID_ELFARO ? (
            <>
              <a target="_blank" rel="noreferrer" href="https://chiponline.tech/">
                <img style={{ height: 28 }} className={classes.logo} src={logo_img} alt="ChipOnline logo" />
              </a>
              <Typography color="inherit" variant="subtitle1">
                {t("cover_text", { title })}
              </Typography>
            </>
          ) : (
            <>
              {constants.id !== ID_ICSEARCH && <img className={classes.logo} src={logo_img} alt="Chipassist logo" />}
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
