/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { AppBar, Hidden, Toolbar } from "@material-ui/core";
import constants from "@src/constants/constants";
import { useStyles } from "./topbarStyles";

const logo_img = `/${constants.logos.distPath}/${constants.logos.mainLogoDarkBack}`;

const TopBarEmpty = (props) => {
  const { className, ...rest } = props;
  const classes = useStyles();
  const goHome = () => {
    window.location = "/";
  };

  const logoLink = (
    <div className={classes.logoCont}>
      <a href="/" onClick={goHome}>
        <img alt="Logo" style={{ margin: "0 17px" }} className={classes.logoImg} src={logo_img} />
      </a>
    </div>
  );

  return (
    <AppBar {...rest} className={clsx(classes.root, className)} position="static">
      <Hidden only={["xs", "sm", "md"]}>
        <Toolbar className={classes.toolbar}>
          <div>{logoLink}</div>
        </Toolbar>
      </Hidden>
    </AppBar>
  );
};

TopBarEmpty.propTypes = {
  className: PropTypes.string,
};

export default TopBarEmpty;
