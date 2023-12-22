import React from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { Card, CardContent, CardMedia, Typography, Divider, Link } from "@material-ui/core";
import PersonAddIcon from "@material-ui/icons/PersonAddOutlined";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import useAppTheme from "@src/theme/useAppTheme";
import { title } from "@src/constants/defaults";
import constants from "@src/constants/constants";
import { ID_ELFARO, ID_ICSEARCH } from "@src/constants/server_constants";
import RegisterForm from "./RegisterForm/RegisterForm";
import { useStyles } from "../../Login/styles";

const logo_img = `/${constants.logos.distPath}/${constants.logos.mainLogoDarkBack}`;

const RegisterFormContainer: React.FC<{ isExample?: boolean }> = ({ isExample }) => {
  const classes = useStyles();
  const appTheme = useAppTheme();
  const location = useLocation();
  const { t } = useI18n("register");

  // useEffect(() => {
  //   if (checkIsAuthenticated()) {
  //     const previousLocation = localStorage.getItem("previousLocation");
  //     if (previousLocation && !isAuthPage(previousLocation)) {
  //       navigate(previousLocation);
  //     } else {
  //       navigate("/");
  //     }
  //   }
  // }, []);

  return (
    <Card className={classes.card}>
      <CardContent className={classes.content}>
        <PersonAddIcon className={classes.icon} />
        <Typography gutterBottom variant="h3">
          {t("sign_up")}
        </Typography>
        <Typography variant="subtitle2">{t("sign_up_description")}</Typography>
        <RegisterForm className={classes.loginForm} isExample={isExample} />
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
        image={constants.id === ID_ICSEARCH ? require("@src/images/auth.png") : ""}
      >
        {constants.id === ID_ELFARO ? (
          <>
            <a target="_blank" rel="noreferrer" href="https://chiponline.tech/">
              <img style={{ height: 28 }} className={classes.logo} src={logo_img} alt="ChipOnline" />
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
  );
};

export default RegisterFormContainer;
