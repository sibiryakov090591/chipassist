import React from "react";
import { makeStyles } from "@material-ui/styles";
import SettingsIcon from "@material-ui/icons/Settings";
import { useI18n } from "@src/services/I18nProvider/I18nProvider.tsx";
import { Page } from "@src/components";
import useAppSelector from "@src/hooks/useAppSelector";

const useStyles = makeStyles((theme) => ({
  "@keyframes rotating": {
    "0%": {
      transform: "rotate(0)",
    },
    "100%": {
      transform: "rotate(359deg)",
    },
  },
  root: {
    padding: theme.spacing(3),
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    background: "#271c3f",
    color: "#fff",
  },
  icons: {
    position: "relative",
  },
  logoImg: {
    height: "50px",
  },
  settingsIcon: {
    position: "absolute",
    right: "-18px",
    top: "-15px",
    animation: `$rotating 5s infinite linear`,
    fontSize: "30px",
    color: theme.palette.app.red400,
  },
  title: {
    margin: "1em 0 0.2em",
    fontWeight: 800,
    fontSize: "32px",
    textTransform: "uppercase",
    color: theme.palette.app.red400,
  },
  message: {
    fontSize: "20px",
  },
}));

const logo_img = require("@src/images/logo/logo_full_transparent_mono_dofiga.png");

const Maintenance = () => {
  const message = useAppSelector((state) => state.maintenance.message);
  const classes = useStyles();
  const { t } = useI18n("common");

  return (
    <Page className={classes.root} title="Maintenance" description="Maintenance page">
      <div className={classes.icons}>
        <img alt="Logo" className={classes.logoImg} src={logo_img} />
        <SettingsIcon className={classes.settingsIcon} />
      </div>
      <h1 className={classes.title}>{t("maintenance")}</h1>
      {message && <p className={classes.message} dangerouslySetInnerHTML={{ __html: message }} />}
    </Page>
  );
};

export default Maintenance;
