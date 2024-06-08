import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import Footer from "@src/components/Footer/Footer";
import { scrollbarWidth } from "@src/config";
import { clsx } from "clsx";
import constants from "@src/constants/constants";
import { ID_CHIPASSIST, ID_ICSEARCH, ID_MASTER } from "@src/constants/server_constants";
import { useTheme } from "@material-ui/core";
import TopBar from "./components";

const isICSearch = constants.id === ID_ICSEARCH;
const isChipAssist = [ID_CHIPASSIST, ID_MASTER].includes(constants.id);

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
  wrapper: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  topBar: {
    maxHeight: 133,
    zIndex: 1000,
    position: "fixed",
    transition: "all 250ms ease",
    width: "100vw",
    paddingRight: `${scrollbarWidth}px`,
    [theme.breakpoints.up("md")]: {
      "&.collapse": {
        height: 80,
        paddingTop: 0,
      },
    },
  },
  topBarICSMobile: {
    height: "auto",
    zIndex: 1000,
    position: "fixed",
    transition: "all 250ms ease",
    width: "100vw",
    paddingRight: `${scrollbarWidth}px`,
    [theme.breakpoints.up("md")]: {
      "&.collapse": {
        height: 80,
        paddingTop: 0,
      },
    },
  },
  fixedHeight: {
    height: 127,
    [theme.breakpoints.down("sm")]: {
      height: "auto",
    },
  },
  container: {
    marginTop: 127,
    display: "flex",
    flexGrow: 1,
    width: "100vw",
    [theme.breakpoints.down("sm")]: {
      marginTop: isICSearch ? 145 : 133,
    },
  },
  homeContainer: {
    display: "flex",
    flexGrow: 1,
    width: "100vw",
    [theme.breakpoints.down("sm")]: {
      marginTop: 80,
    },
  },
  navBar: {
    zIndex: 3,
    width: 256,
    minWidth: 256,
    flex: "0 0 auto",
  },
  content: {
    flexGrow: 1,
    maxWidth: "100%",
    paddingRight: `${scrollbarWidth}px`,
    background: "white !important",
    [theme.breakpoints.down("sm")]: {
      paddingRight: "initial",
    },
  },
}));

const HomePage = (props) => {
  const classes = useStyles();

  const isShowFooter = window.location.pathname !== "/messages";
  const isHomePage = window.location.pathname === "/";
  const theme = useTheme();
  const isXsDown = theme.breakpoints.down("xs");

  return (
    <div className={classes.wrapper}>
      <TopBar
        className={clsx(!isChipAssist && isXsDown ? classes.topBarICSMobile : classes.topBar, {
          [classes.fixedHeight]: true,
        })}
      />
      <div className={isHomePage ? classes.homeContainer : classes.container}>
        <main className={classes.content}>{props.children}</main>
      </div>
      {isShowFooter && <Footer />}
    </div>
  );
};

HomePage.propTypes = {
  route: PropTypes.object,
  children: PropTypes.any,
};

export default HomePage;
