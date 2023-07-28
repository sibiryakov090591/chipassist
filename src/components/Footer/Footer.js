import React from "react";
import PropTypes from "prop-types";
import constants from "@src/constants/constants";
import { ID_ICSEARCH, ID_SUPPLIER_RESPONSE } from "@src/constants/server_constants";
import { Box, Container, Grid, Hidden } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import InstagramIcon from "@material-ui/icons/Instagram";
import FacebookIcon from "@material-ui/icons/Facebook";
import LinkedInIcon from "@material-ui/icons/LinkedIn";

import { useStyles } from "./footerStyles";

const logo = `/${constants.logos.distPath}/${constants.logos.mainLogoDarkBack}`;

let build = "";

const Footer = () => {
  const classes = useStyles();
  try {
    if (constants.builds) {
      build = constants.builds;
    } else {
      build = "empty";
    }
  } catch (ReferenceError) {
    build = "any";
  }

  const isSupplierResponse = constants.id === ID_SUPPLIER_RESPONSE;

  return (
    <div className={classes.root}>
      <footer className={classes.footer}>
        {constants.id !== ID_ICSEARCH ? (
          <Container maxWidth="lg" className={classes.bottomCont}>
            <Box className={classes.footerWrapper}>
              <Box className={classes.logo}>
                <a href="/">
                  <img alt="Logo" className={classes.logoImg} src={logo} />
                </a>
                <div className={classes.copy}>Copyright © {new Date().toISOString().slice(0, 4)} ChipAssist AG</div>
              </Box>
              <Box display="flex" className={classes.nav}>
                <Box display="flex" flexWrap="wrap">
                  <Box className={classes.navGroup}>
                    <p style={{ fontSize: 13, color: "#d8d5df", fontWeight: "bold" }}>Follow us</p>
                    <Grid container direction={"row"} spacing={1} wrap={"nowrap"}>
                      <Grid item>
                        <a
                          href="https://instagram.com/chipassistcom?igshid=NTc4MTIwNjQ2YQ=="
                          title="Chipassist on Instagram"
                          target={"_blank"}
                          rel={"noreferrer"}
                          className={classes.navLink}
                        >
                          <InstagramIcon className={classes.socialIcon} />
                        </a>
                      </Grid>
                      <Grid item>
                        <a
                          href="https://www.facebook.com/ChipAssist/"
                          title="Chipassist on Facebook"
                          target={"_blank"}
                          rel={"noreferrer"}
                          className={classes.navLink}
                        >
                          <FacebookIcon className={classes.socialIcon} />
                        </a>
                      </Grid>
                      <Grid item>
                        <a
                          href="https://www.linkedin.com/company/54117339"
                          title="Chipassist on LinkedIn"
                          target={"_blank"}
                          rel={"noreferrer"}
                          className={classes.navLink}
                        >
                          <LinkedInIcon className={classes.socialIcon} />
                        </a>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
                {isSupplierResponse && (
                  <Box className={classes.navGroup}>
                    <NavLink className={classes.navLink} to={"/supplier-response"}>
                      Requests
                    </NavLink>
                    <NavLink className={classes.navLink} to={"/statistics"}>
                      Statistics
                    </NavLink>
                    <NavLink className={classes.navLink} to={"/messages"}>
                      Messages
                    </NavLink>
                    <NavLink className={classes.navLink} to={"/help"}>
                      Help
                    </NavLink>
                  </Box>
                )}
                {!isSupplierResponse && (
                  <Box display="flex" flexWrap="wrap">
                    <Box className={classes.navGroup}>
                      <NavLink className={classes.navLink} to={"/about_company"}>
                        About us
                      </NavLink>
                      <NavLink className={classes.navLink} to={"/parts"}>
                        Products
                      </NavLink>
                      <Hidden smDown>
                        <NavLink className={classes.navLink} to={"/bom/create-file"}>
                          BOM Tool
                        </NavLink>
                      </Hidden>
                    </Box>
                    <Box className={classes.navGroup}>
                      <NavLink className={classes.navLink} to={"/sell-excess-inventory"}>
                        Sell on ChipAssist
                      </NavLink>
                      <NavLink className={classes.navLink} to={"/pcb"}>
                        Request PCB
                      </NavLink>
                      <NavLink className={classes.navLink} to={`/blog`}>
                        Blog
                      </NavLink>
                    </Box>
                  </Box>
                )}
                <Box display="flex" flexWrap="wrap">
                  <Box className={classes.navGroup}>
                    <NavLink className={classes.navLink} to={"/terms_of_services"}>
                      Terms & Conditions
                    </NavLink>
                    <NavLink className={classes.navLink} to={"/privacy_policy"}>
                      Privacy Policy
                    </NavLink>
                    <NavLink className={classes.navLink} to={"/rfq-list-quotes"}>
                      RFQ List
                    </NavLink>
                    {!isSupplierResponse && (
                      <NavLink className={classes.navLink} to={"/FAQ"}>
                        FAQ
                      </NavLink>
                    )}
                  </Box>
                  <Box className={classes.navGroup}>
                    <a className={classes.navLink} href="mailto:info@chipassist.com">
                      info@chipassist.com
                    </a>
                    <a className={classes.navLink} href="tel:+41797137881">
                      +41 79 713 7881
                    </a>
                  </Box>
                </Box>
              </Box>
            </Box>
            <div className={classes.commit}>
              version: {process.env.AWS_COMMIT_ID || COMMITHASH} | branch:{" "}
              {process.env.AWS_BRANCH === "master" ? BRANCH : process.env.AWS_BRANCH} | mode:{" "}
              {process.env.AWS_BRANCH === "master" ? "development" : "production"} | build: {build}
            </div>
          </Container>
        ) : (
          <Container className={classes.icsearchContainer} maxWidth="lg">
            <Grid className={classes.wrapper} container>
              <Grid item md={6} xs={12}></Grid>
              <Grid item md={6} xs={12}>
                <Box className={classes.contactsWrapper}>
                  <Box className={classes.contactsInner}>
                    <Box>
                      <img alt="Logo" className={classes.logoImg} src={logo} />
                    </Box>
                    <Box className={classes.mail}>
                      <a href="mailto:info@icsearch.ru">info@icsearch.ru</a>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            </Grid>
            <div className={classes.commit}>
              version: {process.env.AWS_COMMIT_ID || COMMITHASH} | branch:{" "}
              {process.env.AWS_BRANCH === "master" ? BRANCH : process.env.AWS_BRANCH} | mode:{" "}
              {process.env.AWS_BRANCH === "master" ? "development" : "production"} | build: {build}
            </div>
          </Container>
        )}
      </footer>
    </div>
  );
};

Footer.propTypes = {
  className: PropTypes.string,
};

export default Footer;
