import React, { useEffect } from "react";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent, CardMedia, Typography, Divider, Link } from "@material-ui/core";
import PersonAddIcon from "@material-ui/icons/PersonAddOutlined";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import { Page } from "@src/components";
import checkIsAuthenticated, { isAuthPage } from "@src/utils/auth";
import useAppTheme from "@src/theme/useAppTheme";
import { title } from "@src/constants/defaults";
import constants from "@src/constants/constants";
import { ID_ELFARO, ID_ICSEARCH } from "@src/constants/server_constants";
import ca_logo_for_elfaro from "@src/images/elfaro/login_ca_logo.svg";
import logo from "@src/images/logos/en/logo_darkback.png";
import RegisterForm from "./components/RegisterForm/RegisterForm";
import { useStyles } from "../Login/styles";

const Register = () => {
  const classes = useStyles();
  const appTheme = useAppTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useI18n("register");

  useEffect(() => {
    if (checkIsAuthenticated()) {
      const previousLocation = localStorage.getItem("previousLocation");
      if (previousLocation && !isAuthPage(previousLocation)) {
        navigate(previousLocation);
      } else {
        navigate("/");
      }
    }
  }, []);

  return (
    <Page className={classes.root} title={t("title")} description={t("description")}>
      <Card className={classes.card}>
        <CardContent className={classes.content}>
          <PersonAddIcon className={classes.icon} />
          <Typography gutterBottom variant="h3">
            {t("sign_up")}
          </Typography>
          <Typography variant="subtitle2">{t("sign_up_description")}</Typography>
          <RegisterForm className={classes.loginForm} />
          <Divider className={classes.divider} />
          <Link
            align="center"
            component={RouterLink}
            underline="always"
            variant="subtitle2"
            to={"/auth/login"}
            state={{ background: location.state?.background || location }}
            className={appTheme.hyperlink}
          >
            {t("have_account")}
          </Link>
        </CardContent>
        <CardMedia
          className={classes.media}
          // eslint-disable-next-line global-require
          image={constants.id === ID_ICSEARCH ? require("@src/components/Authentication/auth.png") : ""}
        >
          {constants.id === ID_ELFARO ? (
            <>
              <a target="_blank" rel="noreferrer" href="https://chipassist.com/">
                <img className={classes.logo} src={ca_logo_for_elfaro} alt="Chipassist logo" />
              </a>
              <Typography color="inherit" variant="subtitle1">
                Shopping cart is powered by{" "}
                <a target="_blank" rel="noreferrer" className={classes.link} href="https://chipassist.com/">
                  ChipAssist
                </a>
              </Typography>
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

export default Register;
