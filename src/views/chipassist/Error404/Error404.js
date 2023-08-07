import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Typography } from "@material-ui/core";
import { useI18n, staticI18n } from "@src/services/I18nProvider/I18nProvider.tsx";
import { Page } from "@src/components";
import image from "@src/images/404_page/chip2_404r.png";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    paddingTop: "10vh",
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
  },
  title: {
    textAlign: "center",
    fontSize: "3.5rem",
    fontWeight: "bold",
    color: "#345",
    paddingTop: "10px",
    margin: "21px 0",
  },
  imageContainer: {
    marginTop: 20,
    display: "flex",
    justifyContent: "center",
  },
  image: {
    maxWidth: 600,
  },
  menuContainer: {
    marginTop: 20,
    display: "flex",
    justifyContent: "center",
    fontSize: "1.3rem",
  },
  divider: {
    margin: "0 8px",
  },
}));

const { t } = staticI18n("menu");
const topMenuList = [
  { name: "home", url: "/", label: t("home") },
  { name: "parts", url: "/parts", label: t("parts") },
  { name: "bom-create", url: "/bom/create-file", label: t("bom") },
  { name: "rfq", url: "/rfq-list-quotes", label: "RFQ List" },
  { name: "messages", url: "/messages", label: t("chat") },
  { name: "general", url: "/profile/general", label: t("profile") },
  { name: "blog", url: "/blog", label: t("blog") },
];

const Error404 = () => {
  const classes = useStyles();
  const { t } = useI18n("error");

  return (
    <Page className={classes.root} title="Error 404" description="Error 404">
      <div className={classes.imageContainer}>
        <img alt="chip icon" className={classes.image} src={image} />
      </div>
      <Typography className={classes.title} align="center" variant={"h1"}>
        {t("404_title")}
      </Typography>
      <Typography align="center" variant="subtitle2">
        {t("404_description")}
      </Typography>
      <div className={classes.menuContainer}>
        {topMenuList.map((item, index) => {
          return (
            <React.Fragment key={index}>
              <NavLink className={classes.menuItem} to={item.url}>
                {item.label}
              </NavLink>
              {topMenuList.length - 1 > index && <span className={classes.divider}>|</span>}
            </React.Fragment>
          );
        })}
      </div>
    </Page>
  );
};

export default Error404;
