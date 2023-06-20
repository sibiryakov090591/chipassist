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
    width: "100vw",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  topBar: {
    zIndex: 999,
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
    flex: "1 1 auto",
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
    background: "white!important",
  },
}));

const SupplierLayout: React.FC = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <TopBar className={classes.topBar} />
      <div className={classes.container}>
        <main className={classes.content}>{props.children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default SupplierLayout;
