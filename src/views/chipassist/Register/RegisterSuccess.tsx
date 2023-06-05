import React, { useEffect } from "react";
import { Card, CardContent, CardMedia, Typography } from "@material-ui/core";
import PersonAddIcon from "@material-ui/icons/PersonAddOutlined";
import authImage from "@src/components/Authentication/auth.png";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import { Page } from "@src/components";
import checkIsAuthenticated, { isAuthPage } from "@src/utils/auth";
import { title } from "@src/constants/defaults";
import { useNavigate } from "react-router-dom";
import { useStyles } from "./styles";

const RegisterSuccess = () => {
  const classes = useStyles();
  const navigate = useNavigate();
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
    <Page className={classes.root} title="Register Success" description="Register Success">
      <Card className={classes.card} style={{ minHeight: 350 }}>
        <CardContent className={classes.content}>
          <PersonAddIcon className={classes.icon} />
          <Typography gutterBottom variant="h3">
            {t("verify")}
          </Typography>
          <Typography variant="subtitle2">{t("verify_description")}</Typography>
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

export default RegisterSuccess;
