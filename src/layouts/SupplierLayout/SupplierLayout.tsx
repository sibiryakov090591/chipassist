import React from "react";
import { makeStyles } from "@material-ui/styles";
import Footer from "@src/components/Footer/Footer";
import { scrollbarWidth } from "@src/config";
import TopBar from "./components/TopBar";

const useStyles = makeStyles(() => ({
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
    width: "100vw",
    paddingRight: `${scrollbarWidth}px`,
    height: 80,
    display: "flex",
    justifyContent: "center",
  },
  container: {
    paddingRight: `${scrollbarWidth}px`,
    marginTop: 80,
    display: "flex",
    flexGrow: 1,
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
    background: "white!important",
    overflowX: "hidden",
  },
}));

const SupplierLayout: React.FC = (props) => {
  const classes = useStyles();

  const isShowFooter = window.location.pathname !== "/messages";

  return (
    <div className={classes.wrapper}>
      <TopBar className={classes.topBar} />
      <div className={classes.container}>
        <main className={classes.content}>{props.children}</main>
      </div>
      {isShowFooter && <Footer />}
    </div>
  );
};

export default SupplierLayout;
