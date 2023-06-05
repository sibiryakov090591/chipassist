import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import { Typography, Button, useTheme, useMediaQuery } from "@material-ui/core";
import { useI18n } from "@src/services/I18nProvider/I18nProvider.tsx";
import { Page } from "@src/components";
import image from "@src/images/elfaro/pcb.svg";
// import image from "@src/images/Homepage/chip_computer_cpu.svg";
import useAppTheme from "@src/theme/useAppTheme";

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
    maxWidth: 150,
    width: "100%",
    filter: "invert(15%)",
  },
  buttonContainer: {
    marginTop: theme.spacing(6),
    display: "flex",
    justifyContent: "center",
  },
}));

const ErrorRegister = () => {
  const classes = useStyles();
  const appTheme = useAppTheme();
  const theme = useTheme();
  const { t } = useI18n("error");
  const isSmDown = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Page className={classes.root} title="Error Register" description="Error Register">
      <Typography align="center" variant={isSmDown ? "h4" : "h2"}>
        {t("register_title")}
      </Typography>
      <Typography align="center" variant="subtitle2">
        {t("register_description")}
      </Typography>
      <div className={classes.imageContainer}>
        <img className={classes.image} src={image} alt="board icon" />
      </div>
      <div className={classes.buttonContainer}>
        <Button variant="contained" className={appTheme.buttonCreate} color="primary" component={RouterLink} to="/">
          {t("back")}
        </Button>
      </div>
    </Page>
  );
};

export default ErrorRegister;
