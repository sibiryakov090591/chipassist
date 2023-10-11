import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import Footer from "@src/components/Footer/Footer";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { scrollbarWidth } from "@src/config";
import { TopBar } from "./components";

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
    zIndex: 100,
    position: "fixed",
    transition: "all 250ms ease",
    height: 133,
    width: "100vw",
    paddingRight: `${scrollbarWidth}px`,
    [theme.breakpoints.up("md")]: {
      "&.collapse": {
        height: 80,
        paddingTop: 0,
      },
    },
  },
  container: {
    marginTop: 133,
    display: "flex",
    flexGrow: 1,
    width: "100vw",
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
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  const isShowFooter = window.location.pathname !== "/messages";
  const isDisableLayout = window.location.pathname === "/" && isMdUp;

  return isDisableLayout ? (
    props.children
  ) : (
    <div className={classes.wrapper}>
      <TopBar className={classes.topBar} />
      <div className={classes.container}>
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
