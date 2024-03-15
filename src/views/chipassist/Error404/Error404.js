import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Typography } from "@material-ui/core";
import { useI18n } from "@src/services/I18nProvider/I18nProvider.tsx";
import { Page } from "@src/components";
import image from "@src/images/404_page/chip2_404r.png";
import { NavLink } from "react-router-dom";
import constants from "@src/constants/constants";
import {
  ID_CHIPASSIST,
  ID_ELFARO,
  ID_ICSEARCH,
  ID_MASTER,
  ID_SUPPLIER_RESPONSE,
  TITLE_PCBONLINE,
} from "@src/constants/server_constants";
import { responsesMenuList } from "@src/layouts/SupplierLayout/components/TopMenu/TopMenu";
import { chipAssistMenuList } from "@src/layouts/HomePage/components/TopBar/components/TopMenu/TopMenu";
import HomeIcon from "@material-ui/icons/HomeOutlined";

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

const isChipAssist = [ID_CHIPASSIST, ID_MASTER].includes(constants.id);
const isSupplierResponse = constants.id === ID_SUPPLIER_RESPONSE;
const isPCBOnline = constants.title === TITLE_PCBONLINE;
const isChipOnline = constants.id === ID_ELFARO;
const isICSearch = constants.id === ID_ICSEARCH;

let topMenuList = [];
if (isChipAssist || isICSearch) {
  topMenuList = chipAssistMenuList.filter((i) => !!i);
}
if (isSupplierResponse && !isPCBOnline) {
  topMenuList = responsesMenuList.filter((i) => !!i);
}
if (isPCBOnline) {
  topMenuList = [
    {
      name: "requests",
      url: "/supplier-response",
      label: "Requests",
      getIcon: (className) => <HomeIcon className={className} />,
    },
  ];
}

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
        {!isChipOnline &&
          topMenuList.map((item, index) => {
            return (
              <React.Fragment key={index}>
                <NavLink className={classes.menuItem} to={item.url}>
                  {item.label}
                </NavLink>
                {topMenuList.length - 1 > index && <span className={classes.divider}>|</span>}
              </React.Fragment>
            );
          })}
        {isChipOnline && (
          <>
            <a className={classes.menuItem} href={"https://chiponline.tech/"}>
              ChipOnline Website
            </a>
            <span className={classes.divider}>|</span>
            <NavLink className={classes.menuItem} to={"/search"}>
              Online Shop
            </NavLink>
          </>
        )}
      </div>
    </Page>
  );
};

export default Error404;
