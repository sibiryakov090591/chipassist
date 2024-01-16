import React, { useEffect } from "react";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent, CardMedia, Typography, Divider, Link } from "@material-ui/core";
import PersonAddIcon from "@material-ui/icons/PersonAddOutlined";
import authImage from "@src/images/auth.png";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import { Page } from "@src/components";
import checkIsAuthenticated, { isAuthPage } from "@src/utils/auth";
import useAppTheme from "@src/theme/useAppTheme";
import { title } from "@src/constants/defaults";
import useAppSelector from "@src/hooks/useAppSelector";
import RegisterForm from "./components/RegisterForm/RegisterForm";
import { useStyles } from "./styles";

const RegisterClosed = () => {
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
    <Page className={classes.root} title="Register" description="Register">
      <Card className={classes.card}>
        <CardContent className={classes.content}>
          <PersonAddIcon className={classes.icon} />
          <Typography gutterBottom variant="h3">
            {t("sign_up")}
          </Typography>
          <Typography variant="subtitle2">{t("sign_up_description")}</Typography>
          <RegisterForm className={classes.registerForm} />
          <Divider className={classes.divider} />
          <Link
            align="center"
            component={RouterLink}
            to={{ pathname: "/auth/login" }}
            state={{ background: location.state?.background || location }}
            underline="always"
            variant="subtitle2"
            className={appTheme.hyperlink}
          >
            {t("have_account")}
          </Link>
        </CardContent>
        <CardMedia className={classes.media} image={authImage}>
          <Typography color="inherit" variant="subtitle1">
            {t("cover_text", { title })}
          </Typography>
        </CardMedia>
      </Card>
    </Page>
  );
};

export default RegisterClosed;
