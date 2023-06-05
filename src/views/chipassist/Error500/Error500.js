import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import { Typography, Button, useTheme, useMediaQuery } from "@material-ui/core";
import { useI18n } from "@src/services/I18nProvider/I18nProvider.tsx";

import { Page } from "@src/components";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    paddingTop: "10vh",
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
  },
  imageContainer: {
    marginTop: theme.spacing(6),
    display: "flex",
    justifyContent: "center",
  },
  image: {
    maxWidth: "100%",
    width: 560,
    maxHeight: 300,
    height: "auto",
  },
  buttonContainer: {
    marginTop: theme.spacing(6),
    display: "flex",
    justifyContent: "center",
  },
}));

const Error500 = () => {
  const classes = useStyles();
  const theme = useTheme();
  const { t } = useI18n("error");
  const isSmDown = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Page className={classes.root} title="Error 500" description="Error 500">
      <Typography align="center" variant={isSmDown ? "h4" : "h1"}>
        {t("500_title")}
      </Typography>
      <Typography align="center" variant="subtitle2">
        {t("500_description")}
      </Typography>
      <div className={classes.imageContainer}>
        <img alt="Under development" className={classes.image} src="/images/undraw_server_down_s4lk.svg" />
      </div>
      <div className={classes.buttonContainer}>
        <Button color="primary" component={RouterLink} to="/" variant="outlined">
          {t("back")}
        </Button>
      </div>
    </Page>
  );
};

export default Error500;
