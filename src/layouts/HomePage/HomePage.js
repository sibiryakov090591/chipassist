import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import Footer from "@src/components/Footer/Footer";
import constants from "@src/constants/constants";
import { ID_CHIPASSIST, ID_MASTER } from "@src/constants/server_constants";
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
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
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
    [theme.breakpoints.down("sm")]: {
      paddingRight: "initial",
    },
  },
  container: {
    marginTop: 133,
    display: "flex",
    flex: "1 1 auto",
    width: "100vw",
  },
  navBar: {
    zIndex: 3,
    width: 256,
    minWidth: 256,
    flex: "0 0 auto",
  },
  content: {
    flex: "1 1 auto",
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

  let isDisableLayout = false;
  if (constants.id === ID_CHIPASSIST) {
    isDisableLayout = window.location.pathname === "/" && isMdUp;
  }
  if (constants.id === ID_MASTER) {
    isDisableLayout =
      (window.location.pathname === "/" && isMdUp) ||
      ["/supplier-response", "/statistics", "/file-upload"].includes(window.location.pathname);
  }

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
