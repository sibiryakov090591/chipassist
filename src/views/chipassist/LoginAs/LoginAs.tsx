import React from "react";
import { Card, CardContent, CardMedia, Typography } from "@material-ui/core";
import LockIcon from "@material-ui/icons/Lock";
import { Page } from "@src/components";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import { useStyles } from "../Login/styles";
import LoginFormAs from "./components/LoginFormAs/LoginFormAs";

const LoginAs = () => {
  const classes = useStyles();
  const { t } = useI18n("login_form_as");
  return (
    <Page className={classes.root} title="Login" description="Login page">
      <Card className={classes.card}>
        <CardContent className={classes.content}>
          <LockIcon className={classes.icon} />
          <Typography gutterBottom variant="h3">
            {t("sign_in")}
          </Typography>
          <Typography variant="subtitle2">{t("sign_in_on")}</Typography>
          <LoginFormAs className={classes.loginForm} />
        </CardContent>
        <CardMedia
          className={classes.media}
          // eslint-disable-next-line global-require
          image={require("@src/components/Authentication/auth.png")}
        >
          <Typography color="inherit" variant="subtitle1">
            {t("connecting")}
          </Typography>
        </CardMedia>
      </Card>
    </Page>
  );
};

export default LoginAs;
