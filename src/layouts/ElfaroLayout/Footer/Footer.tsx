import React from "react";
import { Box, Hidden } from "@material-ui/core";
import constants from "@src/constants/constants";
import { NavLink } from "react-router-dom";
import { useStyles } from "./styles";

declare const COMMITHASH: any;
declare const BRANCH: any;

const logo_img = `/${constants.logos.distPath}/${constants.logos.mainLogoDarkBack}`;

const Footer: React.FC = () => {
  const classes = useStyles();

  let build = "";
  try {
    if (constants.builds) {
      build = constants.builds;
    } else {
      build = "empty";
    }
  } catch (ReferenceError) {
    build = "any";
  }

  const logoLink = (
    <div className={classes.logoContainer}>
      <NavLink to={"/"} style={{ color: "#ffffff" }}>
        <img src={logo_img} className={classes.logo} alt="ChipOnline logo"></img>
      </NavLink>
    </div>
  );

  return (
    <footer className={classes.footer}>
      <div className={classes.container}>
        <Box display="flex">
          <div className={classes.address}>
            <div className={classes.title}>ChipOnline Services</div>
            <address>24000, Serbia, Subotica, Korzo 1</address>
          </div>
          <div>
            <div className={classes.phone}>
              Phone:{" "}
              <a className={classes.link} href="tel:+381621257226">
                +381 62 1257 226
              </a>
            </div>
            <div>
              Email:{" "}
              <a className={classes.link} href="mailto:info@chiponline.tech">
                info@chiponline.tech
              </a>
            </div>
          </div>
        </Box>

        <Hidden only={["xs", "sm"]}>
          <div className={classes.env}>
            version: {process.env.AWS_COMMIT_ID || COMMITHASH} | branch:{" "}
            {process.env.AWS_BRANCH === "master" ? BRANCH : process.env.AWS_BRANCH} | mode:{" "}
            {process.env.AWS_BRANCH === "master" ? "development" : "production"} | build: {build}
          </div>
          {logoLink}
        </Hidden>
      </div>
    </footer>
  );
};

export default Footer;
