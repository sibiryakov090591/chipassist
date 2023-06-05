import React from "react";
import { Box, Hidden } from "@material-ui/core";
import constants from "@src/constants/constants";
import { useStyles } from "./styles";
import Menu from "../Menu/Menu";

declare const COMMITHASH: any;
declare const BRANCH: any;

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

  return (
    <footer className={classes.footer}>
      <div className={classes.container}>
        <Box display="flex">
          <div className={classes.address}>
            <div className={classes.title}>ELFARO OÜ</div>
            <address>Vesse poik, 4d, 11415, Tallinn, Estonia</address>
          </div>
          <div>
            <div className={classes.phone}>
              Phone:{" "}
              <a className={classes.link} href="tel:+37253011314">
                +372 5301 1314
              </a>
            </div>
            <div>
              Email:{" "}
              <a className={classes.link} href="mailto:sales@elfaro.ee">
                sales@elfaro.ee
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
          <Menu isMobile={false} />
        </Hidden>
      </div>
    </footer>
  );
};

export default Footer;
